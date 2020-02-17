import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getHosts, executeCommand, setHostCommand} from "../actions";
import LandingPage from "./landingPage";
import HostList from "./lists/hosts";
import UserList from "./lists/users";

import {Menu} from "semantic-ui-react";

import "./app.scss";

class App extends Component {

  constructor(props) {
    super(props);

    this.executeCommandOnHost = this.executeCommandOnHost.bind(this);
    this.setCommandOnHost = this.setCommandOnHost.bind(this);
  }

  componentDidMount() {
    this.props.getHosts();
  }

  setCommandOnHost(hostId, command) {
    this.props.setHostCommand(hostId, command);
  }

  executeCommandOnHost(hostId) {
    this.props.executeCommand(hostId);
  }

  render() {

    return (
      <div className="main">
        <Router>
          <div className="navigation-bar">
            <Menu>
              <Menu.Item
                name="Hosts"
                as={NavLink}
                to="/hosts"
              />
              <Menu.Item
                name="Users"
                as={NavLink}
                to="/users"
              />
            </Menu>
            <Switch>
              <Route path="/" component={LandingPage} exact/>
              <Route
                path="/hosts"
                component={() =>
                  <HostList
                    hosts={this.props.hosts}
                    actions={
                      {
                        executeCommandOnHost: this.executeCommandOnHost,
                        setCommandOnHost: this.setCommandOnHost
                      }
                    }
                  />}/>
              <Route path="/users" component={() => <UserList hosts={this.props.hosts} />}/>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

function mapStateToProps(state){
  const {app} = state;
  const {hosts} = app;

  return {
    hosts
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getHosts,
    executeCommand,
    setHostCommand
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);