// Mint Stage NFT Hook - Treasury fee transfer for stage graduation
import { PublicKey, TransactionSignature } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import { createTransaction } from '@/components/account/create-transaction'
import { useGetBalanceInvalidate } from '@/components/account/use-get-balance'
import { TREASURY_WALLET, MINT_FEE_SOL, type StageId } from '@/constants/game-config'

interface MintStageNFTInput {
  stageId: StageId
}

interface MintStageNFTResult {
  signature: TransactionSignature
  stageId: StageId
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
        if (!TREASURY_WALLET || TREASURY_WALLET === 'YOUR_TREASURY_WALLET_ADDRESS_HERE') {
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
      console.error(`Mint stage NFT transaction failed: ${error}`)
    },
  })
}
