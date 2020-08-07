import React from "react";
import CssHelper from "../../utils/CssHelper";
import PlayGameStatus from "./PlayGameStatus";
import Board, {BoardStyle} from "../commons/Board";
import {SingleGameMoveData} from "../SingleGameMoveData";
import {SingleGameSessionStatus} from "../SingleGameSession";
import Player from "../commons/Player";
import PlayGameScore from "./PlayGameScore";
import PlayNextGame, {PlayNextGameStyle} from "./PlayNextGame";
import FinishGameSeries, {FinishGameSeriesStyle} from "./FinishGameSeries";

interface PlayGameTabProps {
    singleGameMoveData: SingleGameMoveData;
    currentPlayer: Player;
    playerToPlayerScoreMap: Map<Player, number>;
    isLastGameInSeries: boolean;
    onGameBoardSquareClick(squareId: number) : void
    onNextGameClick() : void
    onFinishGameSeriesClick() : void
}

interface PlayGameTabState {

}

export default class PlayGameTab extends React.Component<PlayGameTabProps, PlayGameTabState> {

    // Game Board
    private static defaultGameBoardCssClasses: string[] = ["game-board", "large"]

    render() {

        const boardStyleList = (this.props.singleGameMoveData.status == SingleGameSessionStatus.COMPLETED)
            ? [BoardStyle.GAME_OVER]
            : [];

        return (
            <div>
                <div className={CssHelper.getCssClassName(PlayGameTab.defaultGameBoardCssClasses)}>
                    <PlayGameStatus
                        status={this.props.singleGameMoveData.status}
                        currentPlayer={this.props.currentPlayer}
                        winner={this.props.singleGameMoveData.winner}
                    />
                    <Board
                        boardStyleList={boardStyleList}
                        squares={this.props.singleGameMoveData.squares}
                        onBoardSquareClick={(squareId) => this.props.onGameBoardSquareClick(squareId)}
                    />
                    <PlayGameScore
                        playerToPlayerScoreMap={this.props.playerToPlayerScoreMap}
                    />
                    <PlayNextGame
                        playNextGameStyleList={
                            !this.props.isLastGameInSeries &&
                                this.props.singleGameMoveData.status === SingleGameSessionStatus.COMPLETED
                                    ? []
                                    : [PlayNextGameStyle.TTT_HIDDEN]
                        }
                        onNextGameClick={() => this.props.onNextGameClick()}>
                    </PlayNextGame>
                    <FinishGameSeries
                        finishGameSeriesStyleList={
                            this.props.isLastGameInSeries &&
                                this.props.singleGameMoveData.status === SingleGameSessionStatus.COMPLETED
                                    ? []
                                    : [FinishGameSeriesStyle.TTT_HIDDEN]
                        }
                        onFinishGameSeriesClick={() => this.props.onFinishGameSeriesClick()}>
                    </FinishGameSeries>
                </div>
            </div>
        )
    }
}