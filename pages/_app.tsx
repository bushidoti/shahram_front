import "@/styles/globals.css";
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app'
const Main = dynamic(() => import('@/components/layout/layout'), {
  ssr: false,
});



export default function App({ Component, pageProps }: AppProps) {
   return (
               <Main>
                     <Component {...pageProps} />
               </Main>
        )
    }