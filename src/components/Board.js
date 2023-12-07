import React, { Component } from 'react';

import { Box } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Tooltip from '@mui/material/Tooltip';

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

function boardIsEmpty(boardObject) {
    let count = 0;
    for (let array of boardObject) {
        if (array.includes(1)) {
            count++;
        }
    }
    return count < 1;
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: props.grid,
            generation: props.generation,
            evolveGenerations: null,
            delay: 900
        };
    }

    renderGrid() {
        let cellSize = 25;

        let rowStyle = {
            padding: 0,
            margin: 0,
            height: cellSize,
            marginBottom: 4,
        }

        let cellStyle = (cell) => {
            return {
                border: 'solid 1px gray',
                marginRight: 2,
                height: cellSize,
                width: cellSize * 1.1,
                display: 'inline-block',
                backgroundColor: cell ? 'black' : 'white',
                color: cell ? 'white' : 'black',
                fontSize: 8
            }
        }
        return this.state.grid.map((row, rowIndex) => (
            <div key={rowIndex} style={rowStyle}>
                {row.map((cell, colIndex) => (
                    <div key={colIndex} style={cellStyle(cell)} onClick={() => this.handleCellClick(rowIndex, colIndex)}>{rowIndex},{colIndex}</div>
                ))}
            </div>
        ));

    }

    fetchNextGenerations() {
        if (this.state.evolveGenerations !== null) {
            clearInterval(this.state.evolveGenerations);
        }
        let evolveGenerations = setInterval(() => {
            backend.fetch_evolved_generation((data) => {
                this.setState({ grid: data.board }, () => {
                    if (boardIsEmpty(data.board)) {
                        clearInterval(evolveGenerations);
                    }
                });
            })
        }, this.state.delay);
        this.setState({ evolveGenerations });
    }

    render() {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" marginTop={5} flexDirection='column'>
                <Box marginBottom={3}>
                    <Tooltip title="Start">
                        <PlayCircleFilledWhiteIcon fontSize='large' style={{ cursor: 'pointer', marginRight: 15 }} onClick={() => this.fetchNextGenerations()} />
                    </Tooltip>
                    <Tooltip title="Pause">
                        <PauseCircleIcon fontSize='large' style={{ cursor: 'pointer', marginRight: 15 }} />
                    </Tooltip>
                    <Tooltip title="Reset">
                        <RestartAltIcon fontSize='large' style={{ cursor: 'pointer', marginRight: 15 }} />
                    </Tooltip>
                </Box>
                <div>
                    {this.renderGrid()}
                </div>
            </Box>
        );
    }
}

export default Board;