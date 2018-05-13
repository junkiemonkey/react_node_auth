import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { TextField, Paper, RaisedButton, Dialog, FlatButton } from 'material-ui';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth.actions';

@connect(({auth}) => ({auth}), { login })
export default class Login extends Component {
  static contextTypes = {
    router: object,
    store: object
  }

  static propTypes = {
    auth: object,
    login: func
  }

  constructor(props) {
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

  componentWillReceiveProps(props) {
    const {auth: { user: { isAuthenticated } }} = props;
    const {router} = this.context;
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      this.setState({
        popup: true
      });
    }
  }

  handleClose = () => this.setState({ popup: false });

  inputHandler = ({target: {value, name}}) => this.setState({[name]: value})

  Auth = () => {
    const {
      props: { login },
      state: { email, pass },
      validator
    } = this;
    if (!validator()) return;
    login(email, pass);
  }

  validator = () => {
    const {email, pass} = this.state;
    if (email == '') {
      this.setState({
        emailField: true,
        error: 'This field is required'
      });
      return false;
    } else if (!/^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(email)) {
      this.setState({
        emailField: true,
        error: 'Incorrect email!'
      });
      return false;
    }
    this.setState({
      emailField: false,
      error: ''
    });
    if (pass === '') {
      this.setState({
        passField: true,
        error: 'This field is required'
      });
      return false;
    }
    this.setState({
      passField: false,
      error: ''
    });
    return true;
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onClick={this.handleClose}
      />,
    ];

    const {
      inputHandler
    } = this;

    return (
      <div className="login">
        <h2 >Log In</h2>
        <Paper zDepth={5} style={{textAlign: 'center'}}>
          <TextField
            onChange={inputHandler}
            errorText={this.state.emailField ? this.state.error : ''}
            className="login__field"
            name="email"
            type="email"
            floatingLabelText="Email"
          />
          <TextField
            onChange={inputHandler}
            className="login__field"
            name="pass"
            errorText={this.state.passField ? this.state.error : ''}
            floatingLabelText="Password"
            type="password"
          />
          <RaisedButton
            onClick={this.Auth}
            className="btn"
            primary
            label="Log in"
          />
          <div className="reg_link">
            <Link to="/registration">Sign Up</Link>
          </div>
        </Paper>
        <Dialog
          title="Access denied!"
          actions={actions}
          modal
          open={this.state.popup}
        >
          Login or Password is wrong!
        </Dialog>
      </div>
    );
  }
}
