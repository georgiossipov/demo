import React, {Component} from "react";
import {Button, Dropdown, Icon, Message, Table} from "semantic-ui-react";
import {hostProperties} from "../../constants";
import HostForm from "../forms/hostForm";
import _ from 'lodash';

class HostList extends Component {

  constructor(props) {
    super(props);

    this.executeCommand = this.executeCommand.bind(this);
    this.setCommand = this.setCommand.bind(this);
    this.showForm = this.showForm.bind(this);
    this.renderHostTable = this.renderHostTable.bind(this);
    this.renderEmptyTableMessage = this.renderEmptyTableMessage.bind(this);
  }

  setCommand(id, {value}) {
    this.props.actions.setCommandOnHost(id, value);
  }

  executeCommand(id) {
    this.props.actions.executeCommandOnHost(id);
  }

  showForm(open) {
    this.props.actions.showHostForm(open);
  }

  deleteHost(hostId) {
    this.props.actions.deleteHost(hostId);
  }

  renderHostTable() {

    const {hosts} = this.props;
    const {list} = hosts;
    const {commands} = hostProperties;

    const hostsRows = _.map(list, host => {
      const hostData = _.get(host, "data");
      const osInfo = _.get(hostData, "os");

      return (
        <Table.Row key={host.id}>
          <Table.Cell>{host.ipv4_address}</Table.Cell>
          <Table.Cell>{_.isUndefined(osInfo) ? "No information available" : osInfo.pretty_name}</Table.Cell>
          <Table.Cell>{host.ssh_port}</Table.Cell>
          <Table.Cell>{host.username}</Table.Cell>
          <Table.Cell>{host.date_added}</Table.Cell>
          <Table.Cell>
            <Dropdown
              search
              selection
              clearable
              placeholder="Command"
              options={commands}
              value={host.command}
              onChange={(event, data) => this.setCommand(host.id, data)}/>
          </Table.Cell>
          <Table.Cell>
            <Button content="Execute" disabled={_.isNull(host.command)}
                    onClick={() => this.executeCommand(host.id)}/>
            <Button content="Delete" color="red"
                    onClick={() => this.deleteHost(host.id)}/>
          </Table.Cell>
        </Table.Row>
      )
    });

    return (
      <div>
        <Table celled>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>IP Address</Table.HeaderCell>
              <Table.HeaderCell>OS</Table.HeaderCell>
              <Table.HeaderCell>SSH Port</Table.HeaderCell>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Date added</Table.HeaderCell>
              <Table.HeaderCell/>
              <Table.HeaderCell/>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {hostsRows}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                <Button
                  floated="right"
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                  onClick={() => this.showForm(true)}
                >
                  <Icon name='computer'/> Add Host
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    )
  }

  renderEmptyTableMessage() {
    return (
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div style={{width: "275px", marginBottom: "10px"}}>
          <Message negative>
            <Message.Header>Oops!</Message.Header>
            <p>The hosts table seems to be empty</p>
          </Message>
        </div>
        <div>
          <Button
            icon
            labelPosition="left"
            primary
            size="small"
            onClick={() => this.showForm(true)}
          >
            <Icon name='computer'/> Add first host
          </Button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="host-form-modal">
          <HostForm
            form={this.props.hosts.form}
            actions={{
              showForm: this.props.actions.showHostForm,
              submitHostForm: this.props.actions.submitHostForm
            }
            }
          />
        </div>
        {_.isEmpty(this.props.hosts.list) ? this.renderEmptyTableMessage() : this.renderHostTable()}
      </div>
    )
  }
}

export default HostList;