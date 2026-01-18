// cNFT Configuration - Compressed NFT minting settings
// This file contains all configuration for Metaplex Bubblegum cNFT minting

import type { StageId } from './game-config'

// ============================================================================
// ENVIRONMENT CONFIGURATION
// ============================================================================

// Merkle tree deployed for cNFT minting
export const MERKLE_TREE_ADDRESS = process.env.EXPO_PUBLIC_MERKLE_TREE_ADDRESS || ''
export const TREE_CREATOR = process.env.EXPO_PUBLIC_TREE_CREATOR || ''

// Helius RPC for DAS API (optional - for fetching cNFTs)
export const HELIUS_API_KEY = process.env.EXPO_PUBLIC_HELIUS_API_KEY || ''

// ============================================================================
// BUBBLEGUM PROGRAM IDS
// ============================================================================

export const BUBBLEGUM_PROGRAM_ID = 'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'
export const SPL_NOOP_PROGRAM_ID = 'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV'
export const SPL_ACCOUNT_COMPRESSION_PROGRAM_ID = 'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK'

// ============================================================================
// STAGE-BASED MINT FEES
// Each stage costs 0.02 SOL more than the previous
// Student: 0.02, Intern: 0.04, Employee: 0.06, etc.
// ============================================================================

export const STAGE_MINT_FEES: Record<StageId, number> = {
    student: 0.02,
    intern: 0.04,
    employee: 0.06,
    side_hustler: 0.08,
    entrepreneur: 0.10,
    ceo: 0.12,
    investor: 0.14,
    sigma_elite: 0.16,
}

/**
 * Get mint fee for a specific stage
 * Fee increases by 0.02 SOL per stage
 */
export function getMintFeeForStage(stageId: StageId): number {
    return STAGE_MINT_FEES[stageId] || 0.02
}

// ============================================================================
// NFT METADATA URIs
// Update these after uploading metadata to IPFS/Arweave
// See docs/nft-metadata-guide.md for hosting instructions
// ============================================================================

export const STAGE_METADATA_URIS: Record<StageId, string> = {
    // TODO: Replace with actual hosted metadata URIs
    // Format: "https://arweave.net/<TX_ID>" or "ipfs://<CID>"
    student: 'https://arweave.net/PLACEHOLDER_STUDENT',
    intern: 'https://arweave.net/PLACEHOLDER_INTERN',
    employee: 'https://arweave.net/PLACEHOLDER_EMPLOYEE',
    side_hustler: 'https://arweave.net/PLACEHOLDER_SIDE_HUSTLER',
    entrepreneur: 'https://arweave.net/PLACEHOLDER_ENTREPRENEUR',
    ceo: 'https://arweave.net/PLACEHOLDER_CEO',
    investor: 'https://arweave.net/PLACEHOLDER_INVESTOR',
    sigma_elite: 'https://arweave.net/PLACEHOLDER_SIGMA_ELITE',
}

// ============================================================================
// NFT METADATA TEMPLATES
// Used when minting cNFTs
// ============================================================================

export interface CNFTMetadata {
    name: string
    symbol: string
    uri: string
    sellerFeeBasisPoints: number
}

export const STAGE_NFT_METADATA: Record<StageId, Omit<CNFTMetadata, 'uri'>> = {
    student: {
        name: 'SigLife - Student Badge',
        symbol: 'SIGLIFE',
        sellerFeeBasisPoints: 500, // 5% royalty
    },
    intern: {
        name: 'SigLife - Intern Badge',
        symbol: 'SIGLIFE',
        sellerFeeBasisPoints: 500,
    },
    employee: {
        name: 'SigLife - Employee Badge',
        symbol: 'SIGLIFE',
        sellerFeeBasisPoints: 500,
    },
    side_hustler: {
        name: 'SigLife - Side Hustler Badge',
        symbol: 'SIGLIFE',
        sellerFeeBasisPoints: 500,
    },
    entrepreneur: {
        name: 'SigLife - Entrepreneur Badge',
        symbol: 'SIGLIFE',
        sellerFeeBasisPoints: 500,
    },
    ceo: {
        name: 'SigLife - CEO Badge',
        symbol: 'SIGLIFE',
        sellerFeeBasisPoints: 500,
    },
    investor: {
        name: 'SigLife - Investor Badge',
        symbol: 'SIGLIFE',
        sellerFeeBasisPoints: 500,
    },
    sigma_elite: {
        name: 'SigLife - Sigma Elite Badge',
        symbol: 'SIGLIFE',
        sellerFeeBasisPoints: 500,
    },
}

/**
 * Get complete metadata for a stage including URI
 */
export function getStageNFTMetadata(stageId: StageId): CNFTMetadata {
    const base = STAGE_NFT_METADATA[stageId]
    return {
        ...base,
        uri: STAGE_METADATA_URIS[stageId],
    }
}

// ============================================================================
// DAS API CONFIGURATION
// ============================================================================

/**
 * Get RPC endpoint for DAS API based on network
 */
export function getDASRpcEndpoint(network: 'devnet' | 'mainnet-beta' = 'devnet'): string {
    if (HELIUS_API_KEY) {
        const baseUrl = network === 'devnet' ? 'devnet.helius-rpc.com' : 'mainnet.helius-rpc.com'
        return `https://${baseUrl}/?api-key=${HELIUS_API_KEY}`
    }

    // Fallback to public endpoints (limited rate)
    return network === 'devnet'
        ? 'https://api.devnet.solana.com'
        : 'https://api.mainnet-beta.solana.com'
}
