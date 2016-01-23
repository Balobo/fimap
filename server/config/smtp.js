/**
 * Created by yassine on 28/02/15.
 */
// server/smtp.js
Meteor.startup(function () {
    smtp = {
        username: 'yassine.khazzan@gmail.com',   // eg: server@gentlenode.com
        password: 'Bresil2020',   // eg: 3eeP1gtizk5eziohfervU
        server:   'smtp.googlemail.com',  // eg: mail.gandi.net
        port: 465
    }

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});