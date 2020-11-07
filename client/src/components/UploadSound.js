import React, { Component } from 'react';
import {post} from 'axios';

class UploadSound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileName: ''
        }
    }

    handleFormSubit = (e) => {
        e.preventDefault()
        this.uploadSound()
        .then((response) => {
            console.log(response.data);
        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    uploadSound = () => {
        const url = '/api/result';
        const formData = new FormData();
        formData.append('sound', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config); 
    }

    render() {
        return(
            <form onSubmit={this.handleFormSubit}>
                <h1>Testing CRS-stt</h1>
                음성파일: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                <button type="submit">전송</button>
            </form>
        );
    }
}

export default UploadSound;