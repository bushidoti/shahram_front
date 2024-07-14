import type {
  InferGetStaticPropsType,
} from 'next'
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import Image from "next/image";
import React from "react";
import {DownloadOutlined, VideoCameraOutlined} from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";
import {AppleIcon, ShazamIcon, SpotIcon, YoutubeIcon} from "@/components/icons";




export async function getStaticPaths() {
  const res = await fetch(`${process.env.API}/music/`)
  const musics = await res.json()
  const paths = musics.map((post: { name: string; }) => ({
    params: { slug: post.name.toLowerCase() },
  }))
  return { paths, fallback: true }
}

export async function getStaticProps({ params } : any) {
  const res = await fetch(`${process.env.API}/music/?name=${params.slug}`)
  const music = await res.json()
  return { props: { music }, revalidate: 60}
}

export default function Page({
  music,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const title = ` آهنگ ${music[0].name}`
  const schemaVideo = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": music[0].name,
      "uploadDate": music[0].release,
      "description": music[0].description,
      "thumbnailUrl": music[0].video,
      "contentUrl": music[0].video
    }
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
        },{
          "@type": "ListItem",
          "position": 3,
          "name": music[0].name,
          "item": `${process.env.APP_URL}/music/${music[0].name}`
        }]
      }

  return (
      <div className='h-[100vh]'>
          <Head>
              <link rel="icon" href="/favicon.ico"/>
              {music[0].video ?
                  <script
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{__html: JSON.stringify(schemaVideo)}}
                  />
                  : ''}
              <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{__html: JSON.stringify(schemaBreadcrumb)}}
              />
              <title>{title}</title>
              <link rel="alternate" hrefLang="fa" href={`${process.env.APP_URL}/music/${music[0].name}`}/>
              <meta property='og:video' content={music[0].video}/>
              <meta name="keywords"
                    content={`آهنگ شهرام عبدلی ${music[0].name},${music[0].name},آهنگ شهرام عبدلی ,شهرام عبدلی ${music[0].name},موزیک شهرام عبدلی ${music[0].name},`}/>
              <meta name="description"
                    content={music[0].description}/>
              <meta property="og:title" content={`آهنگ - ${music[0].name}`}/>
              <meta property="og:url" content={`${process.env.APP_URL}/music/${music[0].name}`}/>
          </Head>
          <div className='lg:hidden w-px mobile:inline mx-3'>
              <h1 className='text-center mb-2'>{music[0].name}</h1>
              <div className='flex flex-wrap justify-center items-center gap-2'>
                  <div className='flex flex-wrap gap-5 justify-center items-center w-full'>
                      {music[0].video ?
                          <div className='w-[300px]'>
                              <main>
                                  <video className='rounded w-full h-full' poster={music[0].pic}
                                         aria-label={music[0].name}
                                         width={250} height={250}
                                         controls preload={'metadata'}>
                                      <source src={music[0].video} type="video/mp4"/>
                                      مرورگر شما این قابلیت را پشتیبانی نمیکند
                                  </video>
                              </main>
                          </div>
                          :
                          <Image
                              width={0}
                              height={0}
                              priority
                              sizes="100vw"
                              className='w-[250px] h-full rounded'
                              src={music[0].pic}
                              alt={music[0].pic}
                          />
                      }

                      <div className='flex flex-col justify-between items-start'>
                          <div className='flex gap-3'>
                              <div className='flex gap-3 flex-wrap'>
                                  <label className='text-center mb-2'>دانلود mp3 : </label>
                                  <a href={music[0].music} target='_parent'
                                     download
                                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><DownloadOutlined/></a>
                              </div>
                              <div className='flex gap-3 flex-wrap'>
                                  <label className='text-center mb-2'>دانلود موزیک ویدئو : </label>
                                  <a href={music[0].video} target='_parent'
                                     download
                                     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><VideoCameraOutlined/></a>
                              </div>
                          </div>
                      </div>
                      <h3 className='text-center mb-2 flex gap-1'>سال انتشار : <p>{music[0].release}</p></h3>
                      <div className='flex justify-center items-center gap-2'>
                      {music[0].apple || music[0].spotify || music[0].youtube || music[0].shazam  ?
                              <label className='text-center mb-2'>لینک ها : </label>
                              : null}
                          {
                              music[0].apple ?
                                  <Link rel='noopener' target='_blank' href={music[0].apple}><AppleIcon/></Link>
                                  : null
                          }{
                          music[0].spotify ?
                              <Link rel='noopener' target='_blank' href={music[0].spotify}><SpotIcon/></Link>
                              : null
                      }{
                          music[0].youtube ?
                              <Link target='_blank' href={music[0].youtube}><YoutubeIcon/></Link>
                              : null
                      }{
                          music[0].shazam ?
                              <Link target='_blank' href={music[0].shazam}><ShazamIcon/></Link>
                              : null
                      }
                      </div>
                  </div>
                  <div className='w-full' style={{direction: 'ltr'}}>
                      <AudioPlayer
                          layout="horizontal"
                          customVolumeControls={[]}
                          className='!border-none !bg-white !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-10'
                          key={`player`}
                          preload={"metadata"}
                          showJumpControls={false}
                          src={music[0].music}
                      />
                  </div>
              </div>
          </div>

          <div className='hidden w-px lg:inline mx-3'>
              <div className='flex gap-5 justify-center items-center flex-col'>
                  <div className='flex gap-5 w-full'>
                      {music[0].video ?
                          <div className='w-[300px]'>
                              <video className='rounded w-full h-full' poster={music[0].pic}
                                     aria-label={music[0].name}
                                     width={250} height={250}
                                     controls preload={'metadata'}>
                                  <source src={music[0].video} type="video/mp4"/>
                                  مرورگر شما این قابلیت را پشتیبانی نمیکند
                              </video>
                          </div>
                          :
                          <Image
                              width={0}
                              height={0}
                              priority
                              sizes="100vw"
                              className='w-[250px] h-full rounded'
                              src={music[0].pic}
                              alt={music[0].pic}
                          />
                      }

                      <div className='flex flex-col justify-between items-start'>
                          <h1 className='text-center mb-2'>{music[0].name}</h1>
                          <h3 className='text-center mb-2 flex gap-1'>سال انتشار : <p>{music[0].release}</p></h3>
                          <div className='flex gap-1 justify-center items-center'>
                              {music[0].apple || music[0].spotify ?
                                  <label className='text-center mb-2'>لینک ها : </label>
                                  : null}
                              {
                                  music[0].apple ?
                                      <Link target='_blank' href={music[0].apple}><AppleIcon/></Link>
                                      : null
                              }{
                              music[0].spotify ?
                                  <Link target='_blank' href={music[0].spotify}><SpotIcon/></Link>
                                  : null
                          }{
                              music[0].youtube ?
                                  <Link target='_blank' href={music[0].youtube}><YoutubeIcon/></Link>
                                  : null
                          }{
                              music[0].shazam ?
                                  <Link target='_blank' href={music[0].shazam}><ShazamIcon/></Link>
                                  : null
                          }
                          </div>
                          <div className='flex gap-1'>
                              <div>
                                  <label className='text-center mb-2'>دانلود mp3 : </label>
                                  <a href={music[0].music} target='_parent'
                                     download
                                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><DownloadOutlined/></a>
                              </div>
                              <div>
                                  <label className='text-center mb-2'>دانلود موزیک ویدئو : </label>
                                  <a href={music[0].video} target='_parent'
                                     download  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><VideoCameraOutlined/></a>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className='w-full' style={{direction: 'ltr'}}>
                      <AudioPlayer
                          layout="horizontal"
                          customVolumeControls={[]}
                          className='!border-none !bg-white !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-10'
                          key={`player`}
                          preload={"metadata"}
                          showJumpControls={false}
                          src={music[0].music}
                      />
                  </div>
              </div>
          </div>

      </div>
  )
}