import React, { Component } from "react";
import { sampleText } from "./sampleText";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  state = {
    text: sampleText
  }
  handleChange = event => {
    let text = sanitizeHtml(event.target.value)
    this.setState({ text: text })
  }
  renderText = (text) => {
    let __html = marked(text)

    return { __html };
  }

  componentDidMount() {
    let text = localStorage.getItem('text') ? localStorage.getItem('text') : this.state.text

    this.setState({ text })
  }
  componentDidUpdate() {
    let { text } = this.state

    localStorage.setItem('text', text)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h1>Entrées</h1>
            <textarea
              onChange={this.handleChange}
              value={this.state.text}
              className="form-controle"
              rows="35"
            ></textarea>
          </div>
          <div className="col-sm-6">
            <h1>Resultats</h1>
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
