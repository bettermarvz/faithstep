import React from 'react'
import Card from '../Card/Card'
import { CircleCheck } from 'lucide-react'

const ChallengeItem = () => {
  return (
    <Card 
      title="Today’s Daily Challenge"
      className='bg-white'>
        <div className='flex gap-2'><CircleCheck /><p className='text-[18px] text-black/80 font-bold'>
        Pray for someone today</p></div>
        <div className='text-black/60'>Today’s challenge is to pause and pray for someone in your life. Think of a person who might need comfort, guidance, or hope, and spend a moment speaking their name in prayer.</div>
        <div className='flex justify-end'><button type='submit' className='text-[#10B981] font-semibold'>Mark as done</button></div>
        </Card>
  )
}

export default ChallengeItem