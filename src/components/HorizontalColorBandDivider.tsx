import React from "react";
import _ from "underscore";

enum BandColors {
    turquoise = "#1abc9c",
    emerald = "#2ecc71",
    peterRiver = "#3498db",
    amethyst = "#9b59b6",
    wetAsphalt = "#34495e",
    greenSea = "#16a085",
    nephritis = "#27ae60",
    wisteria = "#8e44ad",
    midnightBlue = "#2c3e50",
    sunFlower = "#f1c40f",
    carrot = "#e67e22",
    alizarin = "#e74c3c",
    clouds = "#ecf0f1",
    concrete = "#95a5a6",
    orange = "#f39c12",
    pumpkin = "#d35400",
    pomegranate = "#c0392b",
    silver = "#bdc3c7",
    asbestos = "#7f8c8d",
    belizeHole = "#2980b9"
}

interface HorizontalColorBandDividerProps {
    className? : string
    bandCount : number
    bandColors : BandColors[]
}

interface HorizontalColorBandDividerState {
}

export default class HorizontalColorBandDivider
    extends React.Component<HorizontalColorBandDividerProps, HorizontalColorBandDividerState> {

    static defaultProps = {
        bandCount: 25,
        bandColors: Object.values(BandColors)
    }

    constructor(props: HorizontalColorBandDividerProps) {

        super(props);
        this.state = {}
    }

    render() {

        const bands = _.range(0, this.props.bandCount)
            .map((index: number) => {
                return <div style={{background: this.props.bandColors[index % this.props.bandColors.length]}}/>
            })

        return (
            <div className={this.props.className === undefined ? "" : this.props.className + " " + "prw-horizontal-color-band-divider"}>
                {bands}
            </div>
        )
    }
}