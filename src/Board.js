import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
	static defaultProps = { nrows: 5, ncols: 5, chanceLightStartsOn: 0.25 };
	constructor(props) {
		super(props);
		this.state = {
			hasWon: false,
			board: this.createBoard(),
		};
	}

	// Board creation

	createBoard() {
		let board = [];
		for (let i = 0; i < this.props.nrows; i++) {
			let row = [];
			for (let y = 0; y < this.props.ncols; y++) {
				row.push(Math.random() < this.props.chanceLightStartsOn);
			}
			board.push(row);
		}
		return board;
	}

	// Handle flipping cells

	flipCellsAround(coord) {
		let { ncols, nrows } = this.props;
		let board = this.state.board;
		let [y, x] = coord.split('-').map(Number);

		function flipCell(y, x) {
			// if this coord is actually on board, flip it

			if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
				board[y][x] = !board[y][x];
			}
		}

		// FLipping cells

		flipCell(y, x); // flip initial cell
		flipCell(y, x - 1); // flip left cell
		flipCell(y, x + 1); // flip right cell
		flipCell(y - 1, x); // flip upper cell
		flipCell(y + 1, x); // flip lower cell

		//Check if the game is won
		let hasWon = board.every((row) => row.every((cell) => !cell));
		this.setState({ board: board, hasWon: hasWon });
	}

	// Function for board rendering

	renderTable() {
		let board = [];
		for (let y = 0; y < this.props.nrows; y++) {
			let row = [];
			for (let x = 0; x < this.props.ncols; x++) {
				let coord = `${y}-${x}`;
				row.push(
					<Cell
						key={coord}
						isLit={this.state.board[y][x]}
						flipCellsAround={() => this.flipCellsAround(coord)}
					/>
				);
			}
			board.push(<tr key={y}>{row}</tr>);
		}
		return (
			<table className='Board'>
				<tbody>{board}</tbody>
			</table>
		);
	}

	// Render game board or winning message.

	render() {
		return (
			<div>
				{this.state.hasWon ? (
					<h1>You have won</h1>
				) : (
					<div>{this.renderTable()}</div>
				)}
			</div>
		);
	}
}

export default Board;
