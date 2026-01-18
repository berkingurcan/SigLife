// Fetch cNFTs Hook - React Query hook for fetching user's compressed NFTs
// Integrates with DAS API to display SigLife badges

import type { StageId } from '@/constants/game-config'
import { getSigLifeBadges, parseStageFromNFTName, type DASAsset } from '@/utils/das-api'
import { PublicKey } from '@solana/web3.js'
import { useQuery, useQueryClient } from '@tanstack/react-query'

// ============================================================================
// TYPES
// ============================================================================

export interface SigLifeBadge {
    assetId: string
    stageId: StageId | null
    name: string
    symbol: string
    description?: string
    imageUrl?: string
    metadataUri: string
    owner: string
    isCompressed: boolean
    merkleTree?: string
    leafId?: number
}

// ============================================================================
// HOOK
// ============================================================================

interface UseFetchCNFTsOptions {
    address: PublicKey | null
    network?: 'devnet' | 'mainnet-beta'
    enabled?: boolean
}

/**
 * Hook to fetch user's SigLife cNFT badges
 *
 * Features:
 * - Fetches cNFTs from DAS API
 * - Filters to only SigLife badges
 * - Parses stage information from metadata
 * - Caches results with React Query
 */
export function useFetchCNFTs({ address, network = 'devnet', enabled = true }: UseFetchCNFTsOptions) {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['siglife-cnfts', address?.toString(), network],
        queryFn: async (): Promise<SigLifeBadge[]> => {
            if (!address) return []

            const assets = await getSigLifeBadges(address.toString(), network)

            // Transform DAS assets to SigLifeBadge format
            return assets.map((asset: DASAsset) => ({
                assetId: asset.id,
                stageId: parseStageFromNFTName(asset.content?.metadata?.name || '') as StageId | null,
                name: asset.content?.metadata?.name || 'Unknown Badge',
                symbol: asset.content?.metadata?.symbol || 'SIGLIFE',
                description: asset.content?.metadata?.description,
                imageUrl: asset.content?.links?.image || asset.content?.metadata?.image,
                metadataUri: asset.content?.json_uri || '',
                owner: asset.ownership?.owner || '',
                isCompressed: asset.compression?.compressed || false,
                merkleTree: asset.compression?.tree,
                leafId: asset.compression?.leaf_id,
            }))
        },
        enabled: enabled && !!address,
        staleTime: 30 * 1000, // Consider data fresh for 30 seconds
        gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes (previously cacheTime)
    })

    // Function to invalidate and refetch
    const refetch = async () => {
        await queryClient.invalidateQueries({
            queryKey: ['siglife-cnfts', address?.toString(), network],
        })
    }

    return {
        badges: query.data || [],
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        isError: query.isError,
        error: query.error,
        refetch,
    }
}

/**
 * Hook to get a specific badge by stage ID
 */
export function useBadgeByStage({
    address,
    stageId,
    network = 'devnet',
}: {
    address: PublicKey | null
    stageId: StageId
    network?: 'devnet' | 'mainnet-beta'
}) {
    const { badges, isLoading, isError } = useFetchCNFTs({ address, network })

    const badge = badges.find((b) => b.stageId === stageId)

    return {
        badge,
        hasBadge: !!badge,
        isLoading,
        isError,
    }
}

/**
 * Get count of minted badges
 */
export function useMintedBadgeCount({
    address,
    network = 'devnet',
}: {
    address: PublicKey | null
    network?: 'devnet' | 'mainnet-beta'
}) {
    const { badges, isLoading } = useFetchCNFTs({ address, network })

    return {
        count: badges.length,
        isLoading,
    }
}
