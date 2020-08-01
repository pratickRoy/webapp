import React from "react";
import CssHelper from "../../utils/CssHelper";
import {SingleGameSessionStatus} from "../SingleGameSession";
import Player from "../commons/Player";

interface PlayGameStatusProps {
    status: SingleGameSessionStatus;
    currentPlayer: Player;
    winner: Player | undefined;
}

interface PlayGameStatusState {

}

export default class PlayGameStatus extends React.Component<PlayGameStatusProps, PlayGameStatusState> {

    private static defaultCssClasses : string[] = ["game-status"]

    render() {

        let statusDesc;
        let statusClass;
        if (this.props.winner) {
            statusDesc = "Winner: " + this.props.winner.side;
            statusClass = this.props.winner.styleClass
        } else if(!this.props.winner && this.props.status == SingleGameSessionStatus.COMPLETED) {
            statusDesc = "Game is a Draw";
            statusClass = ""
        } else {
            statusDesc = "Next player: " + this.props.currentPlayer.side;
            statusClass = this.props.currentPlayer.styleClass;
        }

        return (
            <div className={CssHelper.getCssClassName(PlayGameStatus.defaultCssClasses, statusClass)}>
                {statusDesc}
            </div>
        )
    }
}