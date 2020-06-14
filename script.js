'user strict';

var AWS = require('aws-sdk');
  mydocumentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback){
  var params = {
    TableName: "UserDatabase"
  };
  mydocumentClient.scan(params,function(err,data){
    if (err) {
      callback(err,null);
    }
    else{
      callback(null,data.Items);
    }
  });
}