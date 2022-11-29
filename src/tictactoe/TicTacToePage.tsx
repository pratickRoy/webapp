import React from "react";
import Game from "./Game";
import MVPIntroModal from "../MVPIntroModal";
import {GApageView} from "../index";
import {faBook, faCode, faFeatherAlt, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import NavBar from "../NavBar";

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

    componentDidMount() {
        GApageView("builds/tictactoe");
    }

    render() {

        return (
            <React.Fragment>
                <NavBar navigationRoutes={
                    [
                        {
                            externalPageLink: "#/home/weblog",
                            displayName: "Posts",
                            faIcon: faFeatherAlt
                        },
                        {
                            externalPageLink: "#/home/builds",
                            displayName: "All Builds",
                            faIcon: faCode
                        },
                        {
                            externalPageLink: "https://drive.google.com/file/d/11mQdCVA1H39n5su4rjRmBcrF9DnOOAzy/view?usp=sharing",
                            displayName: "Resume",
                            faIcon: faBook
                        },
                        {
                            externalPageLink: "#/home/contact",
                            displayName: "Say Hi",
                            faIcon: faPaperPlane
                        },
                    ]
                } showNavigationBar={true}/>
                <Game startGame={this.state.introCompleted}/>
                <MVPIntroModal
                    showModal={!this.state.introCompleted}
                    notifyIntroCompleted={() => { this.setState({introCompleted : true})}}
                />
            </React.Fragment>
        )
    }
}