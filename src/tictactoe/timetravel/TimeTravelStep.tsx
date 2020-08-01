import React from "react";
import CssHelper from "../../utils/CssHelper";
import Board, {BoardStyle} from "../commons/Board";
import Player from "../commons/Player";
import PredicateUtils from "../../utils/PredicateUtils";

const HashSet = require('hashset');

interface TimeTravelStepProps {
    timeTravelStepStyleList?: TimeTravelStepStyle[];
    squares: (Player | undefined)[];
    timeTravelStepNumber: number;
    onTimeTravelStepButtonClick(): void
}

interface TimeTravelStepState {

}

export enum TimeTravelStepStyle {
    GAME_OVER = "game-over"
}

export default class TimeTravelStep extends React.Component<TimeTravelStepProps, TimeTravelStepState> {

    private static defaultCssClasses: string[] = ["game-board small"]

    // Time Travel Step Board
    private static defaultTimeTravelStepBoardStyleList: BoardStyle[] = [BoardStyle.SMALL]
    private static timeTravelStepBoardSupportedStyles = new HashSet(
        BoardStyle.GAME_OVER
    )
    private static timeTravelStepStyleToBoardStyleMap = new Map<TimeTravelStepStyle, BoardStyle>([
        [TimeTravelStepStyle.GAME_OVER, BoardStyle.GAME_OVER]
    ]);

    // Time Travel Step Button
    private static defaultTimeTravelStepButtonCssClasses: string[] = ["time-travel-step-btn"]

    render() {

        const timeTravelStepButtonDesc = this.props.timeTravelStepNumber
            ? "Go to Game move #" + (this.props.timeTravelStepNumber)
            : "Go to Game Start"

        return (
            <div className={CssHelper.getCssClassName(TimeTravelStep.defaultCssClasses)}>
                <Board
                    boardStyleList={this.getBoardStyleList()}
                    squares={this.props.squares}
                    onBoardSquareClick={() => {}}
                />
                <button
                    className={CssHelper.getCssClassName(TimeTravelStep.defaultTimeTravelStepButtonCssClasses)}
                    onClick={this.props.onTimeTravelStepButtonClick}>
                        {timeTravelStepButtonDesc}
                </button>
            </div>
        );
    }

    private getBoardStyleList() : BoardStyle[] {

        return TimeTravelStep.defaultTimeTravelStepBoardStyleList.concat(
            this.props.timeTravelStepStyleList
                ?.filter(value => TimeTravelStep.timeTravelStepBoardSupportedStyles.contains(value))
                ?.map(value => TimeTravelStep.timeTravelStepStyleToBoardStyleMap.get(value))
                ?.filter(PredicateUtils.notEmpty) ?? []
        );
    }
}