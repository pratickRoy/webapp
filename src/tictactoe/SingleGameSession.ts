import Player from "./commons/Player";
import {SingleGameMoveData} from "./SingleGameMoveData";
import {GameSessionPlayerID} from "./GameSession";

export enum SingleGameSessionStatus {
    IN_PROGRESS,
    COMPLETED
}

export default class SingleGameSession {

    private playerIDToPlayerMap : Map<GameSessionPlayerID, Player>;
    private history: SingleGameMoveData[]
    private moveNumber: number;
    private currentPlayer: Player

    constructor(players: Map<GameSessionPlayerID, Player>,
                startingPlayer?: Player) {

        this.playerIDToPlayerMap = players;
        this.moveNumber = 0;
        this.currentPlayer = startingPlayer ?? this.getDefaultStartingPlayer()
        this.history = [new SingleGameMoveData(
            Array(9).fill(null),
            this.currentPlayer,
            undefined,
            SingleGameSessionStatus.IN_PROGRESS
        )];
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
        this.currentPlayer = this.getNextPlayer(this.currentPlayer);
        this.history = history.concat([new SingleGameMoveData(
            squares,
            this.currentPlayer,
            winner,
            status
        )]);
        this.moveNumber = history.length;
    }

    timeTravelTo(moveNumber: number) {

        // Update State
        this.moveNumber = moveNumber;
        this.currentPlayer = this.history[moveNumber].movePlayer
    }

    private getDefaultStartingPlayer() : Player {
        return this.playerIDToPlayerMap.values().next().value;
    }

    private getNextPlayer(currentPlayer : Player) : Player {

        if (currentPlayer === this.playerIDToPlayerMap.get(GameSessionPlayerID.PLAYER_1)) {
            return this.playerIDToPlayerMap.get(GameSessionPlayerID.PLAYER_2)!;
        } else if (currentPlayer === this.playerIDToPlayerMap.get(GameSessionPlayerID.PLAYER_2)) {
            return this.playerIDToPlayerMap.get(GameSessionPlayerID.PLAYER_1)!;
        }
        throw "Illegal Argument";
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