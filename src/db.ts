import { Sequelize, DataTypes } from 'sequelize'

export const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite'
})

export const AllowedSites = sequelize.define('allowed_sites', {
  url: {
    type: DataTypes.STRING,
    unique: true,
  },
  createdBy: DataTypes.STRING,
})

export const Trackers = sequelize.define('trackers', {
  tracking_id: {
    type: DataTypes.STRING,
    unique: true,
  },
  createdBy: DataTypes.STRING,
  usage_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  }
})
