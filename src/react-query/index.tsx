"use client"
import { query } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'


type Props = {
    children: React.ReactNode
}

const ReactQueryProvider = ({children}: Props) => {
  return (
    <QueryClientProvider client={query}>
        {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider