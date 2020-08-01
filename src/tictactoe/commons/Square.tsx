import React from "react";
import CssHelper from "../../utils/CssHelper";

interface SquareProps {
    additionalCssClasses?: (string | undefined)[];
    value?: string;
    onClick() : void
}

interface SquareState {

}

export default class Square extends React.Component<SquareProps, SquareState> {

    private static defaultCssClasses : string[] = ["square"]

    render() {

        return (
            <button
                className={CssHelper.getCssClassName(Square.defaultCssClasses, this.props.additionalCssClasses)}
                onClick={this.props.onClick}>

                {this.props.value}

            </button>
        )
    }
}