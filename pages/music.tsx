import {
    DownloadOutlined, VideoCameraOutlined,
} from '@ant-design/icons';
import Image from "next/image";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Head from "next/head";
import React from "react";

interface Type {
    music : string,
    pic : string,
    video : string,
    name : string,
    description : string,
}


export default function Music({ data } : any) {
    const schemaBreadcrumb = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "main",
          "item": `${process.env.APP_URL}`
        },{
          "@type": "ListItem",
          "position": 2,
          "name": "music",
          "item": `${process.env.APP_URL}/music`
        }]
      }

    return (
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(schemaBreadcrumb)}}
                />
                <link rel="alternate" hrefLang="fa" href={`${process.env.APP_URL}/music`}/>
                <title>آهنگ های شهرام عبدلی</title>
                <meta name="keywords"
                      content="آهنگ شهرام عبدلی ,موزیک شهرام عبدلی ,خواننده شهرام عبدلی ,آهنگ های شهرام عبدلی"/>
                <meta name="description"
                      content={'دانلود و پخش بروز آهنگ های خواننده شهرام عبدلی همراه با موزیک ویدئو با لینک مستقیم'}/>
                <meta property="og:title" content={'آهنگ های شهرام عبدلی'}/>
                <meta property="og:url" content={`${process.env.APP_URL}/music`}/>
            </Head>
            <div className='flex flex-wrap justify-center items-center gap-5'>
                {data.map((value: Type, i: number) => (
                    <div key={`card${i}`} className='flex flex-col rounded-2xl !bg-white  !bg-clip-padding !backdrop-filter
                        !backdrop-blur-sm !bg-opacity-5 shadow-2xl
                         lg:!w-[25vw] md:!w-[40vw] sm:!w-[40vw] mobile:!w-[80vw]'
                    >
                        <Image
                            width={0}
                            height={0}
                            priority
                            sizes="300px"
                            className='w-[300px] h-[300px] rounded-t-2xl lg:!w-[25vw] md:!w-[40vw] sm:!w-[40vw] mobile:!w-[80vw]'
                            src={value.pic}
                            alt={value.pic}
                        />
                        <div key={`player${i}`} style={{direction: 'ltr'}}>
                            <AudioPlayer
                                className='!border-none !bg-white !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-10 '
                                customVolumeControls={[]}
                                key={`player${i}`}
                                customAdditionalControls={[]}
                                preload={"none"}
                                showJumpControls={false}
                                header={<h2 key={`headermusic${i}`} className='text-center'>{value.name}</h2>}
                                src={value.music}
                            />
                        </div>
                        <div className='flex items-center justify-center h-20'>
                            <a key={`musicdownload${i}`} href={value.music} target='_parent'
                               download
                               className="w-full text-center font-medium text-blue-600 dark:text-blue-500
                                hover:underline"><DownloadOutlined/></a>
                            <span className="hidden h-5 w-px bg-gray-200 dark:bg-gray-600 lg:ml-3 lg:inline mx-3"/>
                            <a key={`videodownload${i}`} href={value.video} target='_parent'
                               download className="w-full text-center font-medium text-blue-600 dark:text-blue-500
                                hover:underline"><VideoCameraOutlined/></a>
                        </div>
                    </div>
                ))}
            </div>
        </>

    )
}


export async function getStaticProps() {
    const res = await fetch(`${process.env.API}/music/`)
    const data = await res.json()
    return {
        props: {data},
        revalidate: 3600
    }
}