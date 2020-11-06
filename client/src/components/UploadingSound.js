import React, { Component } from 'react';

class UploadingSound extends Component {
    render() {
        return(
            <div>
                <h1>{this.props.title}</h1>
                <input type="file"/><br/>
                <button>전송</button>
            </div>
        );
    }
}

export default UploadingSound;