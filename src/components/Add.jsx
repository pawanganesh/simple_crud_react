import React, { Component } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import { uuid } from "uuidv4";

class Add extends Component {
  state = {
    id: uuid(),
    name: "",
    username: "",
  };
  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(event.target.name);
  };
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ name: "", username: "" });
  };
  render() {
    const { name, username } = this.state;
    return (
      <Modal trigger={<Button>Add New User</Button>}>
        <Modal.Header>Add New User</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Input
              label="Full Name"
              placeholder="Full Name"
              value={name}
              name="name"
              onChange={this.onInputChange}
            ></Form.Input>
            <Form.Input
              label="UserName"
              placeholder="Username"
              value={username}
              name="username"
              onChange={this.onInputChange}
            ></Form.Input>
            <Button content="Submit" type="submit"></Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default Add;
