import React from "react";
import NavBar from "../NavBar";
import Game from "./Game";

interface TicTacToePageProps {
}

interface TicTacToePageState {

}

export default class TicTacToePage extends React.Component<TicTacToePageProps, TicTacToePageState> {

    render() {

        return (
            <React.Fragment>
                <NavBar/>
                <Game />
            </React.Fragment>
        )
    }
}