import React from "react";
import Modal from "./commons/Modal";
import Player from "./commons/Player";
import CssHelper from "../utils/CssHelper";
import PlayNextGameSeries from "./playgame/PlayNextGameSeries";

interface GameSeriesSummaryModalProps {
    playerToPlayerScoreMap: Map<Player, number>;
    showModal: boolean;
    onNextGameSeriesClick() : void
}

interface GameSeriesSummaryModalState {

}

export default class GameSeriesSummaryModal extends React.Component<GameSeriesSummaryModalProps, GameSeriesSummaryModalState> {

    private static defaultHeaderCssClasses : string[] = ["ttt-modal-header"]

    render() {

        if (!this.props.showModal) {
            return null;
        }

        const winner : Player | undefined = this.getWinner();
        const headerText = winner != undefined ? "Winner : " + winner.name : "It's a Draw"

        return (

            <Modal modalStyleClasses={["ttt-modal"]}>
                <div className={"ttt-modal-content"}>
                    <div
                        className={
                            CssHelper.getCssClassName(
                                GameSeriesSummaryModal.defaultHeaderCssClasses,
                                winner?.styleClass
                            )
                        }
                    >
                        {headerText}
                    </div>
                    <PlayNextGameSeries
                        onNextGameSeriesClick={() => this.props.onNextGameSeriesClick()}>
                    </PlayNextGameSeries>
                </div>
            </Modal>
        )
    }

    getWinner() : Player | undefined {

        let winner : Player | undefined;
        let winnerScore = 0;
        this.props.playerToPlayerScoreMap.forEach(
            (score, player) => {

                if (score > winnerScore) {
                    winner = player
                    winnerScore = score
                } else if (score == winnerScore) {
                    winner = undefined;
                }
            }
        )

        return winner;
    }
}