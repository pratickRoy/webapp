import React from "react";
import CssHelper from "../../utils/CssHelper";
import Player from "../commons/Player";

interface PlayGameScoreProps {
    playerToPlayerScoreMap: Map<Player, number>
}

interface PlayGameScoreState {

}

export default class PlayGameScore extends React.Component<PlayGameScoreProps, PlayGameScoreState> {

    private static defaultCssClasses : string[] = ["game-score"]
    private static defaultPlayerScoreCssClasses : string[] = ["player-score"]

    render() {

        const playerScores = Array
            .from(this.props.playerToPlayerScoreMap)
            .map(([player, score]) => {
                return (
                    <div
                        className={
                            CssHelper.getCssClassName(
                                PlayGameScore.defaultPlayerScoreCssClasses,
                                player.styleClass)
                        }
                    >
                        {score}
                    </div>
                )
            })

        return (
            <div className={CssHelper.getCssClassName(PlayGameScore.defaultCssClasses)}>
                {playerScores}
            </div>
        )
    }
}