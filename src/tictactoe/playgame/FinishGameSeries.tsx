import React from "react";
import CssHelper from "../../utils/CssHelper";

interface FinishGameSeriesProps {
    finishGameSeriesStyleList?: FinishGameSeriesStyle[];
    onFinishGameSeriesClick() : void
}

interface FinishGameSeriesState {

}

export enum FinishGameSeriesStyle {
    TTT_HIDDEN = "ttt-hidden",
}

export default class FinishGameSeries extends React.Component<FinishGameSeriesProps, FinishGameSeriesState> {

    private static defaultCssClasses : string[] = ["finish-game-series-button"]

    render() {

        return (
            <button
                className={
                    CssHelper.getCssClassName(
                        FinishGameSeries.defaultCssClasses,
                        this.getCssNameFromFinishGameSeriesStyleList()
                    )
                }
                onClick={() => this.props.onFinishGameSeriesClick()}>
                Finish Game Series
            </button>
        )
    }

    private getCssNameFromFinishGameSeriesStyleList() : string {

        return this.props.finishGameSeriesStyleList
            ?.join(" ") ?? ""
    }
}