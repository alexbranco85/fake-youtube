"use client"
import { forwardRef, useEffect, useRef, useState } from 'react'
import backendApi from '@/api/api';
import Link from 'next/link';

const GridVideos = ({ cols, limit, sidebar }, ref) => {

  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    await fetch(`${backendApi}video/show-all?limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        setVideos(data.data);
      });
  };

  const refreshGrid = () => {
    getVideos();
  }

  useEffect(() => {
    if (ref) {
      ref.current = {
        getVideos,
        refreshGrid
      };
    }
  }, [ref]);

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-8 md:grid-cols-10 gap-6 ${sidebar && "sm:grid-cols-1 lg:grid-cols-1 md:grid-cols-1"}`}>

      {videos.map((video, index) => {
        if (index < limit) {
          return (
            <div className={`col-span-1 lg:col-span-2 md:col-span-5 ${sidebar && "sm:col-span-1 md:col-span-1 lg:col-span-1"}`}>
              <div id="img-video">
                <Link href={`/single/${video.id_yt}`}><img src={video.image} className='w-full rounded-md' /></Link>
              </div>
              <div id="infos-video" className='flex gap-4 mt-4'>
                <div id="user-avatar">
                  <div className='rounded-full bg-secondary bg-cover' style={{ width: '45px', height: '45px', backgroundImage: `url(${video.image})` }}>
                  </div>
                </div>
                <div className=''>
                  <p className='font-semibold'>{video.title}</p>
                  <p className='text-sm mt-2'>{video.channelTitle}</p>
                  <p className='text-sm'>{Math.floor(Math.random() * (900000 - 50 + 1)) + 50} Visualizações • há {Math.floor(Math.random() * 12) + 1} meses</p>
                </div>
              </div>
            </div>
          )
        }
      })}

    </div>
  )
}

export default forwardRef(GridVideos);