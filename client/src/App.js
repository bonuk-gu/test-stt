import React, { Component } from 'react';
import ShowResult from './components/ShowResult';
import UploadSound from './components/UploadSound';

class App extends Component {

  state = {
    result: ""
  }

  componentDidMount() {
    this.callApi()
    .then(res => this.setState({result: res}))
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/result');
    console.log('App.js: fetch');
    const body = await response.json();
    console.log('App.js: get response');
    return body;
  }

  render() {
    return(
      <div>
        <UploadSound/>
        <ShowResult/> 
      </div>
    );
  }
}

export default App;