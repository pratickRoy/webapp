import React from "react";
import CssHelper from "../../utils/CssHelper";
import TimeTravelStep, {TimeTravelStepStyle} from "./TimeTravelStep";
import {SingleGameMoveData} from "../SingleGameMoveData";

interface TimeTravelTabProps {
    history: SingleGameMoveData[];
    onTimeTravelStepButtonClick(gameMoveNumber : number): void;
}

interface TimeTravelTabState {

}

export default class TimeTravelTab extends React.Component<TimeTravelTabProps, TimeTravelTabState> {

    private static defaultCssClasses : string[] = ["time-travel-tab"]
    private static defaultTimeTravelStepsCssClasses : string[] = ["time-travel-steps"]

    render() {

        const steps = this.props.history.map((move, moveNumber) => {

            const gameMoveNumber = moveNumber;
            const timeTravelStepStyleList = this.props.history[gameMoveNumber].status
                ? [TimeTravelStepStyle.GAME_OVER]
                : [];

            return (
                <TimeTravelStep
                    timeTravelStepStyleList={timeTravelStepStyleList}
                    squares={this.props.history[gameMoveNumber].squares}
                    timeTravelStepNumber={gameMoveNumber}
                    onTimeTravelStepButtonClick={() => this.props.onTimeTravelStepButtonClick(gameMoveNumber)}
                />
            )

        });

        return (
            <div className={CssHelper.getCssClassName(TimeTravelTab.defaultCssClasses)}>
                <div id="time-travel-label">{"Time travel"}</div>
                <div className={CssHelper.getCssClassName(TimeTravelTab.defaultTimeTravelStepsCssClasses)}>
                    {steps}
                </div>
            </div>
        )
    }
}