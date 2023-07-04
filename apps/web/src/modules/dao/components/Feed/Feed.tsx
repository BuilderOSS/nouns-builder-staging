import { CastAddData, Message, SignatureScheme } from '@farcaster/hub-nodejs'
import { Button, Flex } from '@zoralabs/zord'
import axios from 'axios'
import React, { useMemo } from 'react'
import useSWRInfinite from 'swr/infinite'

import { useLayoutStore } from 'src/stores'

import { CardSkeleton } from './CardSkeleton'
import { CastCard } from './CastCard'
import { DisplayPanel } from './DisplayPanel'
import { loadMoreButton } from './Feed.css'
import { FeedTab } from './FeedTab'

type FeedTabProps = {
  collectionAddress: string
}

export type CasterProfile = {
  displayName?: string
  pfp?: string
  fName?: string
}

type AddMsgWithUnix = Message & {
  data: CastAddData
  unixTime: number
  hexHash: string
  signatureScheme: SignatureScheme.ED25519
  profile: CasterProfile
  mentionsfNames: string[]
}
type PageData = { value: AddMsgWithUnix[]; nextPageToken?: string }

const Feed = ({ collectionAddress }: FeedTabProps) => {
  const isMobile = useLayoutStore((x) => x.isMobile)
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID || '1'

  const { data, error, isValidating, setSize } = useSWRInfinite(
    (_pageIndex: number, prevPageData: PageData) => {
      if (prevPageData && !prevPageData.nextPageToken) return null
      return `/api/feed/${collectionAddress}:${chainId}:${
        prevPageData?.nextPageToken || ''
      }`
    },
    (url) =>
      axios.get<PageData>(url).then((x) => {
        return x.data
      })
  )

  const { casts } = useMemo(() => {
    if (!data) return {}
    return { casts: data.flatMap((pageData) => pageData.value) }
  }, [data])

  const loadMore = () => {
    setSize((size) => size + 1)
  }

  if (error) {
    return (
      <FeedTab isMobile={isMobile}>
        <Flex
          justify="center"
          align="center"
          width="100%"
          height="100%"
          direction="column"
        >
          <DisplayPanel title="Error" description={error?.message || 'Unknown Error'} />
        </Flex>
      </FeedTab>
    )
  }

  if (isValidating && !casts?.length) {
    return (
      <FeedTab isMobile={isMobile}>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </FeedTab>
    )
  }

  return (
    <FeedTab isMobile={isMobile}>
      {casts?.map((msg) => (
        <CastCard
          key={msg.hexHash}
          text={msg?.data?.castAddBody?.text}
          fid={msg.data.fid}
          timestamp={msg.unixTime}
          hexHash={msg.hexHash}
          mentions={msg?.data?.castAddBody?.mentions}
          mentionsPositions={msg?.data?.castAddBody?.mentionsPositions}
          profile={msg.profile}
          mentionsfNames={msg.mentionsfNames}
        />
      ))}
      <Button onClick={loadMore} loading={isValidating} className={loadMoreButton}>
        Load More
      </Button>
    </FeedTab>
  )
}

export default Feed
