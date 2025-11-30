import React from 'react'
import Card from './Card/Card'
import dayjs from 'dayjs'
import { Heart } from 'lucide-react'

const GratitudeCard = (
    {
        content,
        dateCreated = 'November 30, 2025',
        reactionCount
    }:
    {
        content: string
        dateCreated?: string
        reactionCount:string
    }
) => {
    
  return (
    <Card className='bg-white '>
        <div className='flex flex-col justify-center gap-[10px]'>
        <div><p>{dayjs(dateCreated).format('h:mm A')}</p></div>
        <p>{content}</p>
        <div className='flex items-center gap-2 text-black/60'><Heart />{reactionCount}</div>
        </div>
    </Card>
  )
}

export default GratitudeCard