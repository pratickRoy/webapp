import './tictactoe.scss';
import SingleGameSession from "./SingleGameSession";
import React from "react";
import PlayGameTab from "./playgame/PlayGameTab";
import TimeTravelTab from "./timetravel/TimeTravelTab";

interface GameProps {

}

interface GameState {
    singleGameSession: SingleGameSession
}

export default class Game extends React.Component<GameProps, GameState> {

    constructor(props : GameProps) {
        super(props);
        this.state = {
            singleGameSession: new SingleGameSession()
        };
    }

    render() {

        return (
            <div className="game">
                <PlayGameTab
                    singleGameMoveData={this.state.singleGameSession.getCurrentMoveDetails()}
                    currentPlayer={this.state.singleGameSession.getCurrentPlayer()}
                    onGameBoardSquareClick={(i) => this.onGameBoardSquareClick(i)}
                />
                <TimeTravelTab
                    history={this.state.singleGameSession.getGameSessionHistory()}
                    onTimeTravelStepButtonClick={(gameMoveNumber) => this.timeTravelTo(gameMoveNumber)}
                />
            </div>
        );
    }

    onGameBoardSquareClick(squareId: number) {

        this.state.singleGameSession.captureSquare(squareId);
        this.refreshState();
    }

    timeTravelTo(moveNumber: number) {

        this.state.singleGameSession.timeTravelTo(moveNumber);
        this.refreshState();
    }

    refreshState() {
        this.setState({ singleGameSession: this.state.singleGameSession })
    }
}