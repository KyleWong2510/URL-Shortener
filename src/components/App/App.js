import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    getUrls()
      .then((data) => this.setState({ urls: data.urls }))
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.urls.length !== prevState.urls.length) {
      getUrls()
        .then((data) => this.setState({ urls: data.urls }))
    }
  }

  makePost = (urlToPost) => {
    postUrl(urlToPost)
    this.updateState(urlToPost)
  }

  updateState = (newUrl) => {
    this.setState((prevState) => ({ urls: [...prevState.urls, newUrl] }))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm 
            saveUrl={this.makePost}
          />
        </header>
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
