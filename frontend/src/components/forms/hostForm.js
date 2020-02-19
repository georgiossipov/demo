import React, {Component} from "react";
import {Button, Form, Modal} from "semantic-ui-react";

class HostForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        ipv4_address: "",
        ssh_port: 22,
        username: "",
        password: ""
      }
    };

    this.changeField = this.changeField.bind(this);
  }

  changeField(event, {id, value}) {
    const {formData} = this.state;
    formData[id] = value;
    this.setState({formData});
  };

  render() {

    const {formData} = this.state;
    const {ipv4_address, ssh_port, username, password} = formData;

    return (
      <Modal open={this.props.form.open}
             onClose={() => this.props.actions.showForm(false)}
             closeOnEscape={false}
             closeOnDimmerClick={false}
             size="small"
      >
        <Modal.Header>Add a host</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Input id="ipv4_address" label="IP Address" width={12} onChange={this.changeField} value={ipv4_address}/>
              <Form.Input id="ssh_port" label="SSH Port" type="number" width={8} onChange={this.changeField} value={ssh_port}/>
            </Form.Group>
            <Form.Group>
              <Form.Input id="username" label="Username" width={10} onChange={this.changeField} value={username}/>
              <Form.Input id="password" label="Password" type="password" width={10} onChange={this.changeField} value={password}/>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => this.props.actions.showForm(false)}>Cancel</Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Add host"
            onClick={() => this.props.actions.submitHostForm(this.state.formData)}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default HostForm;