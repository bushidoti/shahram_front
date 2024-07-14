import {useEffect, useState} from "react"
import Link from "next/link";
import {AppleIcon, InstaIcon, ShazamIcon, SpotIcon, YoutubeIcon} from "@/components/icons";

interface Type {
    apple : string,
    pic : string,
    spotify : string,
    shazam : string,
    color : string,
    youtube : string,
    insta : string,
}


export default function Footer() {

  const [data, setData] = useState<Type>()
  useEffect(() => {
    fetch('https://api.shahramabdoli.ir/panel/')
      .then((res) => res.json())
      .then((data) => {
        setData(data[0])
      })
  }, [])

  return (
    <footer className="bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 m-2 rounded">
      <div className="mx-auto max-w-7xl px-6 py-5 md:flex md:items-center md:justify-between lg:px-8">
            <div className='flex items-center justify-center gap-5'>
                {data?.insta ?  <Link
                  rel='noopener' target='_blank' href={data?.insta}><InstaIcon/></Link> : null}
                {data?.apple ? <Link
                  rel='noopener' target='_blank' href={data?.apple}><AppleIcon/></Link> : null}
                {data?.spotify ? <Link
                  rel='noopener' target='_blank' href={data?.spotify}><SpotIcon/></Link> : null}
                {data?.youtube ? <Link
                  rel='noopener' target='_blank' href={data?.youtube || '#'}><YoutubeIcon/></Link> : null}
                 {data?.shazam ? <Link
                  rel='noopener' target='_blank' href={data?.shazam || '#'}><ShazamIcon/></Link> : null}
            </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-black font-bold">
            سایت رسمی خواننده شهرام عبدلی ©{new Date().getFullYear()} ساخته شده توسط Bushidoti</p>
        </div>
      </div>
    </footer>
  )
}
