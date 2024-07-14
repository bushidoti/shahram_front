import { Navbar} from "flowbite-react";
import {useEffect, useState} from "react";
import Image from "next/image";
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

export default function Header() {
  const [data, setData] = useState<Type>()

  useEffect(() => {
    fetch('https://api.shahramabdoli.ir/panel/')
      .then((res) => res.json())
      .then((data) => {
        setData(data[0])
      })
  }, [])



  return (
    <header>
      <Navbar className='bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 m-2 rounded'>
          <Link className='flex items-center' href="/">
            <span className="ml-2 bg-sky-500 !border-solid !border-2 !border-blue-500 inline-block h-14 w-[52px] overflow-hidden rounded-full">
                <Image
                          priority
                          sizes={'52px'}
                          width={52}
                          placeholder="blur"
                          blurDataURL={'/assets/pic/avatar.jpeg'}
                          height={52}
                          src={'/assets/pic/avatar.jpeg'}
                          alt={'Avatar'}/>
              </span>
              <span className="text-black self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            شهرام عبدلی
          </span>
          </Link>
          <div className="flex items-center lg:order-2 lg:mt-2">
          <span className="hidden h-5 w-px bg-gray-200 dark:bg-gray-600 lg:ml-3 lg:inline mx-3" />
            <div className='items-center justify-center space-x-2 hidden lg:inline '>
              {data?.insta ? <Link
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
          <Navbar.Toggle theme={{icon: "h-5 w-5 shrink-0"}} className="mr-1 text-black" />
        </div>
        <Navbar.Collapse
          theme={{
            list: "mt-4 flex flex-col lg:mt-0 lg:flex-row lg:space-x-8 lg:text-base lg:font-medium",
          }}
          className="lg:order-1"
        >
          <Link className='text-black bg-transparent m-1 ml-5 hover:text-green-400'  href="/">
            خانه
          </Link>
          <Link className='text-black m-1 hover:text-green-400' href="/music">موزیک</Link>
          <Link className='text-black m-1 hover:text-green-400' href="/video">موزیک ویدئو</Link>
          <Link className='text-black m-1 hover:text-green-400' href="/photo">عکس</Link>
          <Link className='text-black m-1 hover:text-green-400' href="/bio">بیوگرافی</Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
