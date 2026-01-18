// Mint Stage NFT Hook - Treasury fee transfer for stage graduation
import { createTransaction } from '@/components/account/create-transaction'
import { useGetBalanceInvalidate } from '@/components/account/use-get-balance'
import { MINT_FEE_SOL, TREASURY_WALLET, type StageId } from '@/constants/game-config'
import { PublicKey, TransactionSignature } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'

interface MintStageNFTInput {
  stageId: StageId
}

interface MintStageNFTResult {
  signature: TransactionSignature
  stageId: StageId
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

export function useMintStageNFT({ address }: { address: PublicKey }) {
  const { connection, signAndSendTransaction } = useMobileWallet()
  const invalidateBalance = useGetBalanceInvalidate({ address })

  return useMutation({
    mutationKey: ['mint-stage-nft', { endpoint: connection.rpcEndpoint, address }],
    mutationFn: async (input: MintStageNFTInput): Promise<MintStageNFTResult | undefined> => {
      let signature: TransactionSignature = ''

      try {
        // Validate treasury wallet is configured
        if (!TREASURY_WALLET) {
          throw new Error('Treasury wallet not configured. Please set TREASURY_WALLET in game-config.ts')
        }

        const treasuryPubkey = new PublicKey(TREASURY_WALLET)

        // Create transaction to send mint fee to treasury
        const { transaction, latestBlockhash, minContextSlot } = await createTransaction({
          publicKey: address,
          destination: treasuryPubkey,
          amount: MINT_FEE_SOL,
          connection,
        })

        // Sign and send transaction
        signature = await signAndSendTransaction(transaction, minContextSlot)

        // Wait for confirmation
        await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')

        console.log(`Stage NFT mint transaction confirmed: ${signature}`)

        return {
          signature,
          stageId: input.stageId,
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
