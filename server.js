const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const request = require('request');

/*
multer
multipart/form-data를 사용할 때 파일업로드를 편리하게 할 수 있도록 도와주는 Node.js 미들웨어. 
multipart/form-data를 사용하지 않는 경우에는 multer를 이용할 수 없다.
dest는 파일이 업로드 될 경로
*/
const multer = require('multer');
const upload = multer({dest: './upload'});

const clientId = 'i4tzi7uaxw';
const clientSecret = 'bd6v7abvnGkfQmDtrHX2HD1wFhgz00U1q0AwmI9V';

function stt(language, filePath) {
    // resolve is a parameter of callback function of Promise
    return new Promise((resolve,reject) => {
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
                reject(err);
                console.log(err);
                return;
            }
            
            resolve(body);
            //console.log(response.statusCode);
            //console.log(body);
        });
    });
}

/*
body-parser 모듈: post로 요청된 body를 쉽게 추출할 수 있는 모듈. 추출된 결과는 request객체에 body속성으로 저장.
bodyParser.urlencoded()를 등록하면, 자동으로 req에 body 속성이 추가되고 저장된다.
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

/* 
정적(static)파일 서비스 하기
voice라는 가상 경로를 통하여 upload로 접근하여 포함된 파일을 로드할 수 있음
*/
app.use('/voice', express.static('./upload'));

/*
사용자가 post 방식으로 전송한 데이터가 upload라는 디렉토리를 향하고 있다면, 그 다음 함수를 실행하여 콘트롤러로 연결.
미들웨어 upload.single('sound')는 function(req, res)함수가 실행되기 전에 먼저 실행.
미들웨어는 사용자가 전송한 데이터 중에서 만약 파일이 포함되어 있다면, 그 파일을 가공해서 req객체에 file이라는 프로퍼티를 암식적으로 추가하도록 약속되어 있는 함수.
upload.single('sound') 의 매개변수 'sound'는 form을 통해 전송되는 파일의 name 속성을 가져야함
*/
app.post('/api/result', upload.array('sound'), (req, res) => {
    return Promise.all(
        req.files.map( i => {
            return stt('Kor', './upload/' + i.filename);
        })
    ).then(function(values) {
        res.send(values);
        console.log(values);
    });
})
 
app.listen(port, () => console.log(`Listening on port ${port}`));