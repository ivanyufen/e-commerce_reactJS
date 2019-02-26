var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

var sender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vanandco279@gmail.com',
        type: 'OAuth2',
        clientId: '890127507981-ecd3fi6g37rp8j6r51uoqosqmj6ffqrp.apps.googleusercontent.com',
        clientSecret: 'E4QkZR6QdcGEg8ClFvHHbLbp',
        refreshToken: '1/8r_shqeTRWHhX_MPclHF5gSUYH9UdLYM6qv1J9mJEEs'
    }
})

// var myEmail = {
//     from: 'Van & Co <vanandco279@gmail.com>',
//     to: 'ivanysofficial@gmail.com',
//     subject: 'Test!',
//     text: "Hi, dearest customer. BLABLABLA", //bisa berupa text bisa html
//     // html: '<h2>INVOICE OF PT Van and Co</h2>',
//     attachments: { //kalau lebih dr satu, masukin array
//         filename: "myphoto.jpg",
//         path: "https://www.billboard.com/files/media/Lionel-Messi-2019-billboard-1548.jpg"
//     }
// }

module.exports = sender;

