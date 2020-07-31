import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import _ from 'underscore-node'

const players = {
    PLAYER_1: {
        side: "X",
        class: "player-1",
    },
    PLAYER_2: {
        side: "O",
        class: "player-2"
    },
}

function getNextPlayer(currentPlayer) {

    if (currentPlayer === players.PLAYER_1) {
        return players.PLAYER_2;
    } else if (currentPlayer === players.PLAYER_2) {
        return players.PLAYER_1;
    }
    throw "Illegal Argument";
}

function getPlayerByMove(moveNumber) {

    if (moveNumber % 2 === 0) {
        return players.PLAYER_2;
    }
    return players.PLAYER_1;
}

function getPlayerBySide(side) {

    if (side === "X") {
        return players.PLAYER_1;
    } else if (side === "O") {
        return players.PLAYER_2;
    }
    return null;
}

function Square(props) {
    return (
        <button className={"square " + props.classes} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function HistoryStep(props) {
    return (
        <td key={props.moveNumber}>
            <div className="game-board small">
                <Board
                    isGameOver={isGameOver(props.squares) || calculateWinner(props.squares)}
                    classes={"small"}
                    squares={props.squares}
                    onClick={() => {}}
                />
                <button className={"history-step-btn"} onClick={props.onClick}>{props.desc}</button>
            </div>
        </td>
    );
}

function HistoryStepRow(props) {

    const steps = props.movesRow.map((move, moveNumber) => {

        const gameMoveNumber = moveNumber + (5 * props.rowIndex)
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

        const side = this.props.squares[i];
        const player = getPlayerBySide(side);
        console.log(player)
        return (
            <Square
                classes={this.props.classes + (player ? " " + player.class : "") + (this.props.isGameOver ? " game-over" : "")}
                value={side}
                position={i}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {

        return (
            <div>
                <div className={"board-row " + this.props.classes}>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className={"board-row " + this.props.classes}>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className={"board-row " + this.props.classes}>
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
            currentPlayer: players.PLAYER_1
        };
    }

    handleClick(i) {

        const history = this.state.history.slice(0, this.state.moveNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.currentPlayer.side
        this.setState({
            history: history.concat([
                { squares: squares }
            ]),
            moveNumber: history.length,
            currentPlayer: getNextPlayer(this.state.currentPlayer)
        });
    }

    jumpTo(moveNumber) {

        this.setState({
            moveNumber: moveNumber,
            currentPlayer: getPlayerByMove(moveNumber + 1)
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
        const gameOver = isGameOver(current.squares);
        const winner = calculateWinner(current.squares);

        const movesRows = _.groupBy(history, function (step, stepIndex) {
            return Math.floor(stepIndex / 5)
        })

        const moves =
            <tbody>
                {this.renderHistoryStepRow(history, movesRows, 0)}
                {this.renderHistoryStepRow(history, movesRows, 1)}
            </tbody>

        let status;
        let statusClass;
        if (winner) {
            status = "Winner: " + winner.side;
            statusClass = winner.class
        } else if(gameOver) {
            status = "Game is a Draw";
            statusClass = ""
        } else {
            status = "Next player: " + this.state.currentPlayer.side;
            statusClass = this.state.currentPlayer.class;
        }

        return (
            <div className="game">
                <div className="game-board large">
                    <div className={"game-status " + statusClass}>{status}</div>
                    <Board
                        isGameOver={gameOver || winner}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="history-tab">
                    <div className={"time-travel"}>{"Time travel"}</div>
                    <table className="history-table">{moves}</table>
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
            return getPlayerBySide(squares[a]);
        }
    }
    return null;
}

function isGameOver(squares) {

    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            return false;
        }
    }
    return true;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
