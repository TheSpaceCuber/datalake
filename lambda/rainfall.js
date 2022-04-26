const fetch = require("node-fetch")
var AWS = require('aws-sdk')
AWS.config.update({region: 'ap-southeast-1'});
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

exports.handler =  (event) => {
    console.log("start")
    const curr_time = new Date().toISOString();
    fetch('https://api.data.gov.sg/v1/environment/rainfall', {
        method: 'GET',
        params: { 
            'date_time' : curr_time,
        }
    }).then(res => res.json())
    .then(content =>{
        const bucketName = 'cs4225-rainfall';
        const keyName = curr_time + '.json'; 
        
        var uploadParams = {Bucket: bucketName, Key: keyName, Body: JSON.stringify(content)};
        
        console.log("bfeore the upload")
        s3.upload (uploadParams, function (err, data) {
            console.log("inside the func")
            if (err) {
                console.log("Error", err);
                return 
            } if (data) {
                console.log("Upload Success", data.Location);
                return data
            }
        });
        
    })
}