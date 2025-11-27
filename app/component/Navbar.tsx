import Link from 'next/link'
import React from 'react'

const NavLink = ({src, label, active}:{src: string, label:string, active?: boolean}) => <Link className={`px-1 py-[10px] ${active ? 'border-b-4 border-[#10B981]' : ''} `} href={src}>{label}</Link>


const Navbar = () => {
  return (
    <section>
        <div className='flex items-center gap-14'>
            <p className='text-[28px] font-bold'>FaithStep</p>
            <div className='flex gap-6 text-[18px] font-bold'>
                <NavLink src='/' label='Home' active={true}/>
                <NavLink src='/challenges' label='Challenges'/>
                <NavLink src='/gratitude' label='Gratitude'/>
            </div>
        </div>
        </section>
  )
}

export default Navbar