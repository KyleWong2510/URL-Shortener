import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl, deleteUrl } from '../../apiCalls';
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
      .catch(err => console.error(err))
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

  deleteFromState = (id) => {
    let foundUrl = this.state.urls.find(url => url.id === id)
    let urlsCopy = [...this.state.urls]
    let index = urlsCopy.indexOf(foundUrl)
    urlsCopy.splice(index, 1)
    this.setState({ urls: urlsCopy })
    deleteUrl(id)
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
        <UrlContainer urls={this.state.urls} deleteUrl={this.deleteFromState}/>
      </main>
    );
  }
}

export default App;
