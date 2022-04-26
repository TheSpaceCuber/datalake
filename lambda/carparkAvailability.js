const fetch = require("node-fetch")
var AWS = require('aws-sdk')
AWS.config.update({region: 'ap-southeast-1'});
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

exports.handler =  (event) => {
    console.log("start")
    fetch('http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2', {
        method: 'GET',
        headers: { 
            'AccountKey' : 'INSERT_API_KEY_HERE',
            'accept': 'application/json' 
        }
    }).then(res => res.json())
    .then(content =>{
        const bucketName = 'cs4225-carpark-availability';
        const keyName = new Date().toISOString() + '.json'; 
        
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