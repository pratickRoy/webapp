import React from "react";
import Modal from "../../tictactoe/commons/Modal";
import CssHelper from "../../utils/CssHelper";
import ReactPlayer from "react-player";
import '../../index.scss'
import './landing.scss'
import {GAevent} from "../../index";
import $ from "jquery";
import SmoothScrollUtils from "../../utils/SmoothScrollUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// @ts-ignore
import {AwesomeButton} from "react-awesome-button";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Fab} from "@material-ui/core";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";

interface LandingFragmentStoryModalProps {
    showModal: boolean;
    notifyIntroCompleted(): void;
}

interface LandingFragmentStoryModalState {
    storyPlaying: boolean
    playerWidth: number
    playerHeight: number
}


export default class LandingFragmentStoryModal extends React.Component<LandingFragmentStoryModalProps, LandingFragmentStoryModalState> {

    private static defaultHeaderCssClasses : string[] = ["mvp-intro-header"]
    private storyPlayer: ReactPlayer | null = null;

    constructor(props: LandingFragmentStoryModalProps) {
        super(props);
        const screenDimensions = this.getIdealScreenDimensions();
        this.state = {
            storyPlaying: false,
            playerWidth: screenDimensions.playerWidth,
            playerHeight: screenDimensions.playerHeight
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateIdealScreenDimensions.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateIdealScreenDimensions.bind(this));
    }

    render() {

        const activatedDeactivatedClass = this.props.showModal
            ? "activated"
            : "deactivated";

        return (

            <Modal modalStyleClasses={["prw-landing-fragment-story-modal", activatedDeactivatedClass]}>
                <div className={"prw-landing-fragment-story-modal-content " + activatedDeactivatedClass}>
                    <ReactPlayer
                        ref={player => { this.storyPlayer = player }}
                        url='https://www.youtube.com/watch?v=RQ7u64uSsVY&ab_channel=PratickRoy'
                        controls={true}
                        width={this.state.playerWidth}
                        height={this.state.playerHeight}
                        playing={this.state.storyPlaying}
                        onPlay={() => { this.setState({storyPlaying: true}) }}
                        onPause={() => { this.setState({storyPlaying: false}) }}
                    />
                    <div className={"prw-landing-fragment-story-modal-close-wrapper"}>
                        <a
                            className={"prw-landing-fragment-story-modal-close"}
                            onClick={() => {
                                this.setState({storyPlaying: false})
                                this.props.notifyIntroCompleted()}
                            }>
                            X
                        </a>
                    </div>
                    <div id={"prw-landing-fragment-story-modal-jump-controller"}>
                        <AwesomeButton
                            disabled={!this.state.storyPlaying}
                            onPress={() => {
                                this.storyPlayer!.seekTo(0, "seconds")
                            }}
                            size="small">
                            Intro
                        </AwesomeButton>
                        <AwesomeButton
                            disabled={!this.state.storyPlaying}
                            onPress={() => {this.storyPlayer!.seekTo(72, "seconds")}}
                            size="small">
                            The Story I - Context
                        </AwesomeButton>
                        <AwesomeButton
                            disabled={!this.state.storyPlaying}
                            onPress={() => {this.storyPlayer!.seekTo(238, "seconds")}}
                            size="small">
                            The Story II - Problem
                        </AwesomeButton>
                        <AwesomeButton
                            disabled={!this.state.storyPlaying}
                            onPress={() => {this.storyPlayer!.seekTo(350, "seconds")}}
                            size="small">
                            The Story III - Solution
                        </AwesomeButton>
                        <AwesomeButton
                            disabled={!this.state.storyPlaying}
                            onPress={() => {this.storyPlayer!.seekTo(420, "seconds")}}
                            size="small">
                            Outro
                        </AwesomeButton>
                    </div>
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