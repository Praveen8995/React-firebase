import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;
    this.state = {
      users: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { name, password, phone, user_name, user_type } = doc.data();
      users.push({
        key: doc.id,
        doc,
        name,
        password,
        phone,
        user_name,
        user_type,
      });
    });
    this.setState({
      users
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              USER LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create">Add User</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Password</th>
                  <th>Phone</th>
                  <th>User name</th>
                  <th>User type</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(user =>
                  <tr>
                    <td><Link to={`/show/${user.key}`}>{user.name}</Link></td>
                    <td>{user.password}</td>
                    <td>{user.phone}</td>
                    <td>{user.user_name}</td>
                    <td>{user.user_type}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;