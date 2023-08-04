module.exports = (sequelize, DataTypes) => {
  const applicationSession = sequelize.define('application_session', {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: sequelize.UUIDV4
    },
    reference: {
      type: DataTypes.STRING(20)
    },
    email: {
      type: DataTypes.STRING,
      set (val) {
        this.setDataValue('email', val.toUpperCase())
      }
    },
    applicationSession: {
      type: DataTypes.JSONB,
      field: 'application_session'
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE
    }
  },
  {
    freezeTableName: true,
    tableName: 'application_session',
    underscored: true
  })
  
  return applicationSession
}
