import { getPreviewVideo } from '@/actions/workspace'
import VideoPreview from '@/components/global/videos/preview'
import { query } from '@/lib/react-query'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React from 'react'

type Props = {
    params: {videoId: string}
}

const VideoPage = async ({params}: Props) => {
    const {videoId} = await params
    await query.prefetchQuery({
        queryKey: ["preview-video"],
        queryFn: () => getPreviewVideo(videoId),
    })
  return (
    <HydrationBoundary state={dehydrate(query)}>
        <VideoPreview videoId={videoId} />
    </HydrationBoundary>
  )
}

export default VideoPage