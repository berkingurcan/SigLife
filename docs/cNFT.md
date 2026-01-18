# Compressed NFT (cNFT) Implementation Guide

## Overview

This document provides comprehensive instructions for implementing **Metaplex Bubblegum** compressed NFTs (cNFTs) in the SigLife Solana Mobile app. cNFTs use Merkle trees to store NFT data, dramatically reducing costs compared to traditional NFTs.

### Why Compressed NFTs?

| Feature | Traditional NFT | Compressed NFT |
|---------|-----------------|----------------|
| **Cost per mint** | ~0.01 SOL | ~0.000005 SOL |
| **Storage** | Full on-chain account | Merkle tree leaf (hash on-chain) |
| **Scalability** | Limited by cost | Millions for minimal cost |
| **Metadata** | On-chain | Off-chain (IPFS, Arweave) |

**For SigLife stage badges**, cNFTs are ideal because:
- Users mint multiple badges as they progress through stages
- Significantly lower minting costs for users
- Same NFT experience in wallets (via DAS API)

---

## Part 1: Merkle Tree Deployment

### Prerequisites

Before deploying a Merkle tree, ensure you have:

1. **Solana CLI installed**
   ```bash
   sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
   solana --version
   ```

2. **Node.js 18+ and npm/yarn**

3. **A funded Solana wallet**
   ```bash
   # Generate new keypair (or use existing)
   solana-keygen new --outfile ~/.config/solana/siglife-deployer.json
   
   # Set as default
   solana config set --keypair ~/.config/solana/siglife-deployer.json
   
   # Check balance
   solana balance
   
   # For devnet, airdrop SOL
   solana airdrop 2 --url devnet
   ```

4. **Configure network**
   ```bash
   # Devnet (for testing)
   solana config set --url devnet
   
   # Mainnet-beta (for production)
   solana config set --url mainnet-beta
   ```

### Understanding Merkle Tree Parameters

When creating a Merkle tree, three parameters determine size, cost, and capabilities:

#### **1. maxDepth**
- Determines maximum capacity: `2^maxDepth` NFTs
- Higher depth = more NFTs but higher upfront cost

| maxDepth | Capacity | Use Case |
|----------|----------|----------|
| 7 | 128 | Small collections |
| 14 | 16,384 | Medium collections |
| 17 | 131,072 | Large collections |
| 20 | 1,048,576 | Very large collections |

**Recommended for SigLife:** `maxDepth: 14` (16,384 NFTs capacity)

#### **2. maxBufferSize**
- Maximum concurrent changes to tree per slot
- Higher = more parallel minting but higher cost
- Valid pairs are defined in `@solana/spl-account-compression`

| maxBufferSize | Use Case |
|---------------|----------|
| 8 | Low concurrency |
| 64 | Medium concurrency (recommended) |
| 256 | High concurrency |

**Recommended for SigLife:** `maxBufferSize: 64`

#### **3. canopyDepth**
- Portion of Merkle proof stored on-chain
- Higher = smaller transaction size but higher upfront cost
- Formula: `canopyDepth = maxDepth - desiredProofSize`
- **For composability:** `maxDepth - canopyDepth ≤ 10`

**Recommended for SigLife:** `canopyDepth: 10` (with maxDepth 14, proof size = 4)

### Cost Estimation

Use the [Compressed NFT Calculator](https://compressed.app/) or this script:

```typescript
// scripts/calculate-tree-cost.ts
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getConcurrentMerkleTreeAccountSize } from "@solana/spl-account-compression";

const RPC_URL = "https://api.devnet.solana.com"; // Or your RPC

async function calculateCost() {
  const connection = new Connection(RPC_URL);
  
  const maxDepth = 14;
  const maxBufferSize = 64;
  const canopyDepth = 10;
  
  const size = getConcurrentMerkleTreeAccountSize(maxDepth, maxBufferSize, canopyDepth);
  const numberOfNfts = Math.pow(2, maxDepth);
  const rent = (await connection.getMinimumBalanceForRentExemption(size)) / LAMPORTS_PER_SOL;
  
  console.log(`Tree Configuration:`);
  console.log(`  maxDepth: ${maxDepth}`);
  console.log(`  maxBufferSize: ${maxBufferSize}`);
  console.log(`  canopyDepth: ${canopyDepth}`);
  console.log(`  Capacity: ${numberOfNfts.toLocaleString()} NFTs`);
  console.log(`  Account Size: ${size.toLocaleString()} bytes`);
  console.log(`  Rent Cost: ~${rent.toFixed(4)} SOL`);
}

calculateCost();
```

**Estimated costs for recommended configuration:**
- maxDepth: 14, maxBufferSize: 64, canopyDepth: 10
- Capacity: 16,384 NFTs
- **Rent: ~0.5 - 1 SOL** (one-time cost)

### Deploy Merkle Tree Script

Create `/scripts/deploy-merkle-tree.ts`:

```typescript
// scripts/deploy-merkle-tree.ts
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { 
  generateSigner, 
  keypairIdentity,
  publicKey 
} from "@metaplex-foundation/umi";
import { 
  createTree, 
  mplBubblegum 
} from "@metaplex-foundation/mpl-bubblegum";
import { readFileSync } from "fs";

// Configuration
const RPC_URL = process.env.RPC_URL || "https://api.devnet.solana.com";
const KEYPAIR_PATH = process.env.KEYPAIR_PATH || 
  `${process.env.HOME}/.config/solana/siglife-deployer.json`;

// Tree parameters (adjust as needed)
const MAX_DEPTH = 14;
const MAX_BUFFER_SIZE = 64;

async function deployMerkleTree() {
  console.log("🌳 Deploying Merkle Tree for SigLife cNFTs...\n");

  // Load keypair
  const secretKey = JSON.parse(readFileSync(KEYPAIR_PATH, "utf-8"));
  const keypair = {
    publicKey: publicKey(/* derive from secretKey */),
    secretKey: new Uint8Array(secretKey),
  };

  // Initialize Umi
  const umi = createUmi(RPC_URL)
    .use(mplBubblegum())
    .use(keypairIdentity(keypair));

  // Generate tree signer
  const merkleTree = generateSigner(umi);

  console.log(`📋 Configuration:`);
  console.log(`   RPC: ${RPC_URL}`);
  console.log(`   Tree Creator: ${umi.identity.publicKey}`);
  console.log(`   Merkle Tree Address: ${merkleTree.publicKey}`);
  console.log(`   Max Depth: ${MAX_DEPTH} (${Math.pow(2, MAX_DEPTH).toLocaleString()} capacity)`);
  console.log(`   Max Buffer Size: ${MAX_BUFFER_SIZE}\n`);

  try {
    // Create the tree
    const builder = await createTree(umi, {
      merkleTree,
      maxDepth: MAX_DEPTH,
      maxBufferSize: MAX_BUFFER_SIZE,
      public: false, // Only tree creator can mint
    });

    console.log("⏳ Sending transaction...");
    const result = await builder.sendAndConfirm(umi);
    
    console.log("\n✅ Merkle Tree deployed successfully!");
    console.log(`   Transaction: ${Buffer.from(result.signature).toString("base64")}`);
    console.log(`\n🔑 SAVE THESE VALUES:`);
    console.log(`   MERKLE_TREE_ADDRESS=${merkleTree.publicKey}`);
    console.log(`   TREE_CREATOR=${umi.identity.publicKey}`);
    
  } catch (error) {
    console.error("❌ Failed to deploy Merkle Tree:", error);
    throw error;
  }
}

deployMerkleTree();
```

### Running the Deployment

1. **Install required packages:**
   ```bash
   npm install @metaplex-foundation/umi @metaplex-foundation/umi-bundle-defaults @metaplex-foundation/mpl-bubblegum @solana/spl-account-compression
   ```

2. **Run on Devnet (testing):**
   ```bash
   RPC_URL="https://api.devnet.solana.com" npx ts-node scripts/deploy-merkle-tree.ts
   ```

3. **Run on Mainnet (production):**
   ```bash
   RPC_URL="https://your-mainnet-rpc.com" npx ts-node scripts/deploy-merkle-tree.ts
   ```

4. **Save the output values** to your `.env` file:
   ```env
   EXPO_PUBLIC_MERKLE_TREE_ADDRESS=<deployed-address>
   EXPO_PUBLIC_TREE_CREATOR=<tree-creator-pubkey>
   ```

---

## Part 2: App Integration - Minting cNFTs

### Required Package Installation

Add these to `package.json`:

```bash
npm install @metaplex-foundation/umi @metaplex-foundation/umi-bundle-defaults @metaplex-foundation/mpl-bubblegum @metaplex-foundation/umi-web3js-adapters
```

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    SigLife Mobile App                       │
├─────────────────────────────────────────────────────────────┤
│  useMintStageCNFT Hook                                      │
│    ├── Creates mintV1 instruction                           │
│    ├── User signs with Solana Seeker Wallet                 │
│    └── Broadcasts transaction                               │
├─────────────────────────────────────────────────────────────┤
│  Backend (Optional but Recommended)                         │
│    ├── Stores NFT metadata on IPFS/Arweave                  │
│    ├── Signs as tree authority (if tree is private)         │
│    └── Can batch multiple mints                             │
├─────────────────────────────────────────────────────────────┤
│                    Solana Blockchain                        │
│    ├── Bubblegum Program (cNFT minting)                    │
│    ├── Account Compression Program                          │
│    └── Merkle Tree Account                                  │
└─────────────────────────────────────────────────────────────┘
```

### NFT Metadata Structure

Create metadata JSON files for each stage. Host on IPFS, Arweave, or your server.

```json
{
  "name": "SigLife - Student Badge",
  "symbol": "SIGLIFE",
  "description": "Awarded for completing the Student stage in SigLife - The Sigma Man Simulator",
  "image": "https://arweave.net/your-image-hash",
  "external_url": "https://siglife.app",
  "attributes": [
    {
      "trait_type": "Stage",
      "value": "Student"
    },
    {
      "trait_type": "Rarity",
      "value": "Common"
    },
    {
      "trait_type": "Stage Index",
      "value": 0
    }
  ],
  "properties": {
    "files": [
      {
        "uri": "https://arweave.net/your-image-hash",
        "type": "image/png"
      }
    ],
    "category": "image"
  }
}
```

### Implementation: cNFT Minting Service

Create `/components/game/cnft-minting-service.ts`:

```typescript
// components/game/cnft-minting-service.ts
import { 
  PublicKey, 
  Transaction, 
  TransactionInstruction,
  Connection,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  SYSVAR_SLOT_HASHES_PUBKEY
} from "@solana/web3.js";
import { StageId, STAGES, TREASURY_WALLET, MINT_FEE_SOL } from "@/constants/game-config";

// Bubblegum Program ID
const BUBBLEGUM_PROGRAM_ID = new PublicKey("BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY");
const SPL_NOOP_PROGRAM_ID = new PublicKey("noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV");
const SPL_ACCOUNT_COMPRESSION_PROGRAM_ID = new PublicKey("cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK");

// Configuration - Set these in your .env
const MERKLE_TREE_ADDRESS = process.env.EXPO_PUBLIC_MERKLE_TREE_ADDRESS;

// Stage metadata URIs (host these on IPFS/Arweave)
export const STAGE_METADATA_URIS: Record<StageId, string> = {
  student: "https://arweave.net/student-metadata-hash",
  intern: "https://arweave.net/intern-metadata-hash", 
  employee: "https://arweave.net/employee-metadata-hash",
  side_hustler: "https://arweave.net/side-hustler-metadata-hash",
  entrepreneur: "https://arweave.net/entrepreneur-metadata-hash",
  ceo: "https://arweave.net/ceo-metadata-hash",
  investor: "https://arweave.net/investor-metadata-hash",
  sigma_elite: "https://arweave.net/sigma-elite-metadata-hash",
};

interface MetadataArgs {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  primarySaleHappened: boolean;
  isMutable: boolean;
  editionNonce: number | null;
  tokenStandard: number | null;
  collection: { verified: boolean; key: PublicKey } | null;
  uses: null;
  tokenProgramVersion: number;
  creators: Array<{
    address: PublicKey;
    verified: boolean;
    share: number;
  }>;
}

/**
 * Serialize MetadataArgs for the Bubblegum program
 */
function serializeMetadataArgs(metadata: MetadataArgs): Buffer {
  // This is a simplified serialization - in production use borsh
  // The actual implementation would use @coral-xyz/borsh
  const encoder = new TextEncoder();
  
  // For full implementation, use the Bubblegum SDK's serialization
  // This is a placeholder that would need proper Borsh encoding
  throw new Error("Use Umi SDK for proper serialization");
}

/**
 * Get the Tree Config PDA for a Merkle tree
 */
export function getTreeConfigPDA(merkleTree: PublicKey): PublicKey {
  const [treeConfig] = PublicKey.findProgramAddressSync(
    [merkleTree.toBuffer()],
    BUBBLEGUM_PROGRAM_ID
  );
  return treeConfig;
}

/**
 * Get stage metadata for minting
 */
export function getStageMetadata(stageId: StageId, creatorAddress: PublicKey): MetadataArgs {
  const stage = STAGES.find(s => s.id === stageId);
  if (!stage) throw new Error(`Stage not found: ${stageId}`);
  
  return {
    name: `SigLife - ${stage.name} Badge`,
    symbol: "SIGLIFE",
    uri: STAGE_METADATA_URIS[stageId],
    sellerFeeBasisPoints: 500, // 5% royalty
    primarySaleHappened: false,
    isMutable: false,
    editionNonce: null,
    tokenStandard: null,
    collection: null, // Set if using collection
    uses: null,
    tokenProgramVersion: 0,
    creators: [
      {
        address: new PublicKey(TREASURY_WALLET),
        verified: false,
        share: 100,
      },
    ],
  };
}

/**
 * Build cNFT mint instruction
 * Note: For production, use Umi SDK for proper instruction building
 */
export async function buildMintCNFTInstruction(
  connection: Connection,
  merkleTree: PublicKey,
  leafOwner: PublicKey,
  stageId: StageId
): Promise<TransactionInstruction> {
  const treeConfig = getTreeConfigPDA(merkleTree);
  const metadata = getStageMetadata(stageId, leafOwner);
  
  // NOTE: This instruction building is simplified
  // For production, use @metaplex-foundation/mpl-bubblegum with Umi
  
  // The mintV1 instruction requires:
  // 1. Tree config account
  // 2. Leaf owner
  // 3. Leaf delegate  
  // 4. Merkle tree
  // 5. Payer
  // 6. Tree creator/delegate
  // 7. Log wrapper (SPL Noop)
  // 8. Compression program
  // 9. System program
  
  const keys = [
    { pubkey: treeConfig, isSigner: false, isWritable: true },
    { pubkey: leafOwner, isSigner: false, isWritable: false },
    { pubkey: leafOwner, isSigner: false, isWritable: false }, // delegate = owner
    { pubkey: merkleTree, isSigner: false, isWritable: true },
    { pubkey: leafOwner, isSigner: true, isWritable: true }, // payer
    { pubkey: new PublicKey(TREASURY_WALLET), isSigner: false, isWritable: false }, // tree creator
    { pubkey: SPL_NOOP_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
  ];
  
  // For proper implementation, serialize metadata using Borsh
  // This is a placeholder - use Umi SDK in production
  const data = Buffer.alloc(0); // Placeholder
  
  return new TransactionInstruction({
    keys,
    programId: BUBBLEGUM_PROGRAM_ID,
    data,
  });
}
```

### Implementation: Umi-based Hook (Recommended)

Create `/components/game/use-mint-stage-cnft.tsx`:

```typescript
// components/game/use-mint-stage-cnft.tsx
// Recommended approach using Metaplex Umi SDK

import { createTransaction } from '@/components/account/create-transaction';
import { useGetBalanceInvalidate } from '@/components/account/use-get-balance';
import { MINT_FEE_SOL, TREASURY_WALLET, type StageId, STAGES } from '@/constants/game-config';
import { 
  PublicKey, 
  Transaction, 
  TransactionInstruction,
  SystemProgram,
  TransactionSignature 
} from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import { useMobileWallet } from '@wallet-ui/react-native-web3js';

// Bubblegum Program IDs
const BUBBLEGUM_PROGRAM_ID = new PublicKey("BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY");
const SPL_NOOP_PROGRAM_ID = new PublicKey("noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV");
const SPL_ACCOUNT_COMPRESSION_PROGRAM_ID = new PublicKey("cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK");

// TODO: Set these after deploying merkle tree
const MERKLE_TREE_ADDRESS = process.env.EXPO_PUBLIC_MERKLE_TREE_ADDRESS || "";
const COLLECTION_MINT = process.env.EXPO_PUBLIC_COLLECTION_MINT || ""; // Optional

// Stage metadata URIs - Update after uploading to IPFS/Arweave
const STAGE_METADATA_URIS: Record<StageId, string> = {
  student: "https://your-metadata-host.com/metadata/student.json",
  intern: "https://your-metadata-host.com/metadata/intern.json",
  employee: "https://your-metadata-host.com/metadata/employee.json",
  side_hustler: "https://your-metadata-host.com/metadata/side_hustler.json",
  entrepreneur: "https://your-metadata-host.com/metadata/entrepreneur.json",
  ceo: "https://your-metadata-host.com/metadata/ceo.json",
  investor: "https://your-metadata-host.com/metadata/investor.json",
  sigma_elite: "https://your-metadata-host.com/metadata/sigma_elite.json",
};

interface MintStageCNFTInput {
  stageId: StageId;
}

interface MintStageCNFTResult {
  signature: TransactionSignature;
  stageId: StageId;
  assetId?: string; // cNFT asset ID (from DAS API after indexing)
}

// Custom error class for cancelled transactions
export class TransactionCancelledError extends Error {
  constructor() {
    super('Transaction was cancelled by user');
    this.name = 'TransactionCancelledError';
  }
}

// Helper to detect if an error is a user cancellation
function isUserCancellation(error: unknown): boolean {
  if (!error) return false;
  const errorString = String(error);
  return (
    errorString.includes('CancellationException') ||
    errorString.includes('User rejected') ||
    errorString.includes('cancelled') ||
    errorString.includes('canceled')
  );
}

/**
 * Get Tree Config PDA
 */
function getTreeConfigPDA(merkleTree: PublicKey): PublicKey {
  const [treeConfig] = PublicKey.findProgramAddressSync(
    [merkleTree.toBuffer()],
    BUBBLEGUM_PROGRAM_ID
  );
  return treeConfig;
}

/**
 * Hook to mint a stage completion cNFT
 * 
 * This implementation:
 * 1. Sends mint fee to treasury
 * 2. Triggers backend to mint cNFT (tree authority signs)
 * 
 * Alternative: If tree is public, can mint directly from client
 */
export function useMintStageCNFT({ address }: { address: PublicKey }) {
  const { connection, signAndSendTransaction } = useMobileWallet();
  const invalidateBalance = useGetBalanceInvalidate({ address });

  return useMutation({
    mutationKey: ['mint-stage-cnft', { endpoint: connection.rpcEndpoint, address }],
    mutationFn: async (input: MintStageCNFTInput): Promise<MintStageCNFTResult | undefined> => {
      let signature: TransactionSignature = '';

      try {
        // Validate configuration
        if (!MERKLE_TREE_ADDRESS) {
          throw new Error('Merkle tree not configured. Deploy tree and set EXPO_PUBLIC_MERKLE_TREE_ADDRESS');
        }
        
        if (!TREASURY_WALLET) {
          throw new Error('Treasury wallet not configured');
        }

        const treasuryPubkey = new PublicKey(TREASURY_WALLET);
        const merkleTree = new PublicKey(MERKLE_TREE_ADDRESS);
        const stage = STAGES.find(s => s.id === input.stageId);
        
        if (!stage) {
          throw new Error(`Invalid stage: ${input.stageId}`);
        }

        console.log(`Minting cNFT for stage: ${stage.name}`);
        console.log(`Merkle Tree: ${merkleTree.toString()}`);
        console.log(`Recipient: ${address.toString()}`);

        // Option 1: Direct client-side minting (if tree is public)
        // This requires the tree to be created with public: true
        
        // Option 2: Fee transfer + backend minting (recommended for private trees)
        // The backend holds the tree authority and mints on behalf of user
        
        // For now, we'll implement Option 2 (more secure)
        // Step 1: Transfer mint fee to treasury
        const { transaction, latestBlockhash, minContextSlot } = await createTransaction({
          publicKey: address,
          destination: treasuryPubkey,
          amount: MINT_FEE_SOL,
          connection,
        });

        // Add memo with minting intent
        const memoInstruction = new TransactionInstruction({
          keys: [],
          programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
          data: Buffer.from(JSON.stringify({
            action: "mint_cnft",
            stageId: input.stageId,
            recipient: address.toString(),
          })),
        });
        
        transaction.add(memoInstruction);

        // Sign and send
        signature = await signAndSendTransaction(transaction, minContextSlot);

        // Wait for confirmation
        await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed');

        console.log(`Fee transfer confirmed: ${signature}`);

        // Step 2: Notify backend to mint the cNFT
        // In production, call your minting API here
        /*
        const mintResponse = await fetch('https://your-api.com/mint-cnft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            stageId: input.stageId,
            recipient: address.toString(),
            feeSignature: signature,
          }),
        });
        
        const { assetId } = await mintResponse.json();
        */

        return {
          signature,
          stageId: input.stageId,
          // assetId: assetId, // From backend response
        };

      } catch (error: unknown) {
        if (isUserCancellation(error)) {
          console.log('User cancelled the transaction');
          throw new TransactionCancelledError();
        }
        console.error('Mint stage cNFT failed:', error);
        throw error;
      }
    },
    onSuccess: async (result) => {
      if (result) {
        console.log(`Successfully initiated cNFT mint for stage: ${result.stageId}`);
        console.log(`Transaction signature: ${result.signature}`);
      }
      await invalidateBalance();
    },
    onError: (error) => {
      if (error instanceof TransactionCancelledError) {
        console.log('Transaction cancelled by user');
        return;
      }
      console.error(`Mint stage cNFT transaction failed: ${error}`);
    },
  });
}
```

---

## Part 3: Backend Minting Service (Optional but Recommended)

For private Merkle trees (more secure), create a backend service that holds the tree authority.

### Backend API Example (Node.js/Express)

```typescript
// backend/src/routes/mint-cnft.ts
import express from 'express';
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { keypairIdentity, publicKey } from "@metaplex-foundation/umi";
import { mintV1 } from '@metaplex-foundation/mpl-bubblegum';
import { none } from '@metaplex-foundation/umi';

const router = express.Router();

// Load tree authority keypair (KEEP SECRET!)
const TREE_AUTHORITY_SECRET = JSON.parse(process.env.TREE_AUTHORITY_SECRET || '[]');
const RPC_URL = process.env.RPC_URL || "https://api.devnet.solana.com";
const MERKLE_TREE = process.env.MERKLE_TREE_ADDRESS;

// Initialize Umi with tree authority
const umi = createUmi(RPC_URL)
  .use(mplBubblegum())
  .use(keypairIdentity({
    publicKey: publicKey(process.env.TREE_AUTHORITY_PUBKEY!),
    secretKey: new Uint8Array(TREE_AUTHORITY_SECRET),
  }));

router.post('/mint-cnft', async (req, res) => {
  try {
    const { stageId, recipient, feeSignature } = req.body;

    // 1. Verify fee payment (check transaction on-chain)
    // 2. Check if already minted for this stage/recipient
    // 3. Mint the cNFT

    const result = await mintV1(umi, {
      leafOwner: publicKey(recipient),
      merkleTree: publicKey(MERKLE_TREE!),
      metadata: {
        name: `SigLife - ${stageId} Badge`,
        uri: `https://metadata.siglife.app/${stageId}.json`,
        sellerFeeBasisPoints: 500,
        collection: none(),
        creators: [
          { 
            address: umi.identity.publicKey, 
            verified: true, 
            share: 100 
          },
        ],
      },
    }).sendAndConfirm(umi);

    res.json({
      success: true,
      signature: Buffer.from(result.signature).toString('base64'),
      // Asset ID can be derived from logs or DAS API
    });

  } catch (error) {
    console.error('Minting failed:', error);
    res.status(500).json({ error: 'Minting failed' });
  }
});

export default router;
```

---

## Part 4: Fetching cNFTs (DAS API)

Use Helius or other DAS API providers to fetch cNFT data.

```typescript
// utils/das-api.ts
const HELIUS_API_KEY = process.env.EXPO_PUBLIC_HELIUS_API_KEY;
const HELIUS_RPC = `https://devnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

interface DASAsset {
  id: string;
  content: {
    json_uri: string;
    metadata: {
      name: string;
      symbol: string;
      description?: string;
    };
  };
  compression: {
    compressed: boolean;
    tree: string;
    leaf_id: number;
  };
}

/**
 * Get all cNFTs owned by an address
 */
export async function getAssetsByOwner(ownerAddress: string): Promise<DASAsset[]> {
  const response = await fetch(HELIUS_RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'siglife',
      method: 'getAssetsByOwner',
      params: {
        ownerAddress,
        page: 1,
        limit: 100,
      },
    }),
  });

  const { result } = await response.json();
  return result.items;
}

/**
 * Get SigLife badges owned by user
 */
export async function getSigLifeBadges(ownerAddress: string, merkleTreeAddress: string): Promise<DASAsset[]> {
  const assets = await getAssetsByOwner(ownerAddress);
  
  return assets.filter(asset => 
    asset.compression?.compressed && 
    asset.compression.tree === merkleTreeAddress
  );
}
```

---

## Deployment Checklist

### Devnet Testing

- [ ] Generate deployer keypair
- [ ] Airdrop SOL to deployer wallet
- [ ] Run cost calculation script
- [ ] Deploy Merkle tree to devnet
- [ ] Save tree address to `.env`
- [ ] Upload metadata JSONs (can use temporary hosting)
- [ ] Update `STAGE_METADATA_URIS` in code
- [ ] Test minting flow in app
- [ ] Verify cNFT appears in wallet (use DAS API)

### Mainnet Production

- [ ] Fund deployer wallet with real SOL
- [ ] Upload metadata to permanent storage (Arweave recommended)
- [ ] Deploy Merkle tree to mainnet-beta
- [ ] Update `.env.production` with mainnet values
- [ ] Set up monitoring for tree capacity
- [ ] Deploy backend minting service (if using private tree)
- [ ] Test end-to-end flow
- [ ] Monitor first few mints

---

## Troubleshooting

### Common Issues

1. **"Tree is full"**
   - Your tree has reached capacity
   - Deploy a new tree with higher `maxDepth`

2. **"Invalid proof"**
   - Canopy too small, transaction size exceeded
   - Increase `canopyDepth` when deploying new tree

3. **"Unauthorized"**
   - Tree is private and signer is not tree authority
   - Use tree authority to sign or make tree public

4. **cNFT not appearing in wallet**
   - Wait 30-60 seconds for indexing
   - Wallet must support DAS API
   - Check with `getAssetsByOwner` API

### Resources

- [Metaplex Bubblegum Docs](https://developers.metaplex.com/bubblegum)
- [Helius DAS API](https://docs.helius.dev/solana-compression/digital-asset-standard-das-api)
- [Compressed NFT Calculator](https://compressed.app/)
- [Solana Account Compression](https://github.com/solana-labs/solana-program-library/tree/master/account-compression)

---

## Environment Variables Summary

```env
# .env.development
EXPO_PUBLIC_SOLANA_NETWORK=devnet
EXPO_PUBLIC_MERKLE_TREE_ADDRESS=<your-devnet-tree>
EXPO_PUBLIC_TREE_CREATOR=<tree-creator-pubkey>
EXPO_PUBLIC_HELIUS_API_KEY=<helius-api-key>

# .env.production  
EXPO_PUBLIC_SOLANA_NETWORK=mainnet-beta
EXPO_PUBLIC_MERKLE_TREE_ADDRESS=<your-mainnet-tree>
EXPO_PUBLIC_TREE_CREATOR=<tree-creator-pubkey>
EXPO_PUBLIC_HELIUS_API_KEY=<helius-api-key>
```
