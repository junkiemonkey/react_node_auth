import React, {Component} from 'react';
import {TextField, Paper, RaisedButton } from 'material-ui';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: '',
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
            floatingLabelText="Login" />
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
      login: e.target.value
    });
  };

  _passChange = e => {
    this.setState({
      pass: e.target.value
    });
  };

  _Auth = () => {
    console.log(this.state.login);
    console.log(this.state.pass);
  }
}

export default Login;