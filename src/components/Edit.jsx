import React, { Component } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

class Edit extends Component {
  state = {
    // id: "",
    name: "",
    username: "",
  };
  // componentDidUpdate(prevProps) {
  //   console.log(prevProps);
  //   if (prevProps.id !== this.props.id) {
  //     const user = this.props.getUserById(this.props.id);
  //     this.setState({
  //       name: user.name,
  //       username: user.username,
  //     });
  //   }
  // }

  //api
  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (prevProps.id !== this.props.id) {
      const user = this.props.getUserById(this.props.id);
      this.setState({
        // id: this.props.id,
        name: user.name,
        username: user.username,
      });
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  onCloseClick = () => {
    this.props.onClose();
  };
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onEdit(this.props.id, this.state);
    this.props.onClose();
  };
  render() {
    const { name, username } = this.state;
    const { isOpen } = this.props;
    return (
      <Modal open={isOpen} onClose={this.onCloseClick}>
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Input
              label="Full Name"
              value={name}
              name="name"
              onChange={this.onChangeHandler}
            ></Form.Input>
            <Form.Input
              label="Username"
              value={username}
              name="username"
              onChange={this.onChangeHandler}
            ></Form.Input>
            <Button content="Submit" type="submit"></Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default Edit;
