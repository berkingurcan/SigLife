// DAS API Utility - Digital Asset Standard API for fetching NFTs
// Used to retrieve NFT data from Solana

import { getRpcEndpoint } from '@/constants/nft-config'
import { toLowerCase } from '@/utils/text'

// ============================================================================
// TYPES
// ============================================================================

export interface DASAsset {
  id: string
  content: {
    json_uri: string
    metadata: {
      name: string
      symbol: string
      description?: string
      image?: string
    }
    links?: {
      image?: string
      external_url?: string
    }
  }
  compression?: {
    compressed: boolean
    tree: string
    leaf_id: number
    seq: number
  }
  ownership: {
    owner: string
    delegate?: string
    frozen: boolean
  }
  grouping?: Array<{
    group_key: string
    group_value: string
  }>
  authorities?: Array<{
    address: string
    scopes: string[]
  }>
}

export interface DASResponse {
  jsonrpc: string
  id: string
  result: {
    total: number
    limit: number
    page: number
    items: DASAsset[]
  }
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Get all assets owned by an address using DAS API
 */
export async function getAssetsByOwner(
  ownerAddress: string,
  network: 'devnet' | 'mainnet-beta' = 'devnet',
  page: number = 1,
  limit: number = 100
): Promise<DASAsset[]> {
  const rpcEndpoint = getRpcEndpoint(network)

  try {
    const response = await fetch(rpcEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'siglife-das',
        method: 'getAssetsByOwner',
        params: {
          ownerAddress,
          page,
          limit,
          displayOptions: {
            showCollectionMetadata: true,
            showUnverifiedCollections: true,
          },
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`DAS API error: ${response.status}`)
    }

    const data: DASResponse = await response.json()

    if (!data.result?.items) {
      return []
    }

    return data.result.items
  } catch (error) {
    console.error('Failed to fetch assets by owner:', error)
    return []
  }
}

/**
 * Get a specific asset by its ID
 */
export async function getAssetById(
  assetId: string,
  network: 'devnet' | 'mainnet-beta' = 'devnet'
): Promise<DASAsset | null> {
  const rpcEndpoint = getRpcEndpoint(network)

  try {
    const response = await fetch(rpcEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'siglife-das',
        method: 'getAsset',
        params: { id: assetId },
      }),
    })

    if (!response.ok) {
      throw new Error(`DAS API error: ${response.status}`)
    }

    const data = await response.json()
    return data.result || null
  } catch (error) {
    console.error('Failed to fetch asset by ID:', error)
    return null
  }
}

/**
 * Get SigLife badges owned by user
 * Filters assets to only include SigLife NFTs by symbol
 */
export async function getSigLifeBadges(
  ownerAddress: string,
  network: 'devnet' | 'mainnet-beta' = 'devnet'
): Promise<DASAsset[]> {
  const assets = await getAssetsByOwner(ownerAddress, network)

  // Filter to only SigLife NFTs by symbol
  return assets.filter((asset) => {
    return asset.content?.metadata?.symbol === 'SIGLIFE'
  })
}

/**
 * Parse stage ID from NFT metadata name
 * Example: "SigLife - Student Badge" -> "student"
 */
export function parseStageFromNFTName(name: string): string | null {
  const match = name.match(/SigLife - (.+) Badge/)
  if (!match) return null

  const stageName = toLowerCase(match[1]).replace(/\s+/g, '_')
  return stageName
}
