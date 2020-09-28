import React from "react";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import HorizontalColorBandDivider from "../../components/HorizontalColorBandDivider";
import _ from "underscore";
import $ from "jquery";
import SmoothScrollUtils from "../../utils/SmoothScrollUtils";
import "./landing.scss"
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-eric.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import ReactResizeDetector from "react-resize-detector";
import ReactTooltip from "react-tooltip";
import {GAevent, GApageView} from "../../index";
import LandingFragmentDisplayImage from "./assets/landing-fragment-display-image.jpg"
import {faChrome} from "@fortawesome/free-brands-svg-icons";
import {ToastOptions} from "react-toastify/dist/types";
import {toast} from "react-toastify";
import MVPIntroModal from "../../MVPIntroModal";
import LandingFragmentStoryModal from "./LandingFragmentStoryModal";
import ToastUtils from "../../utils/ToastUtils";

interface LandingFragmentProps {
    landingFragmentId : string
    isFragmentActive : boolean
    navigationRoutes : { id : string, displayName : string, faIcon : IconDefinition }[]
}

interface LandingFragmentState {
    height? : string
    isFragmentActivated : boolean,
    showStoryModal : boolean
}

export default class LandingFragment extends React.Component<LandingFragmentProps, LandingFragmentState> {

    private static DEFAULT_LANDING_FRAGMENT_ID = "prw-landing-fragment";
    private static ON_LOAD_ANIMATION_TIME_DURATION_IN_MILLIS = 6000;
    private static readonly LANDING_TOAST_OPTIONS : ToastOptions = {
        className: "prw-toast",
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true
    }
    private static readonly LANDING_TOAST_ID = {
        BROWSER_COMPATIBILITY : "landing-fragment-browser-compatibility-toast",
        WEBSITE_STORY : "landing-fragment-website-story-toast"
    }

    static defaultProps = {
        landingFragmentId: LandingFragment.DEFAULT_LANDING_FRAGMENT_ID,
    }

    constructor(props: LandingFragmentProps) {
        super(props);
        this.state = {
            isFragmentActivated : false,
            showStoryModal : false,
        }
    }

    /**
     * On Fragment Load, we prevent scrolling until animation completes, allowing user to properly experience the ux.
     */

    componentDidUpdate(prevProps: Readonly<LandingFragmentProps>, prevState: Readonly<LandingFragmentState>, snapshot?: any) {

        if (!prevProps.isFragmentActive && this.props.isFragmentActive) {
            GApageView("home/landing");
        }
        if (prevProps.isFragmentActive && !this.props.isFragmentActive) {
            toast.dismiss(LandingFragment.LANDING_TOAST_ID.BROWSER_COMPATIBILITY);
            toast.dismiss(LandingFragment.LANDING_TOAST_ID.WEBSITE_STORY);
        }

        if (this.props.isFragmentActive) {
            if (!this.state.isFragmentActivated) {

                GAevent("LandingFragment", "Activated Fragment")
                this.setState({isFragmentActivated: true})

                const fragment : Element = document.querySelector(this.props.landingFragmentId)!;
                setTimeout(
                    () => {
                        enableBodyScroll(fragment);
                        $(".prw-landing-fragment").css('pointer-events', 'auto');
                        toast.error(
                            <p>
                                As of now, I have only tested this website in Chrome.
                                <b> If possible please use chrome. </b>
                                I Will make it compatible with other browsers in the future.
                            </p>,
                            ToastUtils.buildToastOptions(
                                LandingFragment.LANDING_TOAST_OPTIONS,
                                LandingFragment.LANDING_TOAST_ID.BROWSER_COMPATIBILITY
                            )
                        );
                        toast.dark(
                            <p>
                                Want to see the Story behind the Website? Click on the DP :)
                            </p>,
                            ToastUtils.buildToastOptions(
                                LandingFragment.LANDING_TOAST_OPTIONS,
                                LandingFragment.LANDING_TOAST_ID.WEBSITE_STORY
                            )
                        );
                    },
                    LandingFragment.ON_LOAD_ANIMATION_TIME_DURATION_IN_MILLIS
                );
                disableBodyScroll(fragment);
            }
        }
    }

    render() {

        const landing = this.state.isFragmentActivated
            ? (<div id={this.props.landingFragmentId}
                    className={"prw-landing-fragment"}
                    style={this.state.height == undefined ? {} : {height: this.state.height}}>
                <div id={"prw-landing-fragment-background"}
                     style={this.state.height == undefined ? {} : {height: this.state.height}}/>
                <div id={"prw-landing-fragment-background-overlay"}
                     style={this.state.height == undefined ? {} : {height: this.state.height}}/>
                <ReactResizeDetector handleHeight>
                    {(dimensions : any) => {

                        // ToDo Hack Fix;
                        if (dimensions.height != undefined) {

                            const height = LandingFragment.getHeight($("#prw-landing-fragment-content")[0])
                                + LandingFragment.getHeight($("#prw-landing-fragment-navbar")[0])
                                + LandingFragment.getHeight($(".prw-landing-fragment-bottom-decoration")[0]);

                            const windowTop = 0;
                            const windowBottom = window.innerHeight || document.documentElement.clientHeight;
                            const windowHeight = windowBottom - windowTop

                            if (height > windowHeight && this.state.height != height + "px") {
                                this.setState({height : height  + "px"})
                            } else if (height <= windowHeight && this.state.height != "100vh") {
                                this.setState({height : "100vh"})
                            }
                        }

                        return (
                            <React.Fragment>
                                <div id={"prw-landing-fragment-content"}>
                                    <img
                                        id={"prw-landing-fragment-content-display-image"}
                                        src={LandingFragmentDisplayImage}
                                        onClick={() => {
                                            toast.dismiss(LandingFragment.LANDING_TOAST_ID.BROWSER_COMPATIBILITY);
                                            toast.dismiss(LandingFragment.LANDING_TOAST_ID.WEBSITE_STORY);
                                            disableBodyScroll(document.querySelector(this.props.landingFragmentId)!);
                                            this.setState({
                                                showStoryModal : true}
                                            )}
                                        }
                                    />
                                    <div className="prw-landing-fragment-content-display-image-pulse"/>
                                    <div className="prw-landing-fragment-content-display-image-pulse"/>
                                    <div className="prw-landing-fragment-content-display-image-pulse"/>
                                    <div id={"prw-landing-fragment-content-body"}>
                                        <h1>Pratick Roy</h1>
                                        <h2>{"Aspiring "}
                                            <span className={"prw-link"}
                                                  data-tip
                                                  data-for="eudaimonistTip"
                                                  data-event='mouseover click'
                                                  data-event-off='mouseout'>
                                               Eudaimonist
                                            </span>
                                        </h2>
                                        <ReactTooltip
                                            id="eudaimonistTip"
                                            clickable={true}
                                            type={"light"}
                                            className={"prw-tooltip"}
                                            delayHide={500}
                                            multiline={true}
                                            afterShow={() => {
                                                GAevent(
                                                "LandingFragment",
                                                "Eudaimonist Tooltip Engaged"
                                            )}}>

                                            This is one of those concepts that doesn't lend itself to easy explanation.<br/>
                                            Someday, I'll develop the skill to be able to explain it by my own words.<br/>
                                            Till then, click&nbsp;
                                            <a
                                                onClick={() => {
                                                    GAevent(
                                                        "LandingFragment",
                                                        "Eudaimonist Crash Course Video Engaged"
                                                    )
                                                }}
                                                href={"https://youtu.be/PrvtOWEXDIQ"}
                                                target="_blank">

                                                here
                                            </a>
                                            &nbsp;for a crash course video on the topic by hank green. :)<br/>

                                        </ReactTooltip>
                                    </div>
                                </div>
                                <div id="prw-landing-fragment-navbar">
                                    {
                                        _.map(this.props.navigationRoutes, ({id, displayName, faIcon}) => {
                                            return this.getNavigationButton(id, displayName, faIcon);
                                        })
                                    }
                                </div>
                                <HorizontalColorBandDivider className={"prw-landing-fragment-bottom-decoration"}/>
                            </React.Fragment>
                        );
                    }}
                </ReactResizeDetector>
                <LandingFragmentStoryModal
                    showModal={this.state.showStoryModal}
                    notifyIntroCompleted={() => {
                        setTimeout(() => {
                            enableBodyScroll(document.querySelector(this.props.landingFragmentId)!)
                        }, 2000);
                        this.setState({showStoryModal: false}) }
                    }
                />
            </div>)
            : (<div id={this.props.landingFragmentId}
                    className={"prw-landing-fragment"}
                    style={this.state.height == undefined ? {} : {height: this.state.height}}/>);

        return (landing)
    }

    private getNavigationButton(id: string, displayName: string, faIcon: IconDefinition) {

        const displayNameSpanId = id + "-navigation-button-full-text";
        const hiddenClass = "prw-animated-text-hidden";
        const visibleClass = "prw-animated-text-visible";

        return (
            <div
                onMouseOver={() => { $("#" + displayNameSpanId).removeClass(hiddenClass).addClass(visibleClass) }}
                onMouseOut={() => { $("#" + displayNameSpanId).addClass(hiddenClass).removeClass(visibleClass) }}
            >
                <AwesomeButton
                    size={"small"}
                    onReleased={() => {
                        GAevent(
                            "LandingFragment",
                            "Fragment Navigation Button Engaged",
                            displayName
                        )
                        $("#" + displayNameSpanId).addClass(hiddenClass);
                        SmoothScrollUtils.scrollToId(id);
                    }}>
                    <FontAwesomeIcon icon={faIcon} />
                    <span id={displayNameSpanId} className={hiddenClass}>{ " " + displayName }</span>
                </AwesomeButton>
            </div>
        );
    }

    private static getHeight(element : Element) {

        const rect = element.getBoundingClientRect();
        return  rect.bottom - rect.top
    }
}