import React, { Component } from "react";
import { sampleText } from "./sampleText";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import Membres from './membres/Membres';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const familles = {
  membre1: {
    "nom": "KA",
    "age": 29
  },
  membre2: {
    "nom": "NDIAYE",
    "age": 22
  },
  membre3: {
    "nom": "SOW",
    "age": 25
  }
}

class App extends Component {

  state = {
    text: sampleText,
    familles: familles
  }
  handleChange = event => {
    let text = sanitizeHtml(event.target.value)
    this.setState({ text: text })
  }
  buttonChanged = (event, membre) => {
    const familles = { ...this.state.familles }
    const newNom = "X"
    familles[membre].nom = newNom
    this.setState({ familles })
  }
  textChanged = (event, membre) => {
    const familles = { ...this.state.familles }
    const newNom = event.target.value
    familles[membre].nom = newNom
    this.setState({ familles })
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
    const { text } = this.state

    localStorage.setItem('text', text)
  }

  render() {
    const { familles } = this.state

    const liste = Object.keys(familles)
      .map(membre => (
        <Membres
          key={membre}
          age={familles[membre].age}
          nom={familles[membre].nom}
          buttonChanged={event => this.buttonChanged(event, membre)}
          textChanged={event => this.textChanged(event, membre)}
        />
      ))

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
        <div className="row">
          Liste des familles

          {liste}
        </div>
      </div>
    );
  }
}

export default App;
