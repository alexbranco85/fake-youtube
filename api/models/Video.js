module.exports = (sequelize, DataType) => {

  const Video = sequelize.define('Video', {
    id_video: {
      autoIncrement: true,
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataType.STRING(145),
      allowNull: true
    },
    description: {
      type: DataType.TEXT,
      allowNull: true
    },
    image: {
      type: DataType.STRING(90),
      allowNull: true
    },
    channelTitle: {
      type: DataType.STRING(90),
      allowNull: true
    },
    channelId: {
      type: DataType.STRING(45),
      allowNull: true
    },
    tags: {
      type: DataType.STRING(1500),
      allowNull: true
    },
    publishedAt: {
      type: DataType.STRING(45),
      allowNull: true
    },
    id_yt: {
      type: DataType.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'videos',
    timestamps: false,
  });

  Video.associate = (modelsList) => {
    Video.hasMany(modelsList.Video_has_tag, {
      foreignKey: 'fk_video',
      as: 'video_has_tag'
    })
  }

  return Video
}