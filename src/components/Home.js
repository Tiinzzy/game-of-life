import React, { Component } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            row: 30,
            column: 40,
            initialization: 100,
        };
    }

    handleGetRow(e) {
        this.setState({ row: e.target.value });
    }

    handleGetColumn(e) {
        this.setState({ column: e.target.value });
    }

    handleGetInitialization(e) {
        this.setState({ initialization: e.target.value })
    }

    createBoard() {
        console.log(this.state.initialization, this.state.row, this.state.column);
    }

    render() {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" marginTop={20}>
                <Box p={3} boxShadow={3} border={1} borderColor="grey.300" borderRadius={2} style={{ backgroundColor: 'white' }} maxWidth="sm">
                    <Typography variant="h4" style={{ margin: '20px 0', textAlign: 'center' }}>
                        Game of Life
                    </Typography>
                    <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Row"
                            value={this.state.row}
                            onChange={(e) => this.handleGetRow(e)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Column"
                            value={this.state.column}
                            onChange={(e) => this.handleGetColumn(e)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Initialization"
                            name="initialization"
                            value={this.state.initialization}
                            onChange={(e) => this.handleGetInitialization(e)}
                        />
                        <Button variant="contained" style={{ marginTop: '20px', display: 'block', width: '100%' }} onClick={() => this.createBoard()}>
                            Create
                        </Button>
                    </form>
                </Box>
            </Box>
        );
    }
}

export default Home;