import Navbar from '@/components/Navbar'
import Newsletter from '@/components/Newsletter'
import React from 'react'
import { CartProvider } from '../context/CartContext'
import ShoppingCartModal from '@/components/ShoppingCartModal'
import {Toaster} from "sonner"

const HomeLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <CartProvider>
      <Toaster />
    <div>
        <Navbar/>
        <ShoppingCartModal/>
      {children}
      <Newsletter/>
    </div>
    </CartProvider>
  )
}

export default HomeLayout
