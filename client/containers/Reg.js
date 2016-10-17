import React, {Component, PropTypes} from 'react';
import {TextField, Paper, RaisedButton } from 'material-ui';
import {registrate} from '../AC/auth.AC';
import { connect } from 'react-redux';

class Reg extends Component {
  constructor(props){
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
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }


  componentWillReceiveProps(props){
    const {reg} = props.auth.user;
    const {router} = this.context;
    if(reg) {
      router.push('/login');
    }
  }

  render(){
    return (
      <div className="login">
        <h2 >Registration Page</h2>
        <Paper zDepth={5} style={{textAlign: 'center'}}>
          <TextField
            onChange={this.nameChange}
            className="login__field"
            errorText={this.state.nameField ? this.state.error : ''}
            floatingLabelText="Name" />
          <TextField
            onChange={this.emailChange}
            className="login__field"
            errorText={this.state.emailField ? this.state.error : ''}
            floatingLabelText="Email" />
          <TextField
            onChange={this.passChange}
            className="login__field"
            errorText={this.state.passField ? this.state.error : ''}
            floatingLabelText="Password"
            type="password" />
          <TextField
            onChange={this.confirmPassChange}
            className="login__field"
            errorText={this.state.confirmField ? this.state.error : ''}
            floatingLabelText="Confirm Password"
            type="password" />
          <RaisedButton
            onClick={this.SingUp}
            className="btn"
            primary={true}
            label="Sign Up" />

        </Paper>
      </div>
    )
  }

  nameChange = e => {
    this.setState({
      name: e.target.value
    })
  }
  emailChange = e => {
    this.setState({
      email: e.target.value
    })
  }
  passChange = e => {
    this.setState({
      pass: e.target.value
    })
  }
  confirmPassChange = e => {
    this.setState({
      confirm: e.target.value
    })
  }
  SingUp = e => {
    if(!this._validator(this.state)) return;
    const {name, email, pass} = this.state;
    const {registrate} = this.props;
    registrate(name, email, pass);
  }

  _validator = state => {
    const {name, email, pass, confirm} = state;
    var flag;
    if(name == '') {
      this.setState({
        nameField: true,
        error: 'This field is required'
      })
      return false;
    }else {
      this.setState({
        nameField: false,
        error: ''
      });
      flag = true;
    }
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
      flag = true;
    }
    if(pass == '') {
      if(confirm != '') {
        this.setState({
          confirmField: false,
          error: ''
        });
      }
      this.setState({
        passField: true,
        error: 'This field is required'
      });
      return false;
    }else if(confirm == ''){
      if(pass != '') {
        this.setState({
          passField: false,
          error: ''
        });
      }
      this.setState({
        confirmField: true,
        error: 'This field is required'
      });
      return false;
    }else if(pass != confirm){
      this.setState({
        passField: true,
        confirmField: true,
        error: 'Passwords not equal!'
      });
      return false;
    }else {
      this.setState({
        confirmField: false,
        passField: false,
        error: ''
      });
      flag = true;
    }
    return flag;
  }
}

export default connect(state => {
  return state;
},{registrate})(Reg);