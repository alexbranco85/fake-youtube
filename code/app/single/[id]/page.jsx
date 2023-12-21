"use client"
import backendApi from "@/api/api";
import Header from "@/components/Header/Header";
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icons from "@/components/Icons/Icons";
import GridVideos from "@/components/GridVideos/GridVideos";

const Single = () => {

  const router = useRouter();

  const pathname = usePathname();

  const [video, setVideo] = useState(null);

  const getSingleVideo = async () => {

    const configPath = pathname.split("/");
    const id_video = configPath[configPath.indexOf("single") + 1];

    await fetch(`${backendApi}video/single/${id_video}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setVideo(data.data);
      })
  }

  const formatText = (text) => {
    const formatedText = text.replace('\n', '<br /><br />').replace('    ', '<br /><br />');
    return `<p>${formatedText}</p>`;
  }

  useEffect(() => {
    getSingleVideo();
  }, [])

  return (
    <>
      <Header />
      <div className="grid grid-cols-8 gap-6 px-5 md:px-24 py-4 box-content">
        <div className="col-span-8 md:col-span-6">
          {video && (
            <>
              <div className="text-center gap-2 flex justify-center" style={{ paddingBottom: '56.25%', position: 'relative' }}>
                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${video.id_yt}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="rounded-lg" style={{ position: 'absolute' }}></iframe>
              </div>
              <p className="font-bold text-xl my-4">{video.title}</p>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 md:col-span-3 flex gap-2 md:gap-4 items-start md:items-center">
                  <div id="user-avatar">
                    <div className='rounded-full bg-secondary bg-cover' style={{ width: '36px', height: '36px', backgroundImage: `url(${video.image})` }}>
                    </div>
                  </div>
                  <div>
                    <p>{video.channelTitle}</p>
                    <p className="text-gray-400 text-xs">181 mil inscritos</p>
                  </div>
                  <div>
                    <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Inscrever-se</button>
                  </div>
                </div>
                <div className="col-span-6 md:col-span-3 flex gap-2 justify-start md:justify-end items-center">

                  <button type="button" class="flex gap-2 items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">{Icons('share', 4)} Compartilhar</button>

                  <button type="button" class="flex gap-2 items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">{Icons('download', 4)} Download</button>

                  <button type="button" class="flex gap-2 items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">{Icons('clipe', 4)} Clipe</button>

                </div>
              </div>

              <div className="p-0 mt-4 w-full flex flex-wrap gap-2">
                {video.video_has_tag &&
                  video.video_has_tag.map(item => (
                    <a href="#" class="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium me-2 px-3 py-0.5 rounded border border-gray-300 items-center justify-center">{item.tag.tag}</a>
                  )
                  )}
              </div>

              <div className="bg-gray-100 p-8 mt-4 w-full rounded-md text-sm sm:text-xs break-words" dangerouslySetInnerHTML={{ __html: formatText(video.description) }}>
              </div>
            </>
          )}
        </div>
        <div className="col-span-8 sm:col-span-2">
          <GridVideos cols={1} limit={3} sidebar={true} />
        </div>
      </div>
    </>
  )
}

export default Single;
