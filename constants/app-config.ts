import { Cluster } from '@/components/cluster/cluster'
import { ClusterNetwork } from '@/components/cluster/cluster-network'
import { clusterApiUrl } from '@solana/web3.js'
import { SolanaClusterId } from '@wallet-ui/react-native-web3js'

export class AppConfig {
  static name = 'SigLife'
  static uri = 'https://example.com'
  static clusters: Cluster[] = [
    {
      id: 'solana:mainnet-beta' as SolanaClusterId,
      name: 'Mainnet',
      endpoint: process.env.EXPO_PUBLIC_SOLANA_ENDPOINT ?? 'https://api.mainnet-beta.solana.com',
      network: ClusterNetwork.Mainnet,
    },
    {
      id: 'solana:devnet',
      name: 'Devnet',
      endpoint: clusterApiUrl('devnet'),
      network: ClusterNetwork.Devnet,
    },
    {
      id: 'solana:testnet',
      name: 'Testnet',
      endpoint: clusterApiUrl('testnet'),
      network: ClusterNetwork.Testnet,
    },
  ].sort((a) => {
    const desiredNetwork = process.env.EXPO_PUBLIC_SOLANA_NETWORK ?? 'devnet'
    return a.network === desiredNetwork ? -1 : 1
  })
}
