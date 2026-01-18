// DAS API Utility - Digital Asset Standard API for fetching cNFTs
// Used to retrieve compressed NFT data from Solana

import { getDASRpcEndpoint, MERKLE_TREE_ADDRESS } from '@/constants/cnft-config'

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
    const rpcEndpoint = getDASRpcEndpoint(network)

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
    const rpcEndpoint = getDASRpcEndpoint(network)

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
 * Filters assets to only include those from the SigLife Merkle tree
 */
export async function getSigLifeBadges(
    ownerAddress: string,
    network: 'devnet' | 'mainnet-beta' = 'devnet'
): Promise<DASAsset[]> {
    const assets = await getAssetsByOwner(ownerAddress, network)

    if (!MERKLE_TREE_ADDRESS) {
        console.warn('Merkle tree address not configured')
        return []
    }

    // Filter to only SigLife cNFTs from our Merkle tree
    return assets.filter((asset) => {
        // Check if it's a compressed NFT from our tree
        if (asset.compression?.compressed && asset.compression.tree === MERKLE_TREE_ADDRESS) {
            return true
        }

        // Also check by symbol as fallback
        if (asset.content?.metadata?.symbol === 'SIGLIFE') {
            return true
        }

        return false
    })
}

/**
 * Parse stage ID from NFT metadata name
 * Example: "SigLife - Student Badge" -> "student"
 */
export function parseStageFromNFTName(name: string): string | null {
    const match = name.match(/SigLife - (.+) Badge/)
    if (!match) return null

    const stageName = match[1].toLowerCase().replace(/\s+/g, '_')
    return stageName
}
