// Mint Stage NFT Hook - Real NFT minting for stage graduation
// Uses SPL Token + Metaplex metadata for standard NFT creation

import { useGetBalanceInvalidate } from '@/components/account/use-get-balance'
import { getMintFeeForStage } from '@/constants/nft-config'
import { STAGES, type StageId } from '@/constants/game-config'
import { PublicKey, TransactionSignature } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import { buildNFTMintTransaction } from './nft-minting-service'

interface MintStageNFTInput {
  stageId: StageId
}

interface MintStageNFTResult {
  signature: TransactionSignature
  stageId: StageId
  mintFee: number
  mintAddress: string
}

// Custom error class for cancelled transactions
export class TransactionCancelledError extends Error {
  constructor() {
    super('Transaction was cancelled by user')
    this.name = 'TransactionCancelledError'
  }
}

// Helper to detect if an error is a user cancellation
function isUserCancellation(error: unknown): boolean {
  if (!error) return false
  const errorString = String(error)
  return (
    errorString.includes('CancellationException') ||
    errorString.includes('User rejected') ||
    errorString.includes('cancelled') ||
    errorString.includes('canceled')
  )
}

/**
 * Hook to mint a stage completion NFT
 *
 * Flow:
 * 1. Calculate stage-based mint fee (increases 0.02 SOL per stage)
 * 2. Build NFT mint transaction with:
 *    - Create mint account
 *    - Initialize mint
 *    - Create ATA
 *    - Mint 1 token
 *    - Create Metaplex metadata
 *    - Create Master Edition
 *    - Transfer fee to treasury
 * 3. Sign and send transaction
 * 4. Confirm transaction
 */
export function useMintStageNFT({ address }: { address: PublicKey }) {
  const { connection, signAndSendTransaction } = useMobileWallet()
  const invalidateBalance = useGetBalanceInvalidate({ address })

  return useMutation({
    mutationKey: ['mint-stage-nft', { endpoint: connection.rpcEndpoint, address }],
    mutationFn: async (input: MintStageNFTInput): Promise<MintStageNFTResult | undefined> => {
      try {
        const stage = STAGES.find((s) => s.id === input.stageId)

        if (!stage) {
          throw new Error(`Invalid stage: ${input.stageId}`)
        }

        // Get stage-based mint fee (increases by 0.02 SOL per stage)
        const mintFee = getMintFeeForStage(input.stageId)

        console.log(`Minting NFT for stage: ${stage.name}`)
        console.log(`Mint fee: ${mintFee} SOL`)
        console.log(`Recipient: ${address.toString()}`)

        // Build the NFT mint transaction
        const { transaction, mintKeypair, latestBlockhash, minContextSlot } =
          await buildNFTMintTransaction({
            connection,
            payer: address,
            stageId: input.stageId,
            mintFee,
          })

        // Sign and send the transaction (wallet will prompt user)
        // The transaction is already partially signed by mintKeypair
        const signature = await signAndSendTransaction(transaction, minContextSlot)

        // Confirm the transaction
        await connection.confirmTransaction(
          { signature, ...latestBlockhash },
          'confirmed'
        )

        console.log(`Stage NFT minted successfully: ${signature}`)
        console.log(`Mint address: ${mintKeypair.publicKey.toString()}`)

        return {
          signature,
          stageId: input.stageId,
          mintFee,
          mintAddress: mintKeypair.publicKey.toString(),
        }
      } catch (error: unknown) {
        // Check if user cancelled the transaction
        if (isUserCancellation(error)) {
          console.log('User cancelled the transaction')
          throw new TransactionCancelledError()
        }
        console.error('Mint stage NFT failed:', error)
        throw error
      }
    },
    onSuccess: async (result) => {
      if (result) {
        console.log(`Successfully minted NFT for stage: ${result.stageId}`)
        console.log(`Transaction signature: ${result.signature}`)
        console.log(`Mint address: ${result.mintAddress}`)
        console.log(`Mint fee paid: ${result.mintFee} SOL`)
      }
      await invalidateBalance()
    },
    onError: (error) => {
      // Don't log cancellations as errors
      if (error instanceof TransactionCancelledError) {
        console.log('Transaction cancelled by user')
        return
      }
      console.error(`Mint stage NFT transaction failed: ${error}`)
    },
  })
}

// Helper to check if user can afford to mint
export function canAffordMint(
  balance: number,
  mintFee: number,
  estimatedTxFee: number = 0.02 // ~0.02 SOL for NFT mint transaction fees (higher than simple transfer)
): boolean {
  return balance >= mintFee + estimatedTxFee
}

// Format mint fee for display
export function formatMintFee(mintFee: number): string {
  return `${mintFee.toFixed(2)} SOL`
}
