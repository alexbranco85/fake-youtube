module.exports = (sequelize, DataType) => {

  const Tag = sequelize.define('Tag', {
    id_tag: {
      autoIncrement: true,
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tag: {
      type: DataType.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'tags',
    timestamps: false,
  });

  Tag.associate = (modelsList) => {
    Tag.hasMany(modelsList.Video_has_tag, {
      foreignKey: 'fk_tag',
      as: 'video_has_tag'
    }
    )
  }

  return Tag
}