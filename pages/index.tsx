import { Carousel } from "flowbite-react";
import {writeFile} from "fs/promises";
import path from "path";
import {useState} from "react";
import Image from "next/image";
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import Head from "next/head";


interface Type {
    music : string,
    pic : string,
    carousel1 : string,
    carousel2 : string,
    carousel3 : string,
    video : string,
    name : string,
    description : string,
}

const schemaPerson = {
      "@context": "https://schema.org/",
      "@type": "Person",
      "name": "شهرام عبدلی",
      "url": `${process.env.APP_URL}`,
      "image": "/assets/pic/avatar.jpeg",
      "sameAs": [
        "https://www.instagram.com/shahramabdoliofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        "https://www.youtube.com/@shahramabdoli"
      ],
      "jobTitle": "Singer"
    }


export default function Home({dataMusic}: any) {
    const [playIndex , setPlayIndex] = useState<number>(0)

    function handleClickPrevious () {
        setPlayIndex(prevState => prevState === 0 ? dataMusic.length - 1 : prevState - 1)
    }

     function handleClickNext () {
        setPlayIndex(prevState => prevState < dataMusic.length - 1 ? prevState + 1 : 0)
    }

    return (
        <div>
            <h1 hidden={true}>شهرام عبدلی</h1>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(schemaPerson)}}
                />
                <link rel="alternate" hrefLang="fa" href={`${process.env.APP_URL}/`}/>
                <title>خواننده شهرام عبدلی</title>
                <meta name="keywords"
                      content="شهرام عبدلی, خواننده شهرام عبدلی, آهنگ شهرام عبدلی,موسیقی شهرام عبدلی"/>
                <meta name="description"
                      content={'سایت شخصی خواننده شهرام عبدلی منبع رسمی انتشار موزیک ها و موزیک ویدئو ها'}/>
                <meta property="og:title" content={'خواننده شهرام عبدلی | Shahram Abdoli'}/>
                <meta property="og:url" content={`${process.env.APP_URL}`}/>
                <meta property="og:image" content={'/assets/pic/avatar.jpeg'}/>
            </Head>
            <section className="antialiased dark:bg-gray-900">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6 lg:py-24">
                    <div className="flex flex-col gap-8 lg:items-center lg:gap-16 lg:flex-row">
                        <div className='flex flex-col items-center text-center gap-1'>
                            <h2><strong>لیست پخش</strong></h2>
                            <div className='flex flex-col rounded-2xl !bg-white  !bg-clip-padding !backdrop-filter
                        !backdrop-blur-sm !bg-opacity-5 shadow-2xl
                         lg:!w-[25vw] md:!w-[40vw] sm:!w-[40vw] mobile:!w-[80vw]'
                            >
                                <Image
                                    src={dataMusic[playIndex].pic}
                                    alt={dataMusic[playIndex].name}
                                    placeholder="blur"
                                    blurDataURL={dataMusic[playIndex].pic}
                                    width={150}
                                    loading={"eager"}
                                    height={150}
                                    sizes="(max-width: 360px) 100px, (max-width: 576px) 100px, 350px"
                                    className='w-[300px] h-[300px] rounded-t-2xl lg:!w-[25vw] md:!w-[40vw] sm:!w-[40vw] mobile:!w-[80vw]'
                                />
                                <div style={{direction: 'ltr'}}>
                                    <AudioPlayer
                                        className='!border-none !bg-white rounded-b-2xl !bg-clip-padding
                                 !backdrop-filter !backdrop-blur-sm !bg-opacity-10 '
                                        onEnded={handleClickNext}
                                        autoPlayAfterSrcChange={true}
                                        showSkipControls={true}
                                        preload={"none"}
                                        customVolumeControls={[]}
                                        header={<h2 className='text-center'>{dataMusic[playIndex].name}</h2>}
                                        showJumpControls={false}
                                        src={dataMusic[playIndex].music}
                                        onClickPrevious={handleClickPrevious}
                                        onClickNext={handleClickNext}
                                    />
                                </div>
                            </div>
                        </div>
                        <Carousel className="h-64 md:h-[500px]" dir='ltr'>
                            <Image
                                className={`rounded  mobile:h-[300px] lg:h-[50vh] sm:h-[50vh] md:h-[50vh]`}
                                sizes="(max-width: 360px) 100px, (max-width: 576px) 100px, 350px"
                                placeholder="blur"
                                blurDataURL={'/assets/pic/carousel2.jpeg'}
                                width={150}
                                loading={"eager"}
                                height={150}
                                src={'/assets/pic/carousel1.jpeg'}
                                alt={'/assets/pic/carousel1.jpeg'}
                            />
                            <Image
                                className={`rounded  mobile:h-[300px] lg:h-[50vh] sm:h-[50vh] md:h-[50vh]`}
                                sizes="(max-width: 360px) 100px, (max-width: 576px) 100px, 350px"
                                placeholder="blur"
                                blurDataURL={'/assets/pic/carousel2.jpeg'}
                                width={150}
                                loading={"eager"}
                                height={150}
                                src={'/assets/pic/carousel2.jpeg'}
                                alt={'/assets/pic/carousel2.jpeg'}
                            />
                            <Image
                                className={`rounded  mobile:h-[300px] lg:h-[50vh] sm:h-[50vh] md:h-[50vh]`}
                                sizes="(max-width: 360px) 100px, (max-width: 576px) 100px, 350px"
                                placeholder="blur"
                                blurDataURL={'/assets/pic/carousel3.jpeg'}
                                width={150}
                                loading={"eager"}
                                height={150}
                                src={'/assets/pic/carousel3.jpeg'}
                                alt={'/assets/pic/carousel3.jpeg'}
                            />
                        </Carousel>
                    </div>
                </div>
            </section>
            <div>
                <div className="py-16 sm:py-1">
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">موزیک های اخیر</h2>
                    </div>
                    <div className="relative mt-8">
                        <div className="relative -mb-6 w-full overflow-x-auto pb-6">
                            <ul
                                role="list"
                                className="mx-4 inline-flex sm:mx-6 lg:mx-0  lg:gap-x-8 lg:space-x-0"
                            >
                                {dataMusic.slice(0).reverse().map((value: Type, i: number) => (
                                    <li key={`Link${i}`}
                                        className="inline-flex ml-2 w-[250px] h-[250px] flex-col text-center">
                                        <div className="group relative">
                                            <div
                                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">

                                                <Image
                                                    key={`image${i}`}
                                                    loading={"eager"}
                                                    className='object-cover rounded object-center w-[250px] h-[250px] group-hover:opacity-75'
                                                    width={150}
                                                    height={150}
                                                    sizes="(max-width: 360px) 100px, (max-width: 576px) 100px, 150px"
                                                    placeholder="blur"
                                                    blurDataURL={value.pic}
                                                    src={value.pic}
                                                    alt={value.name}
                                                />
                                            </div>
                                            <div className="mt-6">
                                                <h3 className="mt-1 font-semibold text-gray-900">
                                                    <a className='hover:!text-green-700'
                                                       href={`/music/${value.name.toLowerCase()}`}>
                                                        <span className="absolute inset-0"/>
                                                        {value.name}
                                                    </a>
                                                </h3>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}


export async function getStaticProps() {
    const music = await fetch(`${process.env.API}/music/`)
    const panel = await fetch(`${process.env.API}/panel/`)
    const dataMusic = await music.json()
    const dataPanel = await panel.json()


    let fileProfile = await fetch(dataPanel[0].pic)
    let fileProfileBuf = Buffer.from(await fileProfile.arrayBuffer())
    await writeFile(
        path.join(process.cwd(), "public/assets/pic/avatar.jpeg"),
        fileProfileBuf
    );

    let fileBioPic = await fetch(dataPanel[0].biopic)
    let fileBioPicBuf = Buffer.from(await fileBioPic.arrayBuffer())
    await writeFile(
        path.join(process.cwd(), "public/assets/pic/bio.jpeg"),
        fileBioPicBuf
    );

    if (dataPanel[0].carousel1) {
        let fileCarousel1 = await fetch(dataPanel[0].carousel1)
        let fileCarousel1Buf = Buffer.from(await fileCarousel1.arrayBuffer())
        await writeFile(
            path.join(process.cwd(), "public/assets/pic/carousel1.jpeg"),
            fileCarousel1Buf
        );
    }

    if (dataPanel[0].carousel2) {
        let fileCarousel2 = await fetch(dataPanel[0].carousel2)
        let fileCarousel2Buf = Buffer.from(await fileCarousel2.arrayBuffer())
        await writeFile(
            path.join(process.cwd(), "public/assets/pic/carousel2.jpeg"),
            fileCarousel2Buf
        );
    }

    if (dataPanel[0].carousel3) {
        let fileCarousel3 = await fetch(dataPanel[0].carousel3)
        let fileCarousel3Buf = Buffer.from(await fileCarousel3.arrayBuffer())
        await writeFile(
            path.join(process.cwd(), "public/assets/pic/carousel3.jpeg"),
            fileCarousel3Buf
        );
    }

    return {
        props: {dataMusic},
        revalidate: 3600
    }
}


