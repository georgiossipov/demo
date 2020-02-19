import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getHosts, executeCommand, setHostCommand, showHostForm, createHost, deleteHost} from "../actions";
import LandingPage from "./landingPage";
import HostList from "./lists/hostList";

import {Menu} from "semantic-ui-react";

import "./app.scss";

class App extends Component {

  constructor(props) {
    super(props);

    this.executeCommandOnHost = this.executeCommandOnHost.bind(this);
    this.setCommandOnHost = this.setCommandOnHost.bind(this);
    this.showHostForm = this.showHostForm.bind(this);
    this.submitHostForm = this.submitHostForm.bind(this);
    this.deleteHost = this.deleteHost.bind(this);
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

  showHostForm(open) {
    this.props.showHostForm(open);
  }

  submitHostForm(formData) {
    this.props.createHost(formData);
  }

  deleteHost(hostId) {
    this.props.deleteHost(hostId);
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
            </Menu>
          </div>
          <div className="app-content">
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
                        setCommandOnHost: this.setCommandOnHost,
                        showHostForm: this.showHostForm,
                        submitHostForm: this.submitHostForm,
                        deleteHost: this.deleteHost
                      }
                    }
                  />}/>
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
    setHostCommand,
    showHostForm,
    createHost,
    deleteHost
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);