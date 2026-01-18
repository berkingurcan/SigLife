/**
 * Merkle Tree Deployment Script for SigLife cNFTs
 * 
 * Usage:
 *   node scripts/deploy-merkle-tree.js
 * 
 * Environment Variables:
 *   RPC_URL - Solana RPC endpoint (defaults to devnet)
 *   KEYPAIR_PATH - Path to deployer keypair JSON file
 * 
 * Example:
 *   RPC_URL="https://api.devnet.solana.com" node scripts/deploy-merkle-tree.js
 */

const { createUmi } = require("@metaplex-foundation/umi-bundle-defaults");
const {
    generateSigner,
    keypairIdentity,
    createSignerFromKeypair,
} = require("@metaplex-foundation/umi");
const {
    createTree,
    mplBubblegum
} = require("@metaplex-foundation/mpl-bubblegum");
const { readFileSync, writeFileSync } = require("fs");
const { homedir } = require("os");
const { join } = require("path");

// ============================================================================
// CONFIGURATION - Adjust these values based on your needs
// ============================================================================

// Tree parameters
// maxDepth: 7 = 128 NFTs capacity (for testing)
// maxDepth: 14 = 16,384 NFTs capacity (good for medium collections)
// maxBufferSize: 8 = low concurrency (fine for testing)
// maxBufferSize: 64 = medium concurrency
const MAX_DEPTH = 5;
const MAX_BUFFER_SIZE = 8;

// Set to true to allow anyone to mint from this tree
// Set to false to require tree authority signature for minting
const IS_PUBLIC_TREE = true;

// ============================================================================
// SCRIPT
// ============================================================================

async function main() {
    console.log("🌳 SigLife Merkle Tree Deployment\n");
    console.log("=".repeat(60));

    // Configuration
    const RPC_URL = process.env.RPC_URL || "https://api.devnet.solana.com";
    const KEYPAIR_PATH = process.env.KEYPAIR_PATH ||
        join(homedir(), ".config", "solana", "siglife-deployer.json");

    const isDevnet = RPC_URL.includes("devnet");
    const isMainnet = RPC_URL.includes("mainnet");

    console.log(`📡 Network: ${isDevnet ? "Devnet" : isMainnet ? "Mainnet" : "Custom"}`);
    console.log(`🔑 Keypair: ${KEYPAIR_PATH}`);
    console.log(`📊 Max Depth: ${MAX_DEPTH} (capacity: ${Math.pow(2, MAX_DEPTH).toLocaleString()} NFTs)`);
    console.log(`📊 Max Buffer Size: ${MAX_BUFFER_SIZE}`);
    console.log(`🔓 Public Tree: ${IS_PUBLIC_TREE}`);
    console.log("=".repeat(60) + "\n");

    // Load keypair
    let secretKeyArray;
    try {
        const keypairData = readFileSync(KEYPAIR_PATH, "utf-8");
        secretKeyArray = JSON.parse(keypairData);
        console.log("✅ Loaded keypair from file");
    } catch (error) {
        console.error("❌ Failed to load keypair from:", KEYPAIR_PATH);
        console.error("   Make sure you have a Solana keypair at this path.");
        console.error("   Generate one with: solana-keygen new");
        process.exit(1);
    }

    // Initialize Umi
    const umi = createUmi(RPC_URL).use(mplBubblegum());

    // Create keypair from secret
    const secretKey = new Uint8Array(secretKeyArray);
    const keypair = umi.eddsa.createKeypairFromSecretKey(secretKey);
    const signer = createSignerFromKeypair(umi, keypair);

    umi.use(keypairIdentity(signer));

    console.log(`👤 Deployer: ${umi.identity.publicKey}`);

    // Check balance
    const balance = await umi.rpc.getBalance(umi.identity.publicKey);
    const balanceSOL = Number(balance.basisPoints) / 1_000_000_000;
    console.log(`💰 Balance: ${balanceSOL.toFixed(4)} SOL`);

    if (balanceSOL < 0.1) {
        console.warn("⚠️  Warning: Low balance. Tree deployment requires SOL for rent.");
        if (isDevnet) {
            console.log("   Run: solana airdrop 2 --url devnet");
        }
        process.exit(1);
    }

    // Generate merkle tree signer
    const merkleTree = generateSigner(umi);

    console.log(`\n🌲 Merkle Tree Address: ${merkleTree.publicKey}`);
    console.log("\n⏳ Creating tree transaction...");

    try {
        // Build the createTree transaction
        const builder = await createTree(umi, {
            merkleTree,
            maxDepth: MAX_DEPTH,
            maxBufferSize: MAX_BUFFER_SIZE,
            public: IS_PUBLIC_TREE,
        });

        console.log("⏳ Sending and confirming transaction...");
        console.log("   (This may take 30-60 seconds)\n");

        const result = await builder.sendAndConfirm(umi, {
            confirm: { commitment: "confirmed" },
        });

        const signature = Buffer.from(result.signature).toString("base64");

        console.log("✅ Merkle Tree deployed successfully!\n");
        console.log("=".repeat(60));
        console.log("📋 DEPLOYMENT RESULTS");
        console.log("=".repeat(60));
        console.log(`Merkle Tree Address: ${merkleTree.publicKey}`);
        console.log(`Tree Creator:        ${umi.identity.publicKey}`);
        console.log(`Transaction:         ${signature}`);
        console.log(`Network:             ${isDevnet ? "Devnet" : isMainnet ? "Mainnet" : RPC_URL}`);
        console.log(`Capacity:            ${Math.pow(2, MAX_DEPTH).toLocaleString()} cNFTs`);
        console.log("=".repeat(60));

        // Generate .env entries
        const envEntries = `
# Add these to your .env file
EXPO_PUBLIC_MERKLE_TREE_ADDRESS=${merkleTree.publicKey}
EXPO_PUBLIC_TREE_CREATOR=${umi.identity.publicKey}
`;
        console.log(envEntries);

        // Save deployment info to file
        const deploymentInfo = {
            merkleTreeAddress: String(merkleTree.publicKey),
            treeCreator: String(umi.identity.publicKey),
            maxDepth: MAX_DEPTH,
            maxBufferSize: MAX_BUFFER_SIZE,
            capacity: Math.pow(2, MAX_DEPTH),
            isPublic: IS_PUBLIC_TREE,
            network: isDevnet ? "devnet" : isMainnet ? "mainnet-beta" : RPC_URL,
            deployedAt: new Date().toISOString(),
            transactionSignature: signature,
        };

        const outputPath = join(process.cwd(), `merkle-tree-deployment-${isDevnet ? "devnet" : "mainnet"}.json`);
        writeFileSync(outputPath, JSON.stringify(deploymentInfo, null, 2));
        console.log(`📁 Deployment info saved to: ${outputPath}`);

        // Explorer link
        const explorerBase = "https://explorer.solana.com/address";
        const clusterParam = isDevnet ? "?cluster=devnet" : "";
        console.log(`\n🔍 View on Explorer:`);
        console.log(`   ${explorerBase}/${merkleTree.publicKey}${clusterParam}`);

    } catch (error) {
        console.error("❌ Failed to deploy Merkle Tree:");
        console.error(error);
        process.exit(1);
    }
}

main().catch(console.error);
