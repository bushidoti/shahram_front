import Image from "next/image";
import {Empty, Flex} from "antd";
import Head from "next/head";
import React from "react";
import {writeFile} from "fs/promises";
import path from "path";



export default function Photo({ data } : any) {
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
          "name": "photo",
          "item": `${process.env.APP_URL}/photo`
        }]
      }
    return (
        <div>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(schemaBreadcrumb)}}
                />
                <link rel="alternate" hrefLang="fa" href={`${process.env.APP_URL}/photo`}/>
                <meta name="keywords"
                      content="عکس شهرام عبدلی,خواننده شهرام عبدلی , عکس های شهرام عبدلی"/>
                <title>عکس های شهرام عبدلی</title>
                <meta name="description"
                      content={'عکس های شهرام عبدلی'}/>
                <meta property="og:title" content={'عکس های شهرام عبدلی'}/>
                <meta property="og:url" content={`${process.env.APP_URL}/photo`}/>
            </Head>
            <Flex gap={20} wrap={"wrap"} align={"center"} justify={"center"}>
                {data.map((value: any, i: number) => (
                    <Image
                        key={`image${i}`}
                        priority
                        className='object-fill rounded w-[250px] h-[250px]'
                        width={250}
                        height={250}
                        src={value.pic}
                        alt={value.pic}
                    />
                ))}
            </Flex>

            {data.length !== 0 ? '' : <Empty/>}

        </div>
    )
}


export async function getStaticProps() {
    const res = await fetch(`${process.env.API}/selfie/`)
    const data = await res.json()

    return {
        props: {data},
        revalidate: 3600
    }
}
