import React from "react";
import Square from "./Square";
import CssHelper from "../../utils/CssHelper";
import _ from 'underscore'
import Player from "./Player";
const HashSet = require('hashset');

interface BoardProps {
    squares: (Player | undefined)[];
    boardStyleList?: BoardStyle[];
    onBoardSquareClick(squareId: number) : void;
}

interface BoardState {

}

export enum BoardStyle {
    SMALL = "small",
    NORMAL = "",
    GAME_OVER = "game-over"
}

export default class Board extends React.Component<BoardProps, BoardState> {

    private static defaultBoardRowCssList : string[] = ["board-row"]

    private static boardRowSupportedStyles = new HashSet(
        BoardStyle.SMALL,
        BoardStyle.NORMAL
    )

    private static boardSquareSupportedStyles = new HashSet(
        BoardStyle.SMALL,
        BoardStyle.NORMAL,
        BoardStyle.GAME_OVER
    )

    render() {

        const boardRowCssName: string = CssHelper.getCssClassName(
            Board.defaultBoardRowCssList,
            this.getBoardRowCssNameFromBoardStyle()
        )
        const boardSquareCssName: string = CssHelper.getCssClassName(
            this.getBoardSquareCssNameFromBoardStyle()
        )

        return (
            <div>{
                _.range(0, 3)
                    .map((value, index) => {
                        return this.renderBoardRow(index, boardRowCssName, boardSquareCssName)
                    })
            }</div>
        );
    }

    private renderBoardRow(rowId: number, boardRowCssName: string, boardSquareCssName: string) {

        return (
            <div className={boardRowCssName}>{
                _.range(0, 3)
                    .map((value, index) => {
                        return this.renderSquare((3 * rowId) + index, boardSquareCssName)
                    })
            }</div>
        )
    }

    private renderSquare(squareId: number, boardSquareCssName: string) {

        const owningPlayer = this.props.squares[squareId];
        return (
            <Square
                additionalCssClasses={[boardSquareCssName, owningPlayer?.styleClass]}
                value={owningPlayer?.side}
                onClick={() => this.props.onBoardSquareClick(squareId)}
            />
        );
    }

    private getBoardRowCssNameFromBoardStyle() : string {

        return this.props.boardStyleList
            ?.filter(value => Board.boardRowSupportedStyles.contains(value))
            ?.join(" ") ?? ""
    }

    private getBoardSquareCssNameFromBoardStyle() : string {

        return this.props.boardStyleList
            ?.filter(value => Board.boardSquareSupportedStyles.contains(value))
            ?.join(" ") ?? ""
    }
}