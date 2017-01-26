var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var sendEMail = require('./routes/sendEMail');
var addNewUser = require('./routes/addNewUser');
var checkUserExists = require('./routes/checkUserExists');
var authenticateUser = require('./routes/authenticateUser');
var RIPUsers = require('./routes/RIPUsers');
var sendInvitationsExt = require('./routes/sendInvitationsExt');
var sendInvitationsInt = require('./routes/sendInvitationsInt');
var getConnections = require('./routes/getConnections');
var createConnection = require('./routes/createConnection');
var getReceivedInvitations = require('./routes/getReceivedInvitations');
var getSentInvitations = require('./routes/getSentInvitations');
var ignoreInvitation = require('./routes/ignoreInvitation');
var getMessageInfo = require('./routes/getMessageInfo');
var updateMessageStatus = require('./routes/updateMessageStatus');
var updateNotificationStatus = require('./routes/updateNotificationStatus');
var cancelInvitation = require('./routes/cancelInvitation');
var resendInvitationExt = require('./routes/resendInvitationExt');
var resendInvitationInt = require('./routes/resendInvitationInt');
var deleteInvitation = require('./routes/deleteInvitation');
var getNotifications = require('./routes/getNotifications');
var getAllNotifications = require('./routes/getAllNotifications');
var deleteNotification = require('./routes/deleteNotification');
var writeVideoPackager = require('./routes/writeVideoPackager');

var createReminder = require ('./routes/createReminder.js') ;

// for the video Messaging functionality
var upload = require('./routes/fileUpload');
var getAllVideos = require('./routes/getAllVideos');
var uploadCloud = require('./routes/cloudUpload');

// handling fb users
var handleFBUsers = require('./routes/handleFBUsers');

var upperBound = '1gb';

var app = express();

app.use(express.static('./views'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'Client/careGen')));
app.use(express.static(path.join(__dirname, 'routes/uploads')));
app.use(express.static(path.join(__dirname, 'Client/careGen/views/video')))


console.log('in CareGen app');
console.log(__dirname);

app.use('/', routes);
app.use('/users', users);
app.use('/sendEMail', sendEMail);
app.use('/addNewUser', addNewUser);
app.use('/checkUserExists', checkUserExists);
app.use('/authenticateUser', authenticateUser);
app.use('/RIPUsers', RIPUsers);
app.use('/sendInvitationsInt', sendInvitationsInt);
app.use('/sendInvitationsExt', sendInvitationsExt);
app.use('/getConnections', getConnections);
app.use('/createConnection', createConnection);
app.use('/getReceivedInvitations', getReceivedInvitations);
app.use('/getSentInvitations', getSentInvitations);
app.use('/ignoreInvitation', ignoreInvitation);



app.use('/upload', upload);
app.use('/getAllVideos', getAllVideos);
app.use('/uploadCloud', uploadCloud);
app.use('/getMessageInfo', getMessageInfo);
app.use('/updateMessageStatus', updateMessageStatus);

app.use('/getNotifications', getNotifications);
app.use('/updateNotificationStatus', updateNotificationStatus);
app.use('/getAllNotifications', getAllNotifications);
app.use('/deleteNotification', deleteNotification);
app.use('/cancelInvitation', cancelInvitation);
app.use('/resendInvitationExt', resendInvitationExt);
app.use('/resendInvitationInt', resendInvitationInt);
app.use('/deleteInvitation', deleteInvitation);

app.use('/writeVideoPackager', writeVideoPackager);

app.use('/handleFBUsers', handleFBUsers);

app.use('/createReminder', createReminder);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
