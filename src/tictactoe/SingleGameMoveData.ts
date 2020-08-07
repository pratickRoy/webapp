import Player from "./commons/Player";
import {SingleGameSessionStatus} from "./SingleGameSession";

export class SingleGameMoveData {

    private readonly _squares : (Player | undefined)[];
    private readonly _movePlayer : Player;
    private readonly _winner : Player | undefined;
    private readonly _status : SingleGameSessionStatus;

    constructor(squares : (Player | undefined)[],
                movePlayer : Player,
                winner : Player | undefined,
                status : SingleGameSessionStatus) {

        this._movePlayer = movePlayer;
        this._squares = squares;
        this._winner = winner;
        this._status = status;
    }

    get squares(): (Player | undefined)[] {
        return this._squares;
    }

    get winner(): Player | undefined {
        return this._winner;
    }

    get status(): SingleGameSessionStatus {
        return this._status;
    }

    get movePlayer(): Player {
        return this._movePlayer;
    }
}