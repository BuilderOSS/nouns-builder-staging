import { Box, Flex } from '@zoralabs/zord'

import { Avatar } from 'src/components/Avatar'
import { Icon } from 'src/components/Icon'
import { NULL_ADDRESS } from 'src/constants/addresses'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import useNnsOrEnsData from 'src/hooks/useNnsOrEnsData'
import { useChainStore } from 'src/stores/useChainStore'

import { AuctionDetail } from './AuctionDetail'

export const WinningBidder = ({ owner }: { owner?: string }) => {
  const { name, avatar } = useNnsOrEnsData(owner as string)
  const chain = useChainStore((x) => x.chain)

  return (
    <AuctionDetail title="Held by">
      {!owner || owner === NULL_ADDRESS ? (
        'n/a'
      ) : (
        <Flex direction={'row'} align={'center'}>
          <Avatar address={owner} src={avatar} size={'24'} />
          <Box
            as="a"
            href={`${ETHERSCAN_BASE_URL[chain.id]}/address/${owner}`}
            rel={'noopener noreferrer'}
            target="_blank"
            ml={'x2'}
          >
            {name}
          </Box>
          <Icon ml="x1" fill="text4" id="arrowTopRight" />
        </Flex>
      )}
    </AuctionDetail>
  )
}
