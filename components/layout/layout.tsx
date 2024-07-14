import React, {useEffect, useState} from 'react';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";


interface Type {
    color : string,
}

export default function Main({ children }: any) {
  const [data, setData] = useState<Type>()


  useEffect(() => {
    fetch('https://api.shahramabdoli.ir/panel/')
      .then((res) => res.json())
      .then((data) => {
        setData(data[0])
      })
  }, [])

  return (
    <div className='p-1' style={{background:data?.color}}>
      <Header/>
        <div
            className='rounded m-2 p-2 h-[100%] !bg-white  !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-50'
            style={{padding: 24}}>
            <div className='min-h-[100vh]' style={{padding: 24}}>
                <main>{children}</main>
            </div>
        </div>
        <Footer/>
    </div>
  );
};