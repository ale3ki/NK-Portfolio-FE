
import './globals.css'
import { Inter } from 'next/font/google'

import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from '../components/shared/Header/component'
import Footer from '../components/shared/Footer/component'

import { ApiServiceProvider } from '../utils/ApiServiceContext';

const inter = Inter({ subsets: ['latin'] })



export const metadata = {
  title: "Nicolaas's Portfolio",
  description: 'Create. Inspire. Design.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"> 
      <body className={inter.className}>
        <ApiServiceProvider>
          <NavBar />
          {children}
          <Footer/>
        </ApiServiceProvider>
      </body>
    </html>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts');
  const posts = await res.json();
 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

