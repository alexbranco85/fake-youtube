"use client"
import GridVideos from '@/components/GridVideos/GridVideos'
import Header from '@/components/Header/Header'
import { useEffect, useRef, useState } from 'react'

export default function Home() {

  const [ functionRefresh, setFunctionRefresh ] = useState(() => {});

  let gridVideosRef = useRef(null);

  useEffect(() => {
    if (gridVideosRef.current) {
      setFunctionRefresh(gridVideosRef.current);
    }
  }, [gridVideosRef]);

  return (
    <>
      <Header refreshGrid={functionRefresh}/>
      <main className="p-4">
        <GridVideos cols={5} limit={50} ref={gridVideosRef} />
      </main>
    </>
  )
}
