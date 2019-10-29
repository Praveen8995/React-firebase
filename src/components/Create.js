import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('users');
    this.state = {
      name: '',
      password: '',
      phone: '',
      user_name: '',
      user_type: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, password, phone, user_name, user_type } = this.state;

    this.ref.add({
      name,
      password,
      phone,
      user_name,
      user_type
    }).then((docRef) => {
      this.setState({
        name: '',
        password: '',
        phone: '',
        user_name: '',
        user_type: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { name, password, phone, user_name, user_type } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD USER
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">User List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" name="password" value={password} onChange={this.onChange} placeholder="Password" />
              </div>
              <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="text" class="form-control" name="phone" value={phone} onChange={this.onChange} placeholder="Phone" />
              </div>
              <div class="form-group">
                <label for="user_name">User Name:</label>
                <input type="text" class="form-control" name="user_name" value={user_name} onChange={this.onChange} placeholder="User name" />
              </div>
              <div class="form-group">
                <label for="user_type">User Type:</label>
                <input type="text" class="form-control" name="user_type" value={user_type} onChange={this.onChange} placeholder="User type" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;