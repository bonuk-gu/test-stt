import React, { Component } from 'react';
import { post } from 'axios';

class UploadSound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            filename: []
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.uploadSound()
        .then((response) => {
            console.log('UploadSound.js: get response -> ', response);
        })
    }

    handleFileChange = (e) => {
        
        var files = e.target.files;
        console.log('UploadSound.js: files', files);
        var fileNames = [];
        for(var i=0;i<files.length;i++) {
            fileNames[i] = files[i].name;
        }
        console.log('UploadSound.js: fileNames', fileNames);
        this.setState({
            file: files,
            filename: fileNames
        })
    }

    /* 
    FormData 인터페이스의 append() 메서드는 FormData 객체의 기존 키에 새 값을 추가하거나, 키가 없는 경우 키를 추가.
    formData.append(name, value);
        name: value에 포함되는 데이터 필드의 이름
        value: 필드의 값. USVString 또는 Blob(File과 같은 subclass를 포함하여)일 수 있다
    */
    uploadSound = () => {
            const url = '/api/result';
            const formData = new FormData();
            for(var i=0; i<this.state.file.length; i++){
                formData.append("sound", this.state.file[i]);
            }
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            return post(url, formData, config);
    }

    render() {
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>Testing CRS-stt</h1>
                음성파일: <input type="file" multiple name="file" file={this.state.file} onChange={this.handleFileChange}/><br/>
                <button type="submit">전송</button>
            </form>
        );
    }
}

export default UploadSound;