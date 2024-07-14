import Image from "next/image";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import {AppleIcon, InstaIcon, ShazamIcon, SpotIcon, YoutubeIcon} from "@/components/icons";

export default function Bio({ data } : any) {
    const schemaBreadcrumb = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "main",
          "item": "https://www.shahramabdoli.ir"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": "bio",
          "item": "https://www.shahramabdoli.ir/bio"
        }]
      }

    return (
        <div>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(schemaBreadcrumb)}}
                />
                <link rel="alternate" hrefLang="fa" href="https://www.shahramabdoli.ir/bio"/>
                <title>بیوگرافی شهرام عبدلی</title>
                <meta name="keywords"
                      content="خواننده شهرام عبدلی, بیو گرافی شهرام عبدلی"/>
                <meta name="description"
                      content={data[0]?.bio}/>
                <meta property="og:image" content={'/assets/pic/avatar.jpeg'}/>
                <meta property="og:title" content={'بیوگرافی - شهرام عبدلی'}/>
                <meta property="og:url" content={'https://www.shahramabdoli.ir/bio'}/>
            </Head>
            <div className='flex flex-col gap-[100px]'>
                <h1 hidden>بیوگرافی</h1>
                <div
                    className='flex flex-wrap gap-10 mobile:items-center mobile:justify-center lg:items-center lg:justify-start'>
                    <Image
                        className="object-top  inline-block h-40 w-40 rounded-md"
                        width={1254}
                        height={1254}
                        src={'/assets/pic/bio.jpeg'}
                        alt=""
                    />
                    <div className='flex flex-col justify-end gap-5'>
                        <h2 hidden>شهرام عبدلی</h2>
                        <p>تاریخ تولد : ۵ دی‌ماه ۱۳۵۳ </p>
                        <p>محل تولد : میانه </p>
                        <label className='text-center mb-2'>لینک های شبکه های اجتماعی : </label>
                        <div className='flex flex-wrap w-full gap-1'>
                            {data[0]?.insta ? <Link
                                rel='noopener' target='_blank' href={data[0]?.insta}><InstaIcon/></Link> : null}
                            {data[0]?.apple ? <Link
                                rel='noopener' target='_blank' href={data[0]?.apple}><AppleIcon/></Link> : null}
                            {data[0]?.spotify ? <Link
                                rel='noopener' target='_blank' href={data[0]?.spotify}><SpotIcon/></Link> : null}
                            {data[0]?.youtube ? <Link
                                rel='noopener' target='_blank'
                                href={data[0]?.youtube || '#'}><YoutubeIcon/></Link> : null}
                            {data[0]?.shazam ? <Link
                                rel='noopener' target='_blank'
                                href={data[0]?.shazam || '#'}><ShazamIcon/></Link> : null}
                        </div>
                    </div>
                </div>
                <pre className="text-wrap italic antialiased text-lg">
                       {data[0]?.bio}
                   </pre>
            </div>
        </div>
    )
}


export async function getStaticProps() {
    const res = await fetch(`${process.env.API}/panel/`)
    const data = await res.json()
    return {
        props: {data},
        revalidate: 3600
    }
}
