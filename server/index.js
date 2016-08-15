import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

let timemanagementServer = express();
timemanagementServer.use(bodyParser.urlencoded({ extended: true }));
timemanagementServer.use(bodyParser.json({
  limit : '100kb'
}));

let port = process.env.PORT || 8080;

timemanagementServer.use(function(req, res, next) {
  console.log('you can do stuff with your requests here, like filter params, check for auth, etc.');
  next(); // make sure we go to the next route and don't stop here
});

timemanagementServer.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

timemanagementServer.use(function(err,req,res,next){
  console.log(err.stack);
  res.status(500).send('Something broke!!!');
});

timemanagementServer.listen(port);
console.log(`magic happens on port ${port}`);

export default timemanagementServer;
