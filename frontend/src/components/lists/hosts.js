import React, {Component} from "react";
import {Button, Dropdown, Icon, Table} from "semantic-ui-react";
import {hostProperties} from "../../constants";
import _ from 'lodash';

class HostList extends Component {

  constructor(props) {
    super(props);

    this.executeCommand = this.executeCommand.bind(this);
    this.setCommand = this.setCommand.bind(this);
  }

  setCommand(id, {value}) {
    this.props.actions.setCommandOnHost(id, value);
  }

  executeCommand(id) {
    this.props.actions.executeCommandOnHost(id);
  }

  render() {

    const {hosts} = this.props;
    const {list, error} = hosts;
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
              value={host.host_command}
              onChange={(event, data) => this.setCommand(host.id, data)} />
          </Table.Cell>
          <Table.Cell>
            <Button content="Execute" disabled={_.isNull(host.host_command)} onClick={() => this.executeCommand(host.id)} />
          </Table.Cell>
        </Table.Row>
      )
    });

    return (
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
                floated='right'
                icon
                labelPosition='left'
                primary
                size='small'
              >
                <Icon name='computer' /> Add Host
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}

export default HostList;