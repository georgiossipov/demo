import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getHosts} from "../actions";
import {Button} from 'semantic-ui-react'

class App extends Component {

  render() {
    return (
      <div>
        <Button onClick={() => this.props.getHosts()}>Click</Button>
      </div>
    )
  }
}

function mapStateToProps(state){
  const {hosts} = state;

  return {
    hosts
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getHosts
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);