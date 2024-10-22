import { CheckCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function SuccessPage() {
  return (
    <div className='h-screen mt-32 md:max-w[50vw] mx-auto'>
        <CheckCheck className='text-green-600 w-72 h-16 mx-auto my-6'/>
<div className="text-center">
    <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
        Payment Successful!
    </h3>
    <p className='text-gray-600 my-2 px-6'>Thank You for your purchase, Check your email for order confirmation</p>
    <p className='mb-3'>Have a great day</p>
    <Link className='text-center text-bold text-xl font-karla text-blue-600 mt-3 underline' href={"/shop"}>Continue shopping</Link>
</div>
      <div>

      </div>
    </div>
  )
}

export default SuccessPage
