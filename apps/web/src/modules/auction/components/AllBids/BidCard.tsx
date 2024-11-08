import { Box, Flex, Text } from '@zoralabs/zord'
import React from 'react'

import { Avatar } from 'src/components/Avatar'
import { Icon } from 'src/components/Icon'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { AuctionBidFragment } from 'src/data/subgraph/sdk.generated'
import useNnsOrEnsData from 'src/hooks/useNnsOrEnsData'
import { useChainStore } from 'src/stores/useChainStore'
import { formatCryptoVal } from 'src/utils/numbers'

export const BidCard = ({ bid }: { bid: AuctionBidFragment }) => {
  const { name, avatar } = useNnsOrEnsData(bid?.bidder)
  const chain = useChainStore((x) => x.chain)

  return (
    <Flex direction={'column'} my="x4" align="center" style={{ height: 35 }}>
      <Flex direction="row" width={'100%'} align="center" justify="space-between">
        <Flex direction="row" align="center">
          <Avatar address={bid.bidder} src={avatar} size="28" />
          <Text mx="x2" variant="paragraph-md">
            {name}
          </Text>
        </Flex>
        <Flex direction="row" align="center">
          <Flex
            as="a"
            href={`${ETHERSCAN_BASE_URL[chain.id]}/address/${bid.bidder}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text mr="x2" variant="paragraph-md">
              {formatCryptoVal(bid.amount)} ETH
            </Text>
            <Icon id="external-16" fill="text4" size="sm" align={'center'} />
          </Flex>
        </Flex>
      </Flex>
      <Box
        mt="x2"
        style={{
          borderBottom: '1px solid #B3B3B3',
          width: '100%',
          opacity: 0.5,
        }}
      />
    </Flex>
  )
}
