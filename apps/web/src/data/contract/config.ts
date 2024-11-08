import {chains} from './chains'
import {getDefaultConfig} from "@rainbow-me/rainbowkit";

const config = getDefaultConfig({
    appName: 'Nouns Builder',
    projectId: 'YOUR_PROJECT_ID', // TODO: Replace with your project ID
    chains
    /* Wagmi createConfig options including `transports` are also accepted */
})