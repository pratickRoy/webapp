import Player from "./commons/Player";
import {SingleGameMoveData} from "./SingleGameMoveData";

export enum SingleGameSessionStatus {
    IN_PROGRESS,
    COMPLETED
}

export default class SingleGameSession {

    private players = {

        PLAYER_1: new Player("X", "player-1"),
        PLAYER_2: new Player("O", "player-2")
    }

    private history: SingleGameMoveData[]
    private moveNumber: number;
    private currentPlayer: Player

    constructor(currentPlayer? : Player) {

        this.history = [new SingleGameMoveData(
            Array(9).fill(null),
            undefined,
            SingleGameSessionStatus.IN_PROGRESS
        )];
        this.moveNumber = 0;
        this.currentPlayer = currentPlayer ?? this.getStartingPlayer()
    }

    getCurrentPlayer() : Player {

        return this.currentPlayer;
    }

    getCurrentMoveDetails() : SingleGameMoveData{

        return this.getGameSessionHistory()[this.moveNumber];
    }

    getGameSessionHistory() : SingleGameMoveData[] {

        return this.history.slice();
    }

    captureSquare(squareId : number) {

        const history = this.history.slice(0, this.moveNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (current.winner || SingleGameSession.isSquareAlreadyCaptured(squareId, squares)) {
            return;
        }

        squares[squareId] = this.currentPlayer
        const winner: Player | undefined = SingleGameSession.evaluateWinner(squares)
        const status: SingleGameSessionStatus = (winner || SingleGameSession.areAllSquaresCaptured(squares))
            ? SingleGameSessionStatus.COMPLETED
            : SingleGameSessionStatus.IN_PROGRESS

        // Update State
        this.history = history.concat([new SingleGameMoveData(
            squares,
            winner,
            status
        )]);
        this.moveNumber = history.length;
        this.currentPlayer = this.getNextPlayer(this.currentPlayer);
    }

    timeTravelTo(moveNumber: number) {

        // Update State
        this.moveNumber = moveNumber;
        this.currentPlayer = this.getPlayerByMove(moveNumber + 1)
    }

    private getStartingPlayer() : Player {
        return this.players.PLAYER_1;
    }

    private getNextPlayer(currentPlayer : Player) : Player {

        if (currentPlayer === this.players.PLAYER_1) {
            return this.players.PLAYER_2;
        } else if (currentPlayer === this.players.PLAYER_2) {
            return this.players.PLAYER_1;
        }
        throw "Illegal Argument";
    }

    private getPlayerByMove(moveNumber : number) : Player {

        if (moveNumber % 2 === 0) {
            return this.players.PLAYER_2;
        }
        return this.players.PLAYER_1;
    }

    private static isSquareAlreadyCaptured(squareId: number, squares: (Player | undefined)[]) : boolean {

        return !!squares[squareId];
    }

    private static areAllSquaresCaptured(squares: (Player | undefined)[]) : boolean {

        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) {
                return false;
            }
        }
        return true;
    }

    private static evaluateWinner(squares: (Player | undefined)[]) : Player | undefined {

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
    }
}