const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const request = require('request');

const multer = require('multer');
const upload = multer({dest: './upload'});

const clientId = 'i4tzi7uaxw';
const clientSecret = 'bd6v7abvnGkfQmDtrHX2HD1wFhgz00U1q0AwmI9V';

function stt(language, filePath) {
    return new Promise(resolve => {
        const url = `https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=${language}`;
        const requestConfig = {
            url: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                'X-NCP-APIGW-API-KEY-ID': clientId,
                'X-NCP-APIGW-API-KEY': clientSecret
            },
            body: fs.createReadStream(filePath)
        };
    
        request(requestConfig, (err, response, body) => {
            if(err) {
                console.log(err);
                return;
            }
            
            resolve(body);
            console.log(response.statusCode);
            console.log(body);
        });
    })
    
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/voice',express.static('./upload'));

app.post('/api/result', upload.single('sound'), (req, res) => {
    var text='';

    stt('Kor', './upload/'+req.file.filename)
    .then(function(result){
        console.log("result:"+result);
    })
})

app.get('/api/result', )

app.listen(port, () => console.log(`Listening on port ${port}`));