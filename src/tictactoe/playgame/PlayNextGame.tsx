import React from "react";
import CssHelper from "../../utils/CssHelper";

interface PlayNextGameProps {
    playNextGameStyleList?: PlayNextGameStyle[];
    onNextGameClick() : void
}

interface PlayNextGameState {

}

export enum PlayNextGameStyle {
    TTT_HIDDEN = "ttt-hidden",
}

export default class PlayNextGame extends React.Component<PlayNextGameProps, PlayNextGameState> {

    private static defaultCssClasses : string[] = ["play-next-game-button"]

    render() {

        return (
            <button
                className={
                    CssHelper.getCssClassName(
                        PlayNextGame.defaultCssClasses,
                        this.getCssNameFromPlayNextGameStyleList()
                    )
                }
                onClick={() => this.props.onNextGameClick()}>
                Play Next
            </button>
        )
    }

    private getCssNameFromPlayNextGameStyleList() : string {

        return this.props.playNextGameStyleList
            ?.join(" ") ?? ""
    }
}