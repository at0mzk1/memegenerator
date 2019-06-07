var express = require('express')
var router = express.Router()
const cloudinary = require('cloudinary').v2
const Models = require('../models');
var MD5 = require("crypto-js/md5");
var re = /(?:\.([^.]+))?$/;
const hasha = require('hasha');
import processor from '../util/processor'


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  })

router.post('/image-upload', (req, res) => {
  const values = Object.values(req.files)
  const promises = values.map(image => cloudinary.uploader.upload(image.path, {
    folder: 'raw',
    use_filename: true
   }))
  
  Promise
    .all(promises)
    .then(results => {
      Models.generated.findOrCreate({where: {hash: results[0].etag}, defaults: {
        image_name: results[0].original_filename,
        format: results[0].format,
        hash: results[0].etag,
        url_ref: results[0].url,
        secure_url_ref: results[0].secure_url
      }}).then(([user, created]) => {
       res.send(user)
      })
    })
})

router.post('/image-process', (req, res) => {
  processor.processImage(req.body, function(val) {
    res.status(200).send();
  });
})

async function getHash(path) {
  const hash = await hasha.fromFile(path, {algorithm: 'md5'});
  console.log("Hasha value: " + hash)
}

module.exports = router;
