import React, { Component} from 'react';
import ShowResult from './components/ShowResult';
import UploadingSound from './components/UploadingSound';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Testing CRS-stt'
    }
  }

  render() {
    return(
      <div>
        <UploadingSound title={this.state.title}/>
        <ShowResult/>
      </div>
    );
  }
}

export default App;
