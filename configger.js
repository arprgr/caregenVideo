var nconf = require('nconf');
var path = require('path');


var connectionString = path.join(__dirname, 'configEmail.json');


//    console.log('this is the dir name.');
console.log(connectionString);


    nconf.use('file', { file: connectionString });
    nconf.load();
    nconf.set('emailUser', 'simplifiedit@hotmail.com');
    nconf.set('emailPass', 'psalm@119');
    nconf.set('emailFrom', 'simplifiedit@hotmail.com');
    nconf.set('emailTo', 'bridget.pillai@gmail.com');



    console.log(nconf.get('emailUser'));

    nconf.save(function (err) {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('Configuration saved successfully.');
    });
