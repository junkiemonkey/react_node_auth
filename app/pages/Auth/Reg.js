import React, {Component} from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, Paper, RaisedButton } from 'material-ui';
import { registration } from '../../actions/auth.actions';

@connect(state => state, { registration })
export default class Reg extends Component {

  static contextTypes = {
    router: object,
    store: object
  }

  static propTypes = {
    auth: object,
    registration: func
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      pass: '',
      confirm: '',
      error: '',
      nameField: false,
      emailField: false,
      passField: false,
      confirmField: false
    };
  }

  componentWillReceiveProps(props) {
    const { auth: { user: { reg } } } = props;
    const {router} = this.context;
    if (reg) {
      router.push('/login');
    }
  }

  inputHandler = ({target: {value, name}}) => this.setState({ [name]: value })

  singUp = () => {
    const {
      props: { registration },
      state: { name, email, pass },
      validator
    } = this;
    if (!validator()) return null;
    registration({ username: name, email, password: pass });
  }

  validator = () => {
    const {
      name, email, pass, confirm
    } = this.state;
    let flag;
    if (name === '') {
      this.setState({
        nameField: true,
        error: 'This field is required'
      });
      flag = false;
    } else {
      this.setState({
        nameField: false,
        error: ''
      });
      flag = true;
    }
    if (email === '') {
      this.setState({
        emailField: true,
        error: 'This field is required'
      });
      flag = false;
    } else if (!/^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(email)) {
      this.setState({
        emailField: true,
        error: 'Incorrect email!'
      });
      flag = false;
    } else {
      this.setState({
        emailField: false,
        error: ''
      });
      flag = true;
    }
    if (pass === '') {
      if (confirm !== '') {
        this.setState({
          confirmField: false,
          error: ''
        });
      }
      this.setState({
        passField: true,
        error: 'This field is required'
      });
      flag = false;
    } else if (confirm === '') {
      if (pass !== '') {
        this.setState({
          passField: false,
          error: ''
        });
      }
      this.setState({
        confirmField: true,
        error: 'This field is required'
      });
      flag = false;
    } else if (pass !== confirm) {
      this.setState({
        passField: true,
        confirmField: true,
        error: 'Passwords not equal!'
      });
      flag = false;
    } else {
      this.setState({
        confirmField: false,
        passField: false,
        error: ''
      });
      flag = true;
    }
    return flag;
  }

  render() {
    const { inputHandler, singUp } = this;
    return (
      <div className="login">
        <h2>Sign Up</h2>
        <Paper zDepth={5} style={{textAlign: 'center'}}>
          <TextField
            onChange={inputHandler}
            name="name"
            className="login__field"
            errorText={this.state.nameField ? this.state.error : ''}
            floatingLabelText="Name"
            value={this.state.name}
          />
          <TextField
            onChange={inputHandler}
            name="email"
            className="login__field"
            type="email"
            errorText={this.state.emailField ? this.state.error : ''}
            floatingLabelText="Email"
            value={this.state.email}
          />
          <TextField
            onChange={inputHandler}
            name="pass"
            className="login__field"
            type="password"
            errorText={this.state.passField ? this.state.error : ''}
            floatingLabelText="Password"
            value={this.state.pass}
          />
          <TextField
            onChange={inputHandler}
            className="login__field"
            name="confirm"
            errorText={this.state.confirmField ? this.state.error : ''}
            floatingLabelText="Confirm Password"
            type="password"
            value={this.state.confirm}
          />
          <RaisedButton
            onClick={singUp}
            className="btn"
            primary
            label="Sign Up"
          />
          <div className="reg_link">
            <Link to="/login">Sign In</Link>
          </div>
        </Paper>
      </div>
    );
  }
}
