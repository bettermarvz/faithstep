import React from 'react'

const Card
 = ({
    className,
    title,
    children
}:{
    className?:string,
    title?: string
    children?: React.ReactNode
}) => {
  return (
    <div
    className={`p-4 rounded-xl w-full flex flex-col gap-3 ${className}`}
    >
        <p className='text-[16px] font-bold text-black/60'>{title}</p>
        <div>{children}</div>
    </div>
  )
}

export default Card
