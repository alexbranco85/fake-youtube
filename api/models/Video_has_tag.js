module.exports = (sequelize, DataType) => {
  const Video_has_tag = sequelize.define('Video_has_tag', {
    id_video_has_tag: {
      autoIncrement: true,
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fk_video: {
      type: DataType.INTEGER,
      allowNull: true,
      references: {
        model: 'videos',
        key: 'id_video'
      }
    },
    fk_tag: {
      type: DataType.INTEGER,
      allowNull: true,
      references: {
        model: 'Tag',
        key: 'id_tag'
      }
    }
  }, {
    tableName: 'video_has_tag',
    timestamps: false,
  });

  Video_has_tag.associate = (modelsList) => {
    Video_has_tag.belongsTo(modelsList.Tag, {
      foreignKey: 'fk_tag',
      as: 'tag'
    })

    Video_has_tag.belongsTo(modelsList.Video, {
      foreignKey: 'fk_video',
      as: 'video'
    })
  }

  return Video_has_tag
};