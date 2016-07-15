import React, {Component} from 'react';
import ReactDOM from 'react-dom';

$(function(){

  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name       : 'World'
      };
    }

    render() {
      const {name} = this.state;

      return (
        <p>
          Hello <b>{name}</b>
        </p>
      );
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('container')
  );

  // ReactDOM.render(<Tournaments />, document.getElementsByClassName('tournaments')[0]);

});
