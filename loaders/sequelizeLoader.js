import { Sequelize, DataTypes } from "sequelize";
import _conf from '../config/index.js';
import { log } from './bunyanLoggerLoader.js'

const conf = _conf();

let options = conf.databases.libraryPostgres
options.logging = msg => log.info(msg);
const sequelize = new Sequelize(options);


sequelize.authenticate().then(() => {
    log.info('Connection has been established successfully.');
}).catch((error) => {
    log.info('Unable to connect to the database:', error);
});



export default {
    sequelize,
    DataTypes
}