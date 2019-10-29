import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      name: '',
      password: '',
      phone: '',
      user_name: '',
      user_type: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('users').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const user = doc.data();
        this.setState({
          key: doc.id,
          name: user.name,
          password: user.password,
          phone: user.phone,
          user_name: user.user_name,
          user_type: user.user_type
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({user:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, password, phone, user_name, user_type } = this.state;

    const updateRef = firebase.firestore().collection('users').doc(this.state.key);
    updateRef.set({
      name,
      password,
      phone,
      user_name,
      user_type
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        password: '',
        phone: '',
        user_name: '',
        user_type: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT USER
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">User List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" />
              </div>
              <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="text" class="form-control" name="phone" value={this.state.phone} onChange={this.onChange} placeholder="Phone" />
              </div>
              <div class="form-group">
                <label for="user_name">User name:</label>
                <input type="text" class="form-control" name="user_name" value={this.state.user_name} onChange={this.onChange} placeholder="User name" />
              </div>
              <div class="form-group">
                <label for="user_type">User type:</label>
                <input type="text" class="form-control" name="user_type" value={this.state.user_type} onChange={this.onChange} placeholder="USer type" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;