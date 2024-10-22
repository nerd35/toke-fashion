import React from 'react'

interface UserDetailProps {
    userDetails: any
}

const AccountDetails = ({userDetails}: UserDetailProps) => {
  return (
    <div className='py-4 grid grid-cols-1  md:grid-cols-2 gap-5'>
      <div className=''>
            <p className='text-[#2b2b2b] text-lg mb-2 font-karla font-medium'>First Name</p>
            <p className='border py-3 px-4 font-bold font-karla text-xl text-[#2b2b2b] '>{userDetails?.firstname}</p>
      </div>
      <div className=''>
            <p className='text-[#2b2b2b] text-lg mb-2 font-karla font-medium'>Last Name</p>
            <p className='border py-3 px-4 font-bold font-karla text-xl text-[#2b2b2b] '>{userDetails?.lastname}</p>
      </div>
      <div className=''>
            <p className='text-[#2b2b2b] text-lg mb-2 font-karla font-medium'>Email</p>
            <p className='border py-3 px-4 font-bold font-karla text-xl text-[#2b2b2b] '>{userDetails?.email}</p>
      </div>
      <div className=''>
            <p className='text-[#2b2b2b] text-lg mb-2 font-karla font-medium'>Phone Number</p>
            <p className='border py-3 px-4 font-bold font-karla text-xl text-[#2b2b2b] '>{userDetails?.phonenumber}</p>
      </div>
      <div className=''>
            <p className='text-[#2b2b2b] text-lg mb-2 font-karla font-medium'>Username</p>
            <p className='border py-3 px-4 font-bold font-karla text-xl text-[#2b2b2b] '>{userDetails?.username}</p>
      </div>
      <div className=''>
            <p className='text-[#2b2b2b] text-lg mb-2 font-karla font-medium'>Address</p>
            <p className='border py-3 px-4 font-bold font-karla text-xl text-[#2b2b2b] '>{userDetails?.address}</p>
      </div>
      <div className=''>
            <p className='text-[#2b2b2b] text-lg mb-2 font-karla font-medium'>Country</p>
            <p className='border py-3 px-4 font-bold font-karla text-xl text-[#2b2b2b] '>{userDetails?.country}</p>
      </div>
      <div className=''>
            <p className='text-[#2b2b2b] text-lg mb-2 font-karla font-medium'>State</p>
            <p className='border py-3 px-4 font-bold font-karla text-xl text-[#2b2b2b] '>{userDetails?.state}</p>
      </div>
      <div className=''>
            <p className='text-[#2b2b2b] text-lg mb-2 font-karla font-medium'>City</p>
            <p className='border py-3 px-4 font-bold font-karla text-xl text-[#2b2b2b] '>{userDetails?.city}</p>
      </div>
    </div>
  )
}

export default AccountDetails
