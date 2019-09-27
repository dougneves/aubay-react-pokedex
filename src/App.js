import React, { Component } from 'react';
import Pokemon from './Pokemon';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      pokemons: []
    };
  }

  async componentDidMount() { 
    const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon');

    this.setState({
      loaded: true,
      pokemons: pokemons.data.results
    });
  }

  render() {
    const { loaded, pokemons } = this.state;

    if (loaded) return pokemons.map(function (item) {
      return <Pokemon key={item.name} name={item.name} url={item.url} />;
    });

    return <div>loading...</div>;
  }
}

export default App;
