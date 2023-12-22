const { Video, Video_has_tag, Tag } = require('../models');

const VideoController = {

  showAll: async (req, res) => {
    try {
      const videos = await Video.findAll({
        order: [
          ['id_video', 'DESC'],
        ],
      });

      res.status(200).json({ data: videos, success: true });

    } catch (error) {
      console.log('error', error)
      res.status(400).json({ error: 'Houve uma falha ao carregar os vídeos.', success: false });
    }
  },

  showSingle: async (req, res) => {
    try {

      const { idYt } = req.params;

      const video = await Video.findOne({
        where: {
          id_yt: idYt
        },
        include: [
          {
            model: Video_has_tag,
            as: 'video_has_tag',
            attributes: ['fk_tag'],
            include: [
              {
                model: Tag,
                as: 'tag',
                attributes: ['id_tag', 'tag'],
              },
            ],
          }
        ],
      })

      res.status(200).json({ data: video, success: true });

    } catch (error) {
      console.log('error', error)
      res.status(400).json({ error: 'Não foi possível carregar o vídeo no momento.', success: false });
    }
  },

  save: async (req, res) => {
    try {

      // **** salva a url enviada na variável urlVideo e o id do vídeo na variável videoId
      const urlVideo = req.body.video;
      const videoId = urlVideo.split('v=')[1];
      
      // **** se não existir um id na url vai sair da função e retornar erro
      if (!videoId) {
        return res.status(400).json({ error: 'Não foi possível adicionar. URL inválida ou id do vídeo inválido.', success: false });
      }

      // **** checar se o vídeo já existe, caso existir sai da função e retorna um erro
      const checkVideo = await Video.findOne({
        where: {
          id_yt: videoId
        }
      })

      if (checkVideo) {
        return res.status(400).json({ error: 'O vídeo já existe. Tente novamente.', success: false });
      }

      // **** faz a conexão com a api do youtube
      const apiKey = process.env.YTAPI;
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();


      // **** monta o objeto para enviar para o banco
      const objVideo = {
        title: data.items[0].snippet.title,
        description: data.items[0].snippet.description,
        image: data.items[0].snippet.thumbnails.maxres?.url ? data.items[0].snippet.thumbnails.maxres?.url : data.items[0].snippet.thumbnails.medium.url,
        channelTitle: data.items[0].snippet.channelTitle,
        channelId: data.items[0].snippet.channelId,
        publishedAt: data.items[0].snippet.publishedAt,
        id_yt: data.items[0].id
      }

      // **** caso não consiga montar o objeto sai da função e retorna um erro
      if (!objVideo) {
        return res.status(400).json({ error: 'Não foi possível adicionar. Dados inválidos.', success: false });
      }

      // **** cria o vídeo no banco de dados
      const createdVideo = await Video.create(objVideo);

      const relationPromises = [];
      const createdTag = [];


      // **** verifica se o vídeo tem tags vindas do youtube, caso tiver vai fazer um for verificando se a tag já existe e caso não exista salva a tag na tabela tags do banco de dados e depois na tabela de video_has_tags salva o id da tag e do video para fazer o relacionamento
      if (data.items[0].snippet.tags.length) {

        const tags = data.items[0].snippet.tags;

        for (const tag of tags) {
          const checkTag = await Tag.findOne({ where: { tag: tag } });

          if (!checkTag) {
            const relationPromise = await Tag.create({ tag });
            createdTag.push(relationPromise);
            relationPromises.push(relationPromise);
          } else {
            createdTag.push(checkTag);
          }
        }

        if (createdTag.length) {
          for (const videoHasTag of createdTag) {
            const relationPromise = await Video_has_tag.create({
              'fk_video': createdVideo.dataValues.id_video,
              'fk_tag': videoHasTag.id_tag
             });
            relationPromises.push(relationPromise);
          }
        }
      }

      await Promise.all(relationPromises);    

      res.status(200).json({ data: createdVideo, createdTag: createdTag, yt: data, success: true, message: 'Vídeo adicionado com sucesso!' });

    } catch (error) {
      console.log('error', error)
      res.status(400).json({ error: 'Não foi possível adicionar o vídeo no momento.', success: false });
    }
  },

}

module.exports = VideoController;