import React, {Component} from 'react';
import {TextField, Paper, RaisedButton } from 'material-ui';
import {login} from '../AC/login';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      pass: ''
    };
  }


  render() {
    return (
      <div className="login">
        <h2 >Login Page</h2>
        <Paper zDepth={5} style={{textAlign: 'center'}}>
          <TextField
            onChange={this._loginChange}
            className="login__field"
            floatingLabelText="Email" />
          <TextField
            onChange={this._passChange}
            className="login__field"
            floatingLabelText="Password"
            type="password" />
          <RaisedButton
            onClick={this._Auth}
            className="btn"
            primary={true}
            label="Log in" />
        </Paper>
      </div>
    )
  }

  _loginChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  _passChange = e => {
    this.setState({
      pass: e.target.value
    });
  };

  _Auth = () => {
    const {email, pass} = this.state;
    const {login} = this.props;
    login(email, pass);
    // console.log()
  }
}

export default connect((state) => {
  return state;
},{login: login})(Login);