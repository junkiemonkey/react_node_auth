import React, {Component, PropTypes} from 'react';
import {TextField, Paper, RaisedButton, Dialog, FlatButton } from 'material-ui';
import {login} from '../AC/auth.AC';
import { connect } from 'react-redux';
import {Link, browserHistory} from 'react-router';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      pass: '',
      emailField: false,
      passField: false,
      error: '',
      popup: false
    };
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  componentWillReceiveProps(props){
    const {auth} = props;
    const {router} = this.context;
    if(auth.user.isAuthenticated) {
      router.push('/dashboard');
    }else{
      this.setState({
        popup: true
      });
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div className="login">
        <h2 >Login Page</h2>
        <Paper zDepth={5} style={{textAlign: 'center'}}>
          <TextField
            onChange={this.emailChange}
            errorText={this.state.emailField ? this.state.error : ''}
            className="login__field"
            floatingLabelText="Email" />
          <TextField
            onChange={this.passChange}
            className="login__field"
            errorText={this.state.passField ? this.state.error : ''}
            floatingLabelText="Password"
            type="password" />
          <RaisedButton
            onClick={this.Auth}
            className="btn"
            primary={true}
            label="Log in" />
          <div className="reg_link">
            <Link to="/registration">Registration</Link>
          </div>
        </Paper>
        <Dialog
          title="Error"
          actions={actions}
          modal={true}
          open={this.state.popup}
        >Error login!</Dialog>
      </div>
    )
  }

  handleClose = () =>{
    this.setState({
      popup: false
    })
  }

  emailChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  passChange = e => {
    this.setState({
      pass: e.target.value
    });
  };

  Auth = () => {
    if(!this._validator(this.state)) return;
    const {email, pass} = this.state;
    const {login} = this.props;
    login(email, pass);
  }

  _validator = (state) => {
    const {email, pass} = state;
    if(email == '') {
      this.setState({
        emailField: true,
        error: 'This field is required'
      });
      return false;
    }else if(!/^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(email)){
      this.setState({
        emailField: true,
        error: 'Incorrect email!'
      });
      return false;
    }else {
      this.setState({
        emailField: false,
        error: ''
      });
    }
    if(pass == '') {
      this.setState({
        passField: true,
        error: 'This field is required'
      });
      return false;
    }else {
      this.setState({
        passField: false,
        error: ''
      });
    }
    return true;
  }
}

export default connect(({auth}) => {
  return { auth: auth }
},{login: login})(Login);