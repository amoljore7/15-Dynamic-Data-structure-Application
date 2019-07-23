import React, { Component } from 'react'
import Pwa from './Component/Pwa'

import { connect } from 'react-redux';

class App extends Component {

  render() {
    return (
      <div>
        <Pwa />
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    storeState: state
  }
}

export default connect(mapStatetoProps, dispatch => ({ dispatch }))(App);
