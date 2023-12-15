
"use client"
import backendApi from "@/api/api";

const InsertVideo = () => {

  const saveVideo = async () => {
    // const formData = new FormData();
    // const textData = getValues();

    // for (const key in textData) {
    //   formData.append(key, textData[key]);
    // }

    const textData = {
      video: 'https://www.youtube.com/watch?v=jSW57wpbBf0'
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
    <div className="text-center gap-2 flex justify-center">
      <input
        type="text"
        placeholder="Insira a URL do vídeo para enviar"
        name="url_video"
      />
      <button className="send_button" onClick={saveVideo}>Enviar</button>
    </div>
  )
}

export default InsertVideo;