import './tictactoe.scss';
import React from "react";
import PlayGameTab from "./playgame/PlayGameTab";
import TimeTravelTab from "./timetravel/TimeTravelTab";
import GameSession from "./GameSession";
import GameSeriesSummaryModal from "./GameSeriesSummaryModal";
import GameSetupModal from "./GameSetupModal";
import TicTacToeToast, {ToastType} from "./commons/TicTacToeToast";
import NavBar from "../NavBar";

interface GameProps {
    startGame: boolean
}

interface GameState {
    gameSession: GameSession
    toastType: ToastType
    showToast: boolean
    toastText: string
}

export default class Game extends React.Component<GameProps, GameState> {

    constructor(props : GameProps) {
        super(props);
        this.state = {
            gameSession: new GameSession(),
            toastType: ToastType.ERROR,
            showToast: false,
            toastText: ""
        };
    }

    render() {

        if (!this.props.startGame) {
            return null;
        }

        return (
            <div id="ttt-game" className="game">
                <GameSetupModal
                    showModal={!this.state.gameSession.isGameSessionSetup}
                    onGameSetupConfigurationsSubmit={(numberOfGames) => {this.setupGameConfigurations(numberOfGames)}}
                    showToast={((toastType, toastText) => this.showToast(toastType, toastText))}
                />
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
                <TicTacToeToast
                    toastType={this.state.toastType}
                    showToast={this.state.showToast}
                    toastText={this.state.toastText}
                    notifyToastShown={() => this.hideToast()}>
                </TicTacToeToast>
            </div>
        );
    }

    private setupGameConfigurations(numberOfGames : number) {
        this.state.gameSession.setupGameSession(numberOfGames);
        this.refreshState();
    }

    private captureSquare(squareId: number) {

        this.state.gameSession.captureSquare(squareId);
        this.refreshState();
    }

    private timeTravelTo(moveNumber: number) {

        this.state.gameSession.timeTravelTo(moveNumber);
        this.refreshState();
    }

    private playNextGame() {
        this.state.gameSession.initiateNextGameInSession();
        this.refreshState();
    }

    private finishGameSeries() {
        this.state.gameSession.finishGameSession();
        this.refreshState();
    }

    private playNextGameSeries() {
        this.setState({ gameSession: new GameSession() })
    }

    private showToast(toastType : ToastType, toastText : string) {
        this.setState({
            toastType: toastType,
            showToast: true,
            toastText: toastText
        })
    }

    private hideToast() {
        this.setState({
            showToast: false,
        })
    }

    refreshState() {
        this.setState({ gameSession: this.state.gameSession })
    }
}