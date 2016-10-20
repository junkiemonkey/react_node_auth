import React, { Component, PropTypes } from 'react';;
import {TextField, RaisedButton, FlatButton } from 'material-ui';
import SaveIcon from 'material-ui/svg-icons/content/save';
import BackIcon from 'material-ui/svg-icons/hardware/keyboard-backspace';
import { connect } from 'react-redux';
import {saveNews, addNews, updateNews} from '../AC/news.AC';

class EditNewsComponent extends Component {

  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  state = {
    title: '',
    text: '',
    file: null,
    titleField: false,
    textField: false,
    fileField: false,
    error: ''
  }

  static propTypes = {

  }
  
  render(){
    const {newslist, slug} = this.props;
    const edited = slug ? newslist.news.filter(nw => nw.slug == slug) : [];

    return(
      <div>
        <div className="news-editor">
          <div className="news-editor__field">
            <TextField
              onChange={this.titleHandler}
              floatingLabelText = "Title"
              defaultValue = {edited.length ? edited[0].title : ''}
              errorText = {this.state.titleField ? this.state.error : ''}
              fullWidth = {true} />
          </div>
          <div className="news-editor__field">
            <TextField
              onChange={this.textHandler}
              errorText={this.state.textField ? this.state.error : ''}
              fullWidth={true}
              multiLine={true}
              defaultValue = {edited.length ? edited[0].text : ''}
              rows={8}
              rowsMax={10}
              floatingLabelText="Text" />
          </div>
          <div className="news-editor__field">
            <TextField
              id="file"
              errorText={this.state.fileField ? this.state.error : ''}
              type="file"
              onChange={this.fileHandler} />
          </div>
          <RaisedButton label="Save" primary={true} icon={<SaveIcon />} onClick={this.saveHandler} />
          <FlatButton label="Go back" primary={true} icon={<BackIcon />} onClick={this.goBack} />
        </div>
      </div>
    );
  }

  fileHandler = e => {
    console.log(e.target.files[0]);
    this.setState({
      file: e.target.files[0],
      fileField:false
    });
  }

  goBack = () => {
    const {router} = this.context;
    const {addNews} = this.props;
    addNews(false);
    router.push('/dashboard');
  }

  titleHandler = e => {
    this.setState({
      title: e.target.value
    })
  };

  textHandler = e => {
    this.setState({
      text: e.target.value
    })
  };

  saveHandler = e => {
    if(!this._validator(this.state)) return;
    const data = {
      title: this.state.title,
      text: this.state.text,
      file: this.state.file
    }
    const {saveNews, newslist, slug, updateNews} = this.props;
    const {router} = this.context;
    if(newslist.is_edit_news){
      updateNews(data, slug);
    }else {
      saveNews(data);
    }
    addNews(false);
    router.push('/dashboard');
  };

  _validator = state => {
    const {newslist} = this.props;
    const is_edit = newslist.hasOwnProperty('is_edit_news') && newslist.is_edit_news;
    const {title, text, file} = state;
    const error = 'This field is required';
    const alowedTypes = ['images/png', 'image/jpeg'];
    const typeError = file ? `Type ${file.type} not allowed! Only ${alowedTypes}` : '';
    if(title == '' && !is_edit){
      this.setState({
        titleField: true,
        error: error
      });
      return false;
    }else {
      this.setState({
        titleField: false,
        error: ''
      });
    }
    if(text == '' && !is_edit){
      this.setState({
        textField: true,
        error: error
      });
      return false;
    }else {
      this.setState({
        textField: false,
        error: ''
      });
    }
    if(file == null && !is_edit){
      this.setState({
        fileField: true,
        error: error
      });
      return false;
    }else if(file && alowedTypes.indexOf(file.type) == -1){
      this.setState({
        fileField: true,
        error: typeError
      });
      return false
    }
    return true;
  }
}

export default connect(null, {saveNews, addNews, updateNews})(EditNewsComponent);