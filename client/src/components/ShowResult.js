import React, { Component } from 'react';

class ShowResult extends Component {
    render() {
        return(
            <div>
                <h1>Result</h1>
                <p>결과: {this.props.result}</p>
            </div>
        );
    }
}

export default ShowResult;