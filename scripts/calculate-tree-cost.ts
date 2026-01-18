/**
 * Calculate Merkle Tree Costs
 * 
 * This script helps you understand the cost of different tree configurations
 * before deploying.
 * 
 * Usage:
 *   npx ts-node scripts/calculate-tree-cost.ts
 */

import { ALL_DEPTH_SIZE_PAIRS, getConcurrentMerkleTreeAccountSize } from "@solana/spl-account-compression";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

const RPC_URL = process.env.RPC_URL || "https://api.devnet.solana.com";

interface TreeConfig {
    maxDepth: number;
    maxBufferSize: number;
    capacity: number;
    canopyDepth: number;
    accountSize: number;
    rentCostSOL: number;
    proofSize: number;
}

async function calculateAllCosts() {
    console.log("💰 Merkle Tree Cost Calculator\n");
    console.log("=".repeat(80));

    const connection = new Connection(RPC_URL);

    // Desired proof sizes (maxDepth - canopyDepth should be <= 10 for composability)
    const desiredProofSize = 5; // Adjust this - lower = higher cost but better composability

    console.log(`📊 Calculating costs for proof size: ${desiredProofSize}\n`);

    const configs: TreeConfig[] = [];

    for (const pair of ALL_DEPTH_SIZE_PAIRS) {
        const canopyDepth = Math.max(0, pair.maxDepth - desiredProofSize);

        try {
            const size = getConcurrentMerkleTreeAccountSize(
                pair.maxDepth,
                pair.maxBufferSize,
                canopyDepth
            );

            const rent = await connection.getMinimumBalanceForRentExemption(size);
            const rentSOL = rent / LAMPORTS_PER_SOL;
            const capacity = Math.pow(2, pair.maxDepth);

            configs.push({
                maxDepth: pair.maxDepth,
                maxBufferSize: pair.maxBufferSize,
                capacity,
                canopyDepth,
                accountSize: size,
                rentCostSOL: rentSOL,
                proofSize: desiredProofSize,
            });

        } catch (error) {
            // Skip invalid configurations
            continue;
        }
    }

    // Sort by cost
    configs.sort((a, b) => a.rentCostSOL - b.rentCostSOL);

    // Display table
    console.log("| Depth | Buffer | Canopy | Capacity        | Size (bytes) | Cost (SOL) |");
    console.log("|-------|--------|--------|-----------------|--------------|------------|");

    for (const config of configs) {
        const capacityStr = config.capacity.toLocaleString().padEnd(15);
        const sizeStr = config.accountSize.toLocaleString().padEnd(12);
        const costStr = config.rentCostSOL.toFixed(4).padEnd(10);

        console.log(
            `| ${config.maxDepth.toString().padEnd(5)} ` +
            `| ${config.maxBufferSize.toString().padEnd(6)} ` +
            `| ${config.canopyDepth.toString().padEnd(6)} ` +
            `| ${capacityStr} ` +
            `| ${sizeStr} ` +
            `| ${costStr} |`
        );
    }

    console.log("\n" + "=".repeat(80));
    console.log("\n📋 Recommended configurations for SigLife:\n");

    // Find recommended configs
    const smallConfig = configs.find(c => c.capacity >= 1000 && c.capacity < 5000);
    const mediumConfig = configs.find(c => c.capacity >= 10000 && c.capacity < 50000);
    const largeConfig = configs.find(c => c.capacity >= 100000 && c.capacity < 500000);

    if (smallConfig) {
        console.log("🔹 Small (Testing/MVP):");
        console.log(`   Depth: ${smallConfig.maxDepth}, Buffer: ${smallConfig.maxBufferSize}`);
        console.log(`   Capacity: ${smallConfig.capacity.toLocaleString()} NFTs`);
        console.log(`   Cost: ~${smallConfig.rentCostSOL.toFixed(4)} SOL\n`);
    }

    if (mediumConfig) {
        console.log("🔹 Medium (Recommended for Production):");
        console.log(`   Depth: ${mediumConfig.maxDepth}, Buffer: ${mediumConfig.maxBufferSize}`);
        console.log(`   Capacity: ${mediumConfig.capacity.toLocaleString()} NFTs`);
        console.log(`   Cost: ~${mediumConfig.rentCostSOL.toFixed(4)} SOL\n`);
    }

    if (largeConfig) {
        console.log("🔹 Large (High Growth):");
        console.log(`   Depth: ${largeConfig.maxDepth}, Buffer: ${largeConfig.maxBufferSize}`);
        console.log(`   Capacity: ${largeConfig.capacity.toLocaleString()} NFTs`);
        console.log(`   Cost: ~${largeConfig.rentCostSOL.toFixed(4)} SOL\n`);
    }

    console.log("ℹ️  Notes:");
    console.log("   - Cost is one-time rent for the tree account");
    console.log("   - Per-mint cost is ~0.000005 SOL (transaction fee only)");
    console.log("   - Higher canopy = smaller proofs = better composability");
    console.log("   - Use https://compressed.app for visual calculator\n");
}

// Calculate specific config
async function calculateSpecificConfig(
    maxDepth: number,
    maxBufferSize: number,
    canopyDepth: number
) {
    console.log("\n📊 Specific Configuration Cost\n");

    const connection = new Connection(RPC_URL);

    try {
        const size = getConcurrentMerkleTreeAccountSize(maxDepth, maxBufferSize, canopyDepth);
        const rent = await connection.getMinimumBalanceForRentExemption(size);
        const rentSOL = rent / LAMPORTS_PER_SOL;
        const capacity = Math.pow(2, maxDepth);
        const proofSize = maxDepth - canopyDepth;

        console.log(`Configuration:`);
        console.log(`  Max Depth:       ${maxDepth}`);
        console.log(`  Max Buffer Size: ${maxBufferSize}`);
        console.log(`  Canopy Depth:    ${canopyDepth}`);
        console.log(`\nResults:`);
        console.log(`  Capacity:        ${capacity.toLocaleString()} NFTs`);
        console.log(`  Account Size:    ${size.toLocaleString()} bytes`);
        console.log(`  Rent Cost:       ${rentSOL.toFixed(4)} SOL`);
        console.log(`  Proof Size:      ${proofSize} nodes`);
        console.log(`  Composable:      ${proofSize <= 10 ? "✅ Yes" : "⚠️ Limited (proof > 10)"}`);

    } catch (error) {
        console.error("Invalid configuration:", error);
    }
}

// Main
async function main() {
    // Show all options
    await calculateAllCosts();

    // Show recommended config (depth 14, buffer 64, canopy 10)
    console.log("\n" + "=".repeat(80));
    await calculateSpecificConfig(14, 64, 10);
}

main().catch(console.error);
