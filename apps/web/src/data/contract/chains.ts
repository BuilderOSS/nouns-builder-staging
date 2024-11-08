import {chain, configureChains} from 'wagmi';
import {
    base,
    baseSepolia,
    mainnet,
    optimism,
    optimismSepolia,
    sepolia,
    zora,
    zoraSepolia,
} from 'wagmi/chains'
import {jsonRpcProvider} from 'wagmi/providers/jsonRpc'
import {connectorsForWallets, wallet, Chain, Wallet} from '@rainbow-me/rainbowkit';
import {alchemyProvider} from 'wagmi/providers/alchemy';
import {publicProvider} from 'wagmi/providers/public';
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect';


import {PUBLIC_IS_TESTNET} from 'src/constants/defaultChains'
import {RPC_URL} from 'src/constants/rpc'
import {CHAIN_ID} from 'src/typings'

const MAINNET_CHAINS = [mainnet, zora, base, optimism]
// Mainnet is required here due to hooks like useEnsData that only pull data from mainnet
const TESTNET_CHAINS = [mainnet, sepolia, optimismSepolia, baseSepolia, zoraSepolia]

export const L1_CHAINS = PUBLIC_IS_TESTNET ? [CHAIN_ID.SEPOLIA] : [CHAIN_ID.ETHEREUM]

export const L2_CHAINS = PUBLIC_IS_TESTNET
    ? [CHAIN_ID.ZORA_SEPOLIA, CHAIN_ID.BASE_SEPOLIA, CHAIN_ID.OPTIMISM_SEPOLIA]
    : [CHAIN_ID.ZORA, CHAIN_ID.BASE, CHAIN_ID.OPTIMISM]

const {chains, publicClient} = configureChains(
    [...TESTNET_CHAINS, ...MAINNET_CHAINS],
    [
        jsonRpcProvider({
            rpc: (chain) => ({
                http: RPC_URL[chain.id as CHAIN_ID],
            }),
        }),
    ]
)

export interface MyWalletOptions {
    chains: Chain[];
}

const chains = [chain.mainnet]
const {chains} = configureChains(
    [chain.mainnet],
    [
        alchemyProvider({alchemyId: process.env.ALCHEMY_ID}),
        publicProvider(),
    ]
);

export const rainbow = ({chains}: MyWalletOptions): Wallet => ({
    createConnector: () => {
        const connector = new WalletConnectConnector({
            chains,
            options: {
                qrcode: false,
            })
    })
    }
})
