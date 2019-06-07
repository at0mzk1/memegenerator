var Jimp = require('jimp');

let imgActive = 'active/image.png';
let imgExported = 'active/export.png';

module.exports.processImage = function (request, done) {

    //read template & clone raw image 
    Jimp.read(request.image)
    .then(tpl => (tpl.clone().write(imgActive)))

    //read cloned (active) image
    .then(() => {
        console.log("reading image")
        return Jimp.read(imgActive)
    })

    //load font	
    .then(tpl => {
        console.log("reading font")
    return Jimp.loadFont("static/impact.fnt").then(font => ([tpl, font]))
    })
    
    //add text
    .then(data => {
    console.log("adding text");

    tpl = data[0];
    font = data[1];

    return tpl.print(font, 10, 470, {
        text: request.transform.memetext,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, 480, 20);
    })

    //export image
    .then(tpl => (tpl.quality(100).write(imgExported)))

    //log exported filename
    .then(tpl => { 
    console.log('exported file: ' + imgExported);
    done();
    })

    //catch errors
    .catch(err => {
    console.error(err);
    });
}