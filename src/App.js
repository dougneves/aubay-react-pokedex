import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import { Link } from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            pokemons: [],
            nextUrl: null
        };

        this.loadMore = this.loadMore.bind(this);
    }

    async loadMore() {
        const { nextUrl } = this.state;
        const pokemons = await axios.get(nextUrl || 'https://pokeapi.co/api/v2/pokemon');

        this.setState(function(state) {
            return {
                loaded: true,
                pokemons: [...state.pokemons, ...pokemons.data.results],
                nextUrl: pokemons.data.next
            };
        });
    }

    componentDidMount() {
        this.loadMore();
    }

    render() {
        const { loaded, pokemons, nextUrl } = this.state;

        if (loaded)
            return (
                <div>
                    {pokemons.map(function(item) {
                        return (
                            <div key={item.name}>
                                <Link to={`/pokemon/${item.name}`}>{item.name}</Link>
                            </div>
                        );
                    })}
                    {false}
                    {null}
                    {undefined}
                    {nextUrl && <button onClick={this.loadMore}>Load more!</button>}
                </div>
            );

        return <div>loading...</div>;
    }
}

export default App;
