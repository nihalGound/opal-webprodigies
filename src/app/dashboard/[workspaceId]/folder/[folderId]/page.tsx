import { getAllUserVideos, getFolderInfo } from '@/actions/workspace'
import FolderInfo from '@/components/global/folders/folder-info'
import Videos from '@/components/global/videos'
import { query } from '@/lib/react-query'
import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query'
import React from 'react'

type Props = {
  params: {
    folderId: string
    workspaceId: string
  }
}

const page = async ({ params }: Props) => {
  const {folderId, workspaceId} = await params;
  await query.prefetchQuery({
    queryKey: ['folder-videos'],
    queryFn: () => getAllUserVideos(folderId),
  })

  await query.prefetchQuery({
    queryKey: ['folder-info'],
    queryFn: () => getFolderInfo(folderId),
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <FolderInfo folderId={folderId} />
      <Videos
        workspaceId={workspaceId}
        folderId={folderId}
        videosKey="folder-videos"
      />
    </HydrationBoundary>
  )
}

export default page