
"use client"
import backendApi from "@/api/api";
import Header from "@/components/Header/Header";
import { useForm } from "react-hook-form";

const InsertVideo = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async () => {

    const formData = new FormData();

    const textData = {
      video: watch("url_video")
    }

    const response = await fetch(`${backendApi}video/save`, {
      method: 'POST',
      body: JSON.stringify(textData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        response.json();
        console.log(response);
      })
  }

  return (
    <>
      <Header />
      <div className="text-center gap-2 flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("url_video")}
            type="text"
            placeholder="Insira a URL do vídeo para enviar"
            name="url_video"
          />
          <button className="send_button" type="submit">Enviar</button>
        </form>
      </div>
    </>
  )
}

export default InsertVideo;