const cloudinary = require('cloudinary').v2;
const {ServerConfig}=require('../config');
const serverConfig = require('./server-config');
cloudinary.config({
  cloud_name: ServerConfig.cloud_name, 
  api_key: serverConfig.api_key, 
  api_secret: ServerConfig.api_secret
});

module.exports = cloudinary;
