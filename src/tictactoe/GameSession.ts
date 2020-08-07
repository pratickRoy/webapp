import Player from "./commons/Player";
import {SingleGameMoveData} from "./SingleGameMoveData";
import SingleGameSession from "./SingleGameSession";

export enum GameSessionPlayerID {
    PLAYER_1,
    PLAYER_2
}

export default class GameSession {

    private readonly playerIDToPlayerMap : Map<GameSessionPlayerID, Player>;
    private readonly singleGameSessionList: SingleGameSession[]

    private playerIDToPlayerScoreMap : Map<GameSessionPlayerID, number>;

    private currentSingleGameSessionId: number
    private currentSingleGameSession: SingleGameSession
    private _isLastGameInSession: boolean
    private _isGameSessionCompleted: boolean

    constructor() {

        this.playerIDToPlayerMap = new Map([
            [GameSessionPlayerID.PLAYER_1, new Player("P1", "X", "player-1")],
            [GameSessionPlayerID.PLAYER_2, new Player("P2", "O", "player-2")]
        ]);
        this.singleGameSessionList = [
            new SingleGameSession(this.playerIDToPlayerMap, this.playerIDToPlayerMap.get(GameSessionPlayerID.PLAYER_1)),
            new SingleGameSession(this.playerIDToPlayerMap, this.playerIDToPlayerMap.get(GameSessionPlayerID.PLAYER_2)),
            new SingleGameSession(this.playerIDToPlayerMap, this.playerIDToPlayerMap.get(GameSessionPlayerID.PLAYER_1)),
            new SingleGameSession(this.playerIDToPlayerMap, this.playerIDToPlayerMap.get(GameSessionPlayerID.PLAYER_2))
        ];
        this.playerIDToPlayerScoreMap = new Map([
            [GameSessionPlayerID.PLAYER_1, 0],
            [GameSessionPlayerID.PLAYER_2, 0]
        ]);

        this.currentSingleGameSessionId = 0;
        this.currentSingleGameSession = this.singleGameSessionList[this.currentSingleGameSessionId];
        this._isLastGameInSession = false;
        this._isGameSessionCompleted = false;
    }

    get isLastGameInSession(): boolean {
        return this._isLastGameInSession;
    }

    get isGameSessionCompleted(): boolean {
        return this._isGameSessionCompleted;
    }

    getCurrentPlayer() : Player {

        return this.currentSingleGameSession.getCurrentPlayer();
    }

    getCurrentMoveDetails() : SingleGameMoveData{

        return this.currentSingleGameSession.getCurrentMoveDetails();
    }

    getGameSessionHistory() : SingleGameMoveData[] {

        return this.currentSingleGameSession.getGameSessionHistory();
    }

    // Generalize
    getPlayerToPlayerScoreMap() : Map<Player, number> {

        return new Map([
            [
                this.playerIDToPlayerMap.get(GameSessionPlayerID.PLAYER_1)!,
                this.playerIDToPlayerScoreMap.get(GameSessionPlayerID.PLAYER_1)!
            ],
            [
                this.playerIDToPlayerMap.get(GameSessionPlayerID.PLAYER_2)!,
                this.playerIDToPlayerScoreMap.get(GameSessionPlayerID.PLAYER_2)!
            ]
        ]);
    }

    captureSquare(squareId : number) : void {

        this.currentSingleGameSession.captureSquare(squareId);

    }

    timeTravelTo(moveNumber: number) : void {

        this.currentSingleGameSession.timeTravelTo(moveNumber);
    }

    // Todo : Clean
    initiateNextGameInSession() {

        if (this.currentSingleGameSessionId == this.singleGameSessionList.length - 1) {
            alert("Series Over. Start New Series")
            return
        }
        this.updateScore();
        this.currentSingleGameSession = this.singleGameSessionList[++this.currentSingleGameSessionId];
        this._isLastGameInSession = this.currentSingleGameSessionId == this.singleGameSessionList.length - 1;
    }

    finishGameSession() {
        this.updateScore();
        this._isGameSessionCompleted = true;
    }

    private updateScore() {
        const winner = this.currentSingleGameSession.getCurrentMoveDetails().winner;
        if (winner === this.playerIDToPlayerMap.get(GameSessionPlayerID.PLAYER_1)) {
            this.playerIDToPlayerScoreMap.set(
                GameSessionPlayerID.PLAYER_1,
                this.playerIDToPlayerScoreMap.get(GameSessionPlayerID.PLAYER_1)! + 1
            );
        } else if (winner === this.playerIDToPlayerMap.get(GameSessionPlayerID.PLAYER_2)) {
            this.playerIDToPlayerScoreMap.set(
                GameSessionPlayerID.PLAYER_2,
                this.playerIDToPlayerScoreMap.get(GameSessionPlayerID.PLAYER_2)! + 1
            );
        }
    }
}