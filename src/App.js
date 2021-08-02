import React, { Component } from "react";
import { Container, Input } from "semantic-ui-react";
import Add from "./components/Add";
import View from "./components/View";
import users from "./api/users";

class App extends Component {
  state = {
    users: [],
    query: "",
    results: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const Response = await users.get("/users");
    this.setState({ users: Response.data });
  };

  OnSearchChange = (event) => {
    const value = event.target.value;
    const { users } = this.state;
    this.setState({ query: value });
    const results = users.filter((user) => {
      const regex = new RegExp(value, "gi");
      return user.name.match(regex);
    });
    console.log(results);
    this.setState({ results });
  };

  // onFormSubmit = (user) => {
  //   console.log(user);
  //   const { users } = this.state;
  //   this.setState({ users: [...users, user] });
  // };

  //api
  onFormSubmit = async (user) => {
    await users.post("/users", user);
    this.fetchData();
  };

  // onUserDelete = (id) => {
  //   const { users } = this.state;
  //   this.setState({
  //     users: users.filter((user) => user.id != id),
  //   });
  // };

  // api
  onUserDelete = async (id) => {
    await users.delete(`/users/${id}`);
    this.fetchData();
  };

  getUserById = (id) => {
    const { users } = this.state;
    const user = users.filter((user) => user.id === id);
    return user[0];
  };

  // onEdit = (id, updatedUser) => {
  //   const { users } = this.state;
  //   this.setState({
  //     users: users.map((user) => (user.id === id ? updatedUser : user)),
  //   });
  // };

  //api
  onEdit = async (id, updatedUser) => {
    await users.patch(`/users/${id}`, updatedUser);
    this.fetchData();
  };

  render() {
    const { users, results, query } = this.state;
    const data = results.length === 0 && !query ? users : results;
    // console.log(users);
    return (
      <Container>
        <Add onSubmit={this.onFormSubmit}></Add>
        <Input
          icon="search"
          placeholder="Search"
          onChange={this.OnSearchChange}
        ></Input>
        <View
          data={data}
          onDeleteClick={this.onUserDelete}
          getUserById={this.getUserById}
          onEdit={this.onEdit}
        ></View>
      </Container>
    );
  }
}

export default App;
