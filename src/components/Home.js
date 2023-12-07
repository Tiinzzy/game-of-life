import React, { Component } from 'react';

import { Box } from '@mui/material';

import InitForm from './InitForm';
import Board from './Board';

import { eventEmitter } from './InitForm';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayBoard: false
        };
    }

    componentDidMount() {
        eventEmitter.on('boardReady', (data) => {
            if (data.data.generation >= 0) {
                this.setState({ displayBoard: true })
            }
        });
    }


    render() {
        return (
            <Box>
                {this.state.displayBoard ? <Board /> : <InitForm />}
            </Box>
        );
    }
}

export default Home;