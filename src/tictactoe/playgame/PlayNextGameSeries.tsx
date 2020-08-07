import React from "react";
import CssHelper from "../../utils/CssHelper";

interface PlayNextGameSeriesProps {
    playNextGameSeriesStyleList?: PlayNextGameSeriesStyle[];
    onNextGameSeriesClick() : void
}

interface PlayNextGameSeriesState {

}

export enum PlayNextGameSeriesStyle {
    TTT_HIDDEN = "ttt-hidden",
}

export default class PlayNextGameSeries extends React.Component<PlayNextGameSeriesProps, PlayNextGameSeriesState> {

    private static defaultCssClasses : string[] = ["play-next-game-series-button"]

    render() {

        return (
            <button
                className={
                    CssHelper.getCssClassName(
                        PlayNextGameSeries.defaultCssClasses,
                        this.getCssNameFromPlayNextGameSeriesStyleList()
                    )
                }
                onClick={() => this.props.onNextGameSeriesClick()}>
                Play Next Series
            </button>
        )
    }

    private getCssNameFromPlayNextGameSeriesStyleList() : string {

        return this.props.playNextGameSeriesStyleList
            ?.join(" ") ?? ""
    }
}