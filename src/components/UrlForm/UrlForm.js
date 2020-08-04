import React, { Component } from 'react';
import { postUrl } from '../../apiCalls'

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      urlToShorten: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.makePost()
    this.clearInputs();
  }

  makePost = () => {
    let urlToPost = {
      title: this.state.title,
      long_url: this.state.urlToShorten
    }
    postUrl(urlToPost)
      .then(res => {
        if (res.ok) {
          this.props.saveUrl(urlToPost)
        } else {
          console.log(res)
          alert(`Bad Request: ${res.status} ${res.statusText}`)
        }
      })
      .catch(err => console.error(err))
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleNameChange(e)}
        />

        <button onClick={e => this.handleSubmit(e)}>
          Shorten Please!
        </button>
      </form>
    )
  }
}

export default UrlForm;
