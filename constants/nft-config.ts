// NFT Configuration - Regular NFT minting settings for SigLife
// This file contains all configuration for Metaplex NFT minting

import type { StageId } from './game-config'

// ============================================================================
// ENVIRONMENT CONFIGURATION
// ============================================================================

// Helius RPC for better performance (optional)
export const HELIUS_API_KEY = process.env.EXPO_PUBLIC_HELIUS_API_KEY || ''

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
  entrepreneur: 0.1,
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
  // Hosted on Pinata IPFS
  student:
    'https://rose-smoggy-sparrow-317.mypinata.cloud/ipfs/bafybeifzhp5dynix4gvug4p24h5j3niwyffpbkh23kvrpnskyvkhnsae4q/student.json',
  intern:
    'https://rose-smoggy-sparrow-317.mypinata.cloud/ipfs/bafybeifzhp5dynix4gvug4p24h5j3niwyffpbkh23kvrpnskyvkhnsae4q/intern.json',
  employee:
    'https://rose-smoggy-sparrow-317.mypinata.cloud/ipfs/bafybeifzhp5dynix4gvug4p24h5j3niwyffpbkh23kvrpnskyvkhnsae4q/employee.json',
  side_hustler:
    'https://rose-smoggy-sparrow-317.mypinata.cloud/ipfs/bafybeifzhp5dynix4gvug4p24h5j3niwyffpbkh23kvrpnskyvkhnsae4q/side_hustler.json',
  entrepreneur:
    'https://rose-smoggy-sparrow-317.mypinata.cloud/ipfs/bafybeifzhp5dynix4gvug4p24h5j3niwyffpbkh23kvrpnskyvkhnsae4q/entrepreneur.json',
  ceo: 'https://rose-smoggy-sparrow-317.mypinata.cloud/ipfs/bafybeifzhp5dynix4gvug4p24h5j3niwyffpbkh23kvrpnskyvkhnsae4q/ceo.json',
  investor:
    'https://rose-smoggy-sparrow-317.mypinata.cloud/ipfs/bafybeifzhp5dynix4gvug4p24h5j3niwyffpbkh23kvrpnskyvkhnsae4q/investor.json',
  sigma_elite:
    'https://rose-smoggy-sparrow-317.mypinata.cloud/ipfs/bafybeifzhp5dynix4gvug4p24h5j3niwyffpbkh23kvrpnskyvkhnsae4q/sigma_elite.json',
}

// ============================================================================
// NFT METADATA TEMPLATES
// Used when minting NFTs
// ============================================================================

export interface NFTMetadata {
  name: string
  symbol: string
  uri: string
  sellerFeeBasisPoints: number
}

export const STAGE_NFT_METADATA: Record<StageId, Omit<NFTMetadata, 'uri'>> = {
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
export function getStageNFTMetadata(stageId: StageId): NFTMetadata {
  const base = STAGE_NFT_METADATA[stageId]
  return {
    ...base,
    uri: STAGE_METADATA_URIS[stageId],
  }
}

// ============================================================================
// RPC CONFIGURATION
// ============================================================================

/**
 * Get RPC endpoint based on network
 */
export function getRpcEndpoint(
  network: 'devnet' | 'mainnet-beta' = 'devnet'
): string {
  if (HELIUS_API_KEY) {
    const baseUrl =
      network === 'devnet' ? 'devnet.helius-rpc.com' : 'mainnet.helius-rpc.com'
    return `https://${baseUrl}/?api-key=${HELIUS_API_KEY}`
  }

  // Fallback to public endpoints (limited rate)
  return network === 'devnet'
    ? 'https://api.devnet.solana.com'
    : 'https://api.mainnet-beta.solana.com'
}
