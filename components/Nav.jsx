"use client"

import  Link from 'next/link'
import Image from "next/image"
import { useState,useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const nav = () => {
   const isUserLoggedIn=true
const [providers,setProviders]=useState(null);
const [toggleDropdown,settoggleDropdown]=useState(false);
useEffect(()=>{
(
  async()=>{
    const response = await getProviders();
    console.log(response)
    setProviders(response)})()
},[])
 console.log(toggleDropdown)


  return (
    <nav className='flex-between w-full  mb-16 pt-3'>
    <Link href='/' className='flex gap-2  flex-center'>
      <Image
        src='/assets/images/logo.svg'
        alt='logo'
        width={30}
        height={30}
        className='object-contain'
      />
      <p className='logo_text'>Promptopia</p>
      </Link>
      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
         
 <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                src={'/assets/images/logo.svg'}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ):( <div>
         { providers && Object.values(providers).map((providers)=>(
          <button 
          type='button'
          key={providers.id}
          onClick={()=> signIn(providers.id)}>

          </button>
         ))}


        </div> )}

       
      </div>

      <div className='sm:hidden flex relative'>
        {isUserLoggedIn ? ( 
          <div className='flex'>
          <Image
                src={'/assets/images/logo.svg'}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={()=> settoggleDropdown((prev)=> !prev) 
                  
                }
              />
        </div> ):(
          <div>
         { providers && Object.values(providers).map((providers)=>(
          <button 
          type='button'
          key={providers.id}
          onClick={()=> signIn(providers.id)}>
Sign In
          </button>
         ))}


        </div> 
         )}


        </div>
    
    </nav>
  )
}

export default nav