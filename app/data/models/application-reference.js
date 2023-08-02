module.exports = (sequelize, DataTypes) => {
  const applicationReference = sequelize.define('application_reference', {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: sequelize.UUIDV4
    },
    reference: {
      type: DataTypes.STRING(20),
      set (val) {
        this.setDataValue('reference', val.toUpperCase())
      }
    },
    createdAt: {
      type: DataTypes.DATE
    }
  },
  {
    freezeTableName: true,
    tableName: 'application_reference',
    underscored: true
  })

  return applicationReference
}
