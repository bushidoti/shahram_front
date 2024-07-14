import {DownloadOutlined} from '@ant-design/icons';
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




export default function Videos({ data } : any) {
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
          "name": "video",
          "item": `${process.env.APP_URL}/video`
        }]
      }

    return (
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(schemaBreadcrumb)}}
                />
                <link rel="alternate" hrefLang="fa" href={`${process.env.APP_URL}/video`}/>
                <title>موزیک ویدئو های شهرام عبدلی</title>
                <meta name="keywords"
                      content="موزیک ویدئو شهرام عبدلی, خواننده شهرام عبدلی, موزیک ویدئوهای شهرام عبدلی"/>
                <meta name="description"
                      content={'دانلود و پخش بروز موزیک ویدئو های  خواننده شهرام عبدلی با لینک مستقیم و کیفیت بالا'}/>
                <meta property="og:title" content={'موزیک ویدئو های شهرام عبدلی'}/>
                <meta property="og:url" content={`${process.env.APP_URL}/video`}/>
            </Head>
            <div className='flex flex-wrap gap-5 justify-center items-center'>
                {data.map((value: Type, i: number) => (
                    <div key={`div${i}`}>
                        {value.video ?
                            <div key={`card${i}`} className='flex flex-col items-center gap-5 rounded-2xl !bg-white  !bg-clip-padding !backdrop-filter
                        !backdrop-blur-sm !bg-opacity-5 shadow-2xl
                         lg:!w-[25vw] md:!w-[40vw] sm:!w-[40vw] mobile:!w-[80vw]'
                            >
                                <video
                                    className='w-[300px] h-[300px] object-fill rounded-t-2xl lg:!w-[25vw] md:!w-[40vw] sm:!w-[40vw] mobile:!w-[80vw]'
                                    poster={value.pic}
                                    aria-label={value.name} key={`video${i}`} width={300} height={250}
                                    controls preload={'none'}>
                                    <source src={value.video} type="video/mp4"/>
                                    مرورگر شما این قابلیت را پشتیبانی نمیکند
                                </video>
                                <div className='flex flex-col items-center justify-center'>
                                    <h2>{value.name}</h2>
                                </div>
                                <a key={`videodownload${i}`} href={value.video} target='_parent'
                                   download className="w-full h-10 text-center font-medium text-blue-600 dark:text-blue-500
                                hover:underline"><DownloadOutlined/></a>
                            </div>
                            : null}</div>
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