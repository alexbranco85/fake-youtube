const { Video } = require('../models')

const VideoController = {

  save: async (req, res) => {
    try {

      const urlVideo = req.body.video;
      const videoId = urlVideo.split('v=')[1];

      if (!videoId) {
        return;
      }

      const apiKey = 'AIzaSyDjpQhQalNzE9BUNysT9rHUHGxXwUPqaJA';
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const objVideo = {
        title: data.items[0].snippet.title,
        description: data.items[0].snippet.description,
        image: data.items[0].snippet.thumbnails.default.url,
        channelTitle: data.items[0].snippet.channelTitle,
        channelId: data.items[0].snippet.channelId,
        // tags: data.items[0].snippet.tags,
        publishedAt: data.items[0].snippet.publishedAt
      }

      if (!objVideo) {
        return;
      }

      await Video.create(objVideo);

      res.status(200).json({ data: objVideo, success: true });

    } catch (error) {
      console.log('error', error)
      res.status(400).json({ error: 'Não foi possível adicionar o vídeo no momento.', success: false });
    }
  },

}

module.exports = VideoController;