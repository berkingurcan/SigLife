// Mint Stage cNFT Hook - Compressed NFT minting for stage graduation
// Uses Metaplex Bubblegum for cNFT minting with stage-based fees

import { useGetBalanceInvalidate } from '@/components/account/use-get-balance'
import {
  getMintFeeForStage,
  getStageNFTMetadata,
  MERKLE_TREE_ADDRESS,
} from '@/constants/cnft-config'
import { STAGES, TREASURY_WALLET, type StageId } from '@/constants/game-config'
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  TransactionMessage,
  TransactionSignature,
  VersionedTransaction,
} from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'

interface MintStageNFTInput {
  stageId: StageId
}

interface MintStageNFTResult {
  signature: TransactionSignature
  stageId: StageId
  mintFee: number
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
 * Hook to mint a stage completion cNFT
 *
 * Flow:
 * 1. Calculate stage-based mint fee (increases 0.02 SOL per stage)
 * 2. Transfer fee to treasury
 * 3. Add memo with mint intent (for backend to process cNFT mint)
 *
 * Note: Since the Merkle tree is private (public: false), actual cNFT minting
 * requires the tree authority to sign. For devnet testing, this sends the fee
 * and records the intent. A backend service would then mint the actual cNFT.
 *
 * To enable direct client-side minting, redeploy the tree with public: true.
 */
export function useMintStageNFT({ address }: { address: PublicKey }) {
  const { connection, signAndSendTransaction } = useMobileWallet()
  const invalidateBalance = useGetBalanceInvalidate({ address })

  return useMutation({
    mutationKey: ['mint-stage-nft', { endpoint: connection.rpcEndpoint, address }],
    mutationFn: async (input: MintStageNFTInput): Promise<MintStageNFTResult | undefined> => {
      let signature: TransactionSignature = ''

      try {
        // Validate configuration
        if (!TREASURY_WALLET) {
          throw new Error('Treasury wallet not configured. Please set TREASURY_WALLET in game-config.ts')
        }

        if (!MERKLE_TREE_ADDRESS) {
          throw new Error(
            'Merkle tree not configured. Deploy tree and set EXPO_PUBLIC_MERKLE_TREE_ADDRESS in .env'
          )
        }

        const treasuryPubkey = new PublicKey(TREASURY_WALLET)
        const stage = STAGES.find((s) => s.id === input.stageId)

        if (!stage) {
          throw new Error(`Invalid stage: ${input.stageId}`)
        }

        // Get stage-based mint fee (increases by 0.02 SOL per stage)
        const mintFee = getMintFeeForStage(input.stageId)
        const metadata = getStageNFTMetadata(input.stageId)

        console.log(`Minting cNFT for stage: ${stage.name}`)
        console.log(`Mint fee: ${mintFee} SOL`)
        console.log(`Merkle Tree: ${MERKLE_TREE_ADDRESS}`)
        console.log(`Recipient: ${address.toString()}`)

        // Get latest blockhash
        const {
          context: { slot: minContextSlot },
          value: latestBlockhash,
        } = await connection.getLatestBlockhashAndContext()

        // Create instructions
        const instructions = [
          SystemProgram.transfer({
            fromPubkey: address,
            toPubkey: treasuryPubkey,
            lamports: Math.floor(mintFee * LAMPORTS_PER_SOL),
          }),
        ]

        // Add memo with minting intent
        // This allows a backend service to verify the payment and mint the cNFT
        const memoData = JSON.stringify({
          action: 'mint_cnft',
          stageId: input.stageId,
          stageName: stage.name,
          recipient: address.toString(),
          merkleTree: MERKLE_TREE_ADDRESS,
          metadata: {
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
          },
          timestamp: Date.now(),
        })

        const memoInstruction = new TransactionInstruction({
          keys: [],
          programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
          data: Buffer.from(memoData),
        })

        instructions.push(memoInstruction)

        // Create TransactionMessage and VersionedTransaction
        const messageLegacy = new TransactionMessage({
          payerKey: address,
          recentBlockhash: latestBlockhash.blockhash,
          instructions,
        }).compileToLegacyMessage()

        const transaction = new VersionedTransaction(messageLegacy)

        // Sign and send transaction
        signature = await signAndSendTransaction(transaction, minContextSlot)

        // Wait for confirmation
        await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')

        console.log(`Stage cNFT mint fee transferred: ${signature}`)
        console.log(`Memo included with mint intent for stage: ${stage.name}`)

        return {
          signature,
          stageId: input.stageId,
          mintFee,
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
        console.log(`Successfully processed cNFT mint for stage: ${result.stageId}`)
        console.log(`Transaction signature: ${result.signature}`)
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
      console.error(`Mint stage cNFT transaction failed: ${error}`)
    },
  })
}
