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

        console.log(this.props.showModal)
        const activatedDeactivatedClass = this.props.showModal
            ? "activated"
            : "deactivated";
        console.log(activatedDeactivatedClass)

        return (

            <Modal modalStyleClasses={["prw-landing-fragment-story-modal", activatedDeactivatedClass]}>
                <div className={"prw-landing-fragment-story-modal-content " + activatedDeactivatedClass}>
                    <ReactPlayer
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
                            x
                        </a>
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