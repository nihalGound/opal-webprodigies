import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

type Props = {
    triggers : string[]
    defaultValue: string
    children: React.ReactNode
}

const TabMenu = ({triggers,defaultValue,children}: Props) => {
  return (
    <Tabs
        defaultValue={defaultValue}
        className="w-full"
    >
        <TabsList className="flex justify-start bg-transparent">
            {
                triggers.map((trigger)=> (
                    <TabsTrigger
                        key={trigger}
                        value={trigger}
                        className="capitalize text-base data-[state=active]:bg-[#1D1D1D]"
                    >
                        {trigger}
                    </TabsTrigger>
                ))}
        </TabsList>
        {children}
    </Tabs>
  )
}

export default TabMenu