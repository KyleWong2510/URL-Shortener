import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      urlToShorten: '',
      isValid: true
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.title && this.state.urlToShorten) {
      const urlToPost = {
        title: this.state.title,
        long_url: this.state.urlToShorten
      }
      this.setState({ isValid: true })
      this.props.saveUrl(urlToPost)
      this.clearInputs();
    } else {
      this.setState({ isValid: false })
    }
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  render() {
    return (
      <form data-testid='form'>
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

        {!this.state.isValid && <p>COMPLETE THE FORM</p>}
      </form>
    )
  }
}

export default UrlForm;
