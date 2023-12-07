import React, { Component } from 'react';

import { Box } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Tooltip from '@mui/material/Tooltip';

import BackEndConnection from './BackEndConnection';

import EventEmitter from 'eventemitter3';

export const eventEmitterRestart = new EventEmitter();
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
            row: props.row,
            column: props.column,
            evolveGenerations: null,
            delay: 800,
            msg: 'initial',
            clickedStart: false,
            clickedPause: false
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

    handleCellClick(row, col) {
        let newGrid = this.state.grid;
        newGrid[row][col] = (newGrid[row][col] + 1) % 2;
        this.setState({ grid: newGrid, msg: 'update' });
    }

    fetchNextGenerations() {
        if (this.state.msg === 'update') {
            let query = {
                grid: this.state.grid,
                row: this.state.row * 1,
                column: this.state.column * 1,
            };
            backend.update_grid(query, (data) => {
                if (data) {
                    this.setState({ clickedStart: true, grid: data.board, msg: 'initial', clickedPause: false }, () => this.fetchNextGenerations());
                }
            })
        } else {
            let evolveGenerations = setInterval(() => {
                backend.fetch_evolved_generation((data) => {
                    this.setState({ grid: data.board, clickedStart: true, clickedPause: false }, () => {
                        if (boardIsEmpty(data.board)) {
                            clearInterval(evolveGenerations);
                        }
                    });
                })
            }, this.state.delay);
            this.setState({ evolveGenerations });
        }
    }

    pauseGame() {
        this.setState({ clickedStart: false, clickedPause: true }, () => {
            clearInterval(this.state.evolveGenerations);
        });
    }

    restartGame() {
        eventEmitterRestart.emit('restartGame');
    }

    render() {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" marginTop={5} flexDirection='column'>
                <Box marginBottom={3}>
                    <Tooltip title="Start">
                        <PlayCircleFilledWhiteIcon fontSize='large' style={{ cursor: 'pointer', marginRight: 15, color: this.state.clickedStart && "#2196f3" }} onClick={() => this.fetchNextGenerations()} />
                    </Tooltip>
                    <Tooltip title="Pause">
                        <PauseCircleIcon fontSize='large' style={{ cursor: 'pointer', marginRight: 15, color: this.state.clickedPause && "#2196f3" }} onClick={() => this.pauseGame()} />
                    </Tooltip>
                    <Tooltip title="Reset">
                        <RestartAltIcon fontSize='large' style={{ cursor: 'pointer', marginRight: 15 }} onClick={() => this.restartGame()} />
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