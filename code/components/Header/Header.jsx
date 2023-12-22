"use client"
import { useEffect, useState } from 'react';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import styles from './Header.module.css'
import Icons from "@/components/Icons/Icons";
import Link from 'next/link';
import ModalComponent from '../ModalComponent/ModalComponent';
import { useForm } from "react-hook-form";
import backendApi from '@/api/api';

const Header = ({ refreshGrid }) => {

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorField, setErrorField] = useState(null);

  // const router = useRouter();

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

  const onSubmit = async () => {

    if (!watch("url_video")) {
      setErrorField("É necessário inserir uma URL para enviar.");

      setTimeout(() => {
        setErrorField(null);
      }, 6000);
      return;
    }

    setLoadingUpload(true);
    const formData = new FormData();

    const textData = {
      video: watch("url_video")
    }

    await fetch(`${backendApi}video/save`, {
      method: 'POST',
      body: JSON.stringify(textData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        response.json();

        setTimeout(() => {
          setLoadingUpload(false);
          setOpenModal(false);
          refreshGrid.refreshGrid()
          console.log("refreshGrid", refreshGrid)
          reset();
        }, 2000);

      })
  }

  return (
    <>
      <div className="flex p-4 justify-between gap-4 items-center transition-all box-content">
        <div className="flex gap-4 items-center">
          <div>
            <button className="text-black navbar-burger flex items-center hover:text-red-600 transition-all" onClick={handleToggleSidebar}>
              {openSidebar ? (
                Icons('close', 8)
              ) : (
                Icons('menu', 8)
              )}
            </button>
          </div>
          <div>
            <Link href="/"><h6 className='text-black font-bold text-xl'><span className='text-red-700'>tube</span>TUBE</h6></Link>
          </div>
        </div>
        <div className="flex items-center hidden sm:hidden md:flex">
          <input
            type="text"
            placeholder="Pesquisar"
            className={`px-4 py-2 rounded-full w-full text-sm ${styles.search_bar}`}
          />
          <button style={{ marginLeft: '-50px' }}>
            {Icons('search')}
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setOpenModal(true)}>
            {Icons('add', 8)}
          </button>
          <button>
            {Icons('notifications', 8)}
          </button>
          <button>
            {Icons('user', 8)}
          </button>
        </div>
      </div>
      <LeftSidebar
        open={openSidebar}
        setOpen={setOpenSidebar}
      />

      <ModalComponent
        title="Inserir Vídeo"
        open={openModal}
        setOpen={setOpenModal}
      >
        <div className='p-4'>
          <div>

            {loadingUpload && (
              <div className='w-full flex flex-col items-center gap-4 my-4'>
                {Icons('loading')}
                <p>Salvando Vídeo</p>
              </div>
            )}
            <>

              {errorField && (
                <div class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                  <div>
                    <span class="font-medium">Atenção!</span> {errorField}.
                  </div>
                </div>
              )}

              <p className='pb-4'>Para adicionar um vídeo, insira sua url no campo abaixo e clique em enviar.</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("url_video")}
                  type="text"
                  placeholder="Insira a URL do vídeo para enviar"
                  name="url_video"
                  className='rounded-full w-full'
                />
                <div className='flex gap-4 justify-end mt-4'>

                  <button onClick={() => setOpenModal(false)} type="button" class="flex gap-2 items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2 dark:bg-gray-800 dark:text-white">{Icons('close', 4)} Cancelar</button>

                  <button className="flex gap-2 items-center text-white bg-red-600 border border-red-300 focus:outline-none hover:bg-red-800 focus:ring-4 focus:ring-red-200 font-medium rounded-full text-sm px-5 py-2" type="submit">{Icons('upload', 4)} Enviar</button>
                </div>
              </form>
            </>
          </div>
        </div>
      </ModalComponent>

    </>
  )
}

export default Header;