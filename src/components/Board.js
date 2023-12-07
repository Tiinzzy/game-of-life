import React, { Component } from 'react';

import { Box } from '@mui/material';


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayBoard: false
        };
    }



    render() {
        return (
            <Box>
                this is boad!
            </Box>
        );
    }
}

export default Board;