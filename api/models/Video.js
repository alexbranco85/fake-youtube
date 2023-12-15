module.exports = (sequelize, DataType) => {

  const Video = sequelize.define('Video', {
    id_video: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataType.STRING,
      length: 145,
      allowNull: false
    },
    description: {
      type: DataType.STRING,
      length: 450,
      allowNull: false
    },
    image: {
      type: DataType.STRING,
      length: 90,
      allowNull: false
    },
    channelTitle: {
      type: DataType.STRING,
      length: 90,
      allowNull: false
    },
    channelId: {
      type: DataType.STRING,
      length: 45,
      allowNull: false
    },
    // tags: {
    //   type: DataType.STRING,
    //   length: 1500,
    //   allowNull: false
    // },
    publishedAt: {
      type: DataType.STRING,
      length: 45,
      allowNull: false
    },
  }, {
    tableName: 'videos',
    timestamps: false
  })

  return Video
}