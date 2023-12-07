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
                this.setState({ displayBoard: true, gridData: data.data })
            }
        });
    }


    render() {
        return (
            <Box>
                {this.state.displayBoard ? <Board grid={this.state.gridData.board} generation={this.state.gridData.generation} /> : <InitForm />}
            </Box>
        );
    }
}

export default Home;