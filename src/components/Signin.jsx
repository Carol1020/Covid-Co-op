import React, {useState, Component}  from 'react';
import './Signin.css';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { render } from '@testing-library/react';
class Signin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: ''
     };
  }
  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
      event.preventDefault()
      const {username, email, password} = this.state

      let user = {
        username: username,
        email: email,
        password: password
      }

      axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
        .then(response => {
          if (response.data.logged_in) {
            this.props.handleLogin(response.data)
            this.redirect()
          } else {
            this.setState({
              errors: response.data.errors
            })
          }
        })
        .catch(error => console.log('api errors:', error))
      };

    redirect = () => {
      this.props.history.push('/')
    }

    handleErrors = () => {
        return (
          <div>
            <ul>
            {this.state.errors.map(error => {
            return <li key={error}>{error}</li>
              })}
            </ul>
          </div>
        )
      }

    render(){
      const {email, password} = this.state

        return(
            <div class='row justify-content-md-center'>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h2 class = "center">Sign In</h2>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input class="form-control" type="email" id="email" placeholder="Email" value={email} onChange={this.handleChange} />
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input class="form-control" type="password" id="password" placeholder="Password" value={password} onChange={this.handleChange} />
                                </div>
                                <button type="button" id="submit-btn" class="btn btn-primary">Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin;
