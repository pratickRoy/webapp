import React from "react";
import CssHelper from "../../utils/CssHelper";
import PlayGameStatus from "./PlayGameStatus";
import Board, {BoardStyle} from "../commons/Board";
import {SingleGameMoveData} from "../SingleGameMoveData";
import {SingleGameSessionStatus} from "../SingleGameSession";
import Player from "../commons/Player";

interface PlayGameTabProps {
    singleGameMoveData: SingleGameMoveData;
    currentPlayer: Player
    onGameBoardSquareClick(squareId: number) : void
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
                </div>
            </div>
        )
    }
}