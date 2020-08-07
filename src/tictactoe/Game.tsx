import './tictactoe.scss';
import React from "react";
import PlayGameTab from "./playgame/PlayGameTab";
import TimeTravelTab from "./timetravel/TimeTravelTab";
import GameSession from "./GameSession";
import GameSeriesSummaryModal from "./GameSeriesSummaryModal";

interface GameProps {

}

interface GameState {
    gameSession: GameSession
}

export default class Game extends React.Component<GameProps, GameState> {

    constructor(props : GameProps) {
        super(props);
        this.state = {
            gameSession: new GameSession()
        };
    }

    render() {

        return (
            <div id="ttt-game" className="game">
                <PlayGameTab
                    singleGameMoveData={this.state.gameSession.getCurrentMoveDetails()}
                    currentPlayer={this.state.gameSession.getCurrentPlayer()}
                    playerToPlayerScoreMap={this.state.gameSession.getPlayerToPlayerScoreMap()}
                    isLastGameInSeries={this.state.gameSession.isLastGameInSession}
                    onGameBoardSquareClick={(i) => this.captureSquare(i)}
                    onNextGameClick={() => this.playNextGame()}
                    onFinishGameSeriesClick={() => this.finishGameSeries()}
                />
                <TimeTravelTab
                    history={this.state.gameSession.getGameSessionHistory()}
                    onTimeTravelStepButtonClick={(gameMoveNumber) => this.timeTravelTo(gameMoveNumber)}
                />
                <GameSeriesSummaryModal
                    playerToPlayerScoreMap={this.state.gameSession.getPlayerToPlayerScoreMap()}
                    showModal={this.state.gameSession.isGameSessionCompleted}
                    onNextGameSeriesClick={() => this.playNextGameSeries()}
                />
            </div>
        );
    }

    captureSquare(squareId: number) {

        this.state.gameSession.captureSquare(squareId);
        this.refreshState();
    }

    timeTravelTo(moveNumber: number) {

        this.state.gameSession.timeTravelTo(moveNumber);
        this.refreshState();
    }

    playNextGame() {
        this.state.gameSession.initiateNextGameInSession();
        this.refreshState();
    }

    finishGameSeries() {
        this.state.gameSession.finishGameSession();
        this.refreshState();
    }

    private playNextGameSeries() {
        this.setState({ gameSession: new GameSession() })
    }

    refreshState() {
        this.setState({ gameSession: this.state.gameSession })
    }
}