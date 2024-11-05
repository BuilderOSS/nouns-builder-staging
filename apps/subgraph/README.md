# Nouns Builder Subgraph

## Getting started with Goldsky 👉  
- Read the docs: https://docs.goldsky.com/subgraphs/deploying-subgraphs

### Chain Environment

Nouns Builder subgraph currently supports four networks: Ethereum's `mainnet`, Ethereum's current test network `sepolia`, `base`, `optimism, `and `zora`.  

Set the environment variables indicated below to deploy the subgraph to the desired network:  
```bash
# the default chain id defined in .env, to run against testnet
NETWORK_RPC=<TESTNET_RPC_ENDPOINT>
NETWORK_NAME=sepolia

# to run against mainnet locally
NETWORK_RPC=<MAINNET_RPC_ENDPOINT>
NETWORK_NAME=mainnet
```

## Setup

### Step 0 - Create a local .env file and set the env variables to the desired network

```bash
cp .env.example .env
````

### Step 1 - Install dependencies

```bash
# FROM: ./apps/subgraph
pnpm install
````

### Step 2 - Set up a personal Goldsky API key  
1. Ask to join the team account at [goldsky.com](https://goldsky.com)
2. Create an API key for yourself on the Settings page
3. Install the Goldsky CLI locally:  
```bash
curl https://goldsky.com | sh  
```  

### Step 4 - Log in with your API key created earlier:  
```bash
# FROM: ./apps/subgraph
goldsky login
```

### Step 3 - Build the subgraph locally
```bash
# FROM: ./apps/subgraph
# These scripts are defined in the package.json file
pnpm prepare:<desired network>
pnpm codegen
pnpm build
```  

This will generate the types, build the subgraph, and create the local `subgraph.yml` file
### Step 4 - Deploy a new or updated subgraph

#### !!!! IMPORTANT: !!!!!  
**To avoid subgraph downtime in production when upgrading, it is BEST to have a duplicate/backup subgraph so that if something goes wrong, the
traffic can be redirected to the duplicate subgraph instead of having to wait for the subgraph to re-deploy/rollback to
a previous version, which can take hours!**

- Note: The subgraph name is always `nouns-builder-<network>` regardless of version so the clients don't have to update their URI on every minor version bump. 
- However, you still should always bump the `specVersion` at the top of `subgraph.yaml.mustache` when making changes.  
- The **--tag** flag aliases `latest` to the latest `specVersion`.

**Never forget to tag!**

```bash
# FROM: ./apps/subgraph
# This example specVersion is 0.0.6

$ goldsky subgraph deploy nouns-builder-<network>/0.0.6 --path .        
$ goldsky subgraph tag create nouns-builder-<network>/0.0.6 --tag latest
# The API endpoint will now be in this format: api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-ethereum-sepolia/latest/gn
```

### Step 5 - Query the Subgraph

You can now query the subgraph in the Goldsky GraphQL playground to test your changes, **but be aware it may take a few hours to
fully index.**

## Production Endpoints

The subgraph is currently deployed to the following networks:

- TODO: - [Ethereum Mainnet](https://api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-ethereum/latest/gn)  
- [Ethereum Sepolia](https://api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-ethereum-sepolia/latest/gn)  
- TODO: - [Optimism Mainnet](https://api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-optimism/latest/gn)  
- TODO: - [Optimism Sepolia](https://api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-optimism-sepolia/latest/gn)  
- TODO: - [Zora Mainnet](https://api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-zora/latest/gn)  
- TODO: - [Zora Sepolia](https://api.goldsky.com/api/public/<project name>//subgraphs/nouns-builder-zora-sepolia/latest/gn)  
- TODO: - [Base Mainnet](https://api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-base/latest/gn)  
- TODO: - [Base Sepolia](https://api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-base-sepolia/latest/gn)

## Local Development
- generate types with `pnpm codegen`
- build the subgraph with `pnpm build`
- run the local graph node with `pnpm local-node`
- for Mac users on Apple Silicon chips you will need to use a local image of `graphprotocol/graph-node` [instructions here](https://github.com/graphprotocol/graph-node/tree/master/docker)
- create the local subgraph with `pnpm create-local`
- deploy changes to the local subgraph with `pnpm deploy-local`
