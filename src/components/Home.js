import React, { Component } from 'react';

import { Box } from '@mui/material';

import InitForm from './InitForm';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <Box>
                <InitForm />
            </Box>
        );
    }
}

export default Home;