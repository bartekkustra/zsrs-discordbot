"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trackers = exports.AllowedSites = exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
});
exports.AllowedSites = exports.sequelize.define('allowed_sites', {
    url: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    createdBy: sequelize_1.DataTypes.STRING,
});
exports.Trackers = exports.sequelize.define('trackers', {
    tracking_id: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    createdBy: sequelize_1.DataTypes.STRING,
    usage_count: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    }
});
