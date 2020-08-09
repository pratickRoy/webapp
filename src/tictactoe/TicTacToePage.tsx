import React from "react";
import NavBar from "../NavBar";
import Game from "./Game";
import MVPIntroModal from "../MVPIntroModal";

interface TicTacToePageProps {
}

interface TicTacToePageState {
    introCompleted: boolean
}

export default class TicTacToePage extends React.Component<TicTacToePageProps, TicTacToePageState> {

    constructor(props: TicTacToePageProps) {
        super(props);
        this.state = {
            introCompleted : false
        }
    }

    render() {

        return (
            <React.Fragment>
                <NavBar/>
                <Game startGame={this.state.introCompleted}/>
                <MVPIntroModal
                    showModal={!this.state.introCompleted}
                    notifyIntroCompleted={() => { this.setState({introCompleted : true})}}
                />
            </React.Fragment>
        )
    }
}