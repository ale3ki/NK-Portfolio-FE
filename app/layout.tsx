import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from '../components/shared/Header/component'
import Footer from '../components/shared/Footer/component'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Nicolaas's Portfolio",
  description: 'Create. Inspire. Design.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <NavBar />
        {children}
      <Footer/>

      </body>
    </html>
  )
}
