import React, { Component } from 'react';
import axios from 'axios';

class Pokemon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            data: {}
        };
    }

    async componentDidMount() {
        const { url } = this.props;

        const pokemons = await axios.get(url);

        this.setState({
            loaded: true,
            data: pokemons.data
        });
    }

    render() {
        const { loaded, data } = this.state;
        const { name } = this.props;

        if (loaded) {
            return <div>
                <div>dados do pokemon {name}:</div>
                <img src={data.sprites.front_default} alt={`${name} front sprite`}></img>
                <div>Pokemon order: {data.order}</div>
            </div>;
        }

        return <div>loading {name} info...</div>;
    }
}

export default Pokemon;
