import { Box, Flex, Text } from '@zoralabs/zord'
import Link from 'next/link'
import React from 'react'

import { Avatar } from 'src/components/Avatar'
import useNnsOrEnsData from 'src/hooks/useNnsOrEnsData'

import { recentBidder } from '../Auction.css'

interface BidderProps {
  address: string
}

export const Bidder: React.FC<BidderProps> = ({ address }) => {
  const { name, avatar } = useNnsOrEnsData(address)

  return (
    <Flex align="center">
      <Box mr="x2">
        <Avatar address={address} src={avatar} size="32" />
      </Box>
      <Text className={recentBidder} variant="paragraph-md">
        <Link href={`/profile/${address}`} passHref>
          <a>{name}</a>
        </Link>
      </Text>
    </Flex>
  )
}
