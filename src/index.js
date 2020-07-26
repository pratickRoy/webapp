import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import _ from 'underscore-node'

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function HistoryStep(props) {
    return (
        <td key={props.moveNumber}>
            <div>
                <button onClick={props.onClick}>{props.desc}</button>
                <Board
                    squares={props.squares}
                    onClick={() => {}}
                />
            </div>
        </td>
    );
}

function HistoryStepRow(props) {

    const steps = props.movesRow.map((move, moveNumber) => {

        const gameMoveNumber = moveNumber + (3 * props.rowIndex)
        const desc = gameMoveNumber
            ? "Go to Game move #" + (gameMoveNumber)
            : "Go to Game Start"

        return (
            <HistoryStep
                moveNumber={gameMoveNumber}
                desc={desc}
                onClick={() => props.onClick(gameMoveNumber)}
                squares={props.history[gameMoveNumber].squares}
            />
        )

    });

    return (
        <tr>
            {steps}
        </tr>
    );
}

class Board extends React.Component {

    renderSquare(i) {

        return (
            <Square
                value={this.props.squares[i]}
                position={i}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [
                { squares: Array(9).fill(null) },
            ],
            moveNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i) {

        const history = this.state.history.slice(0, this.state.moveNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                { squares: squares }
            ]),
            moveNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(moveNumber) {

        this.setState({
            moveNumber: moveNumber,
            xIsNext: (moveNumber % 2) === 0
        });
    }

    renderHistoryStepRow(history, movesRows, rowIndex) {

        if(!movesRows[rowIndex]) {
            return <tr/>
        }

        return (
            <HistoryStepRow
                movesRow = {movesRows[rowIndex]}
                rowIndex = {rowIndex}
                onClick={(moveNumber) => this.jumpTo(moveNumber)}
                history={history}
            />
        );
    }

    render() {

        const history = this.state.history.slice();
        const current = history[this.state.moveNumber];
        const winner = calculateWinner(current.squares);

        const movesRows = _.groupBy(history, function (step, stepIndex) {
            return Math.floor(stepIndex / 3)
        })

        const moves =
            <tbody>
                {this.renderHistoryStepRow(history, movesRows, 0)}
                {this.renderHistoryStepRow(history, movesRows, 1)}
                {this.renderHistoryStepRow(history, movesRows, 2)}
                {this.renderHistoryStepRow(history, movesRows, 3)}
            </tbody>

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <table>{moves}</table>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
