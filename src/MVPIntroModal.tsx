import React from "react";
import Player from "./tictactoe/commons/Player";
import Modal from "./tictactoe/commons/Modal";
import CssHelper from "./utils/CssHelper";
import ReactPlayer from "react-player";
import './index.scss'
import GameSession from "./tictactoe/GameSession";
import {ToastType} from "./tictactoe/commons/TicTacToeToast";

interface MVPIntroModalProps {
    showModal: boolean;
    notifyIntroCompleted(): void;
}

interface MVPIntroModalState {
    playerWidth: number
    playerHeight: number
}


export default class MVPIntroModal extends React.Component<MVPIntroModalProps, MVPIntroModalState> {

    private static defaultHeaderCssClasses : string[] = ["mvp-intro-header"]

    constructor(props: MVPIntroModalProps) {
        super(props);
        this.state = this.getIdealScreenDimensions();
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateIdealScreenDimensions.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateIdealScreenDimensions.bind(this));
    }

    render() {

        if (!this.props.showModal) {
            return null;
        }

        return (

            <Modal modalStyleClasses={["ttt-modal"]}>
                <div className={"mvp-intro-content"}>
                    <div className={CssHelper.getCssClassName(MVPIntroModal.defaultHeaderCssClasses)}>
                        Hello World!
                    </div>
                    <div className={"mvp-intro-desc"} style={{width : this.state.playerWidth}}>
                        First of all thank you so much for visiting my website.
                        The website is still under heavy construction, and almost nothing is ready except
                        for a tic tac toe game (long story!). So while construction finishes, play a round!
                        If you want to know the long story, play the video. (Fair Warning - It could be boring.)
                        If it's boring, skip over to the game!
                    </div>
                    <ReactPlayer
                        url='https://youtu.be/T44vtrva414'
                        controls={true}
                        width={this.state.playerWidth}
                        height={this.state.playerHeight}
                    />
                    <button
                        className={"complete-mvp-intro-button"}
                        onClick={() => {this.props.notifyIntroCompleted()}}>
                        Lets Play Some Tic Tac Toe!
                    </button>
                </div>
            </Modal>
        )
    }

    updateIdealScreenDimensions() {
        this.setState(this.getIdealScreenDimensions());
    }

    // ToDo : clean
    getIdealScreenDimensions() : {playerWidth : number, playerHeight : number} {

        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;

        const widthPadding = maxWidth * (20/100);
        const heightPadding = maxHeight * (40/100);

        let screenWidth = maxWidth - widthPadding < 224 ? 224 : maxWidth - widthPadding;
        let screenHeight = maxHeight - heightPadding  < 224 ? 224 : maxHeight - heightPadding;

        return {
            playerWidth : screenWidth,
            playerHeight : screenWidth * (9/16) >= screenHeight
                ? screenHeight
                : screenWidth * (9/16)
        }
    }
}