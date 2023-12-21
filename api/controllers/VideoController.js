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

      const urlVideo = req.body.video;
      const videoId = urlVideo.split('v=')[1];

      if (!videoId) {
        return;
      }

      const apiKey = process.env.YTAPI;
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const objVideo = {
        title: data.items[0].snippet.title,
        description: data.items[0].snippet.description,
        image: data.items[0].snippet.thumbnails.maxres?.url ? data.items[0].snippet.thumbnails.maxres?.url : data.items[0].snippet.thumbnails.medium.url,
        channelTitle: data.items[0].snippet.channelTitle,
        channelId: data.items[0].snippet.channelId,
        publishedAt: data.items[0].snippet.publishedAt,
        id_yt: data.items[0].id
      }

      if (!objVideo) {
        return;
      }

      const createdVideo = await Video.create(objVideo);

      const relationPromises = [];
      const createdTag = [];

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

      res.status(200).json({ data: createdVideo, createdTag: createdTag, yt: data, success: true });

    } catch (error) {
      console.log('error', error)
      res.status(400).json({ error: 'Não foi possível adicionar o vídeo no momento.', success: false });
    }
  },

}

module.exports = VideoController;