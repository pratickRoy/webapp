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

interface LandingFragmentProps {
    landingFragmentId : string
    isFragmentActive : boolean
    navigationRoutes : { id : string, displayName : string, faIcon : IconDefinition }[]
}

interface LandingFragmentState {
    height? : string
    isFragmentActivated : boolean
}

export default class LandingFragment extends React.Component<LandingFragmentProps, LandingFragmentState> {

    private static DEFAULT_LANDING_FRAGMENT_ID = "prw-landing-fragment";
    private static ON_LOAD_ANIMATION_TIME_DURATION_IN_MILLIS = 6000;

    static defaultProps = {
        landingFragmentId: LandingFragment.DEFAULT_LANDING_FRAGMENT_ID,
    }

    constructor(props: LandingFragmentProps) {
        super(props);
        this.state = {
            isFragmentActivated : false,
        }
    }

    /**
     * On Fragment Load, we prevent scrolling until animation completes, allowing user to properly experience the ux.
     */

    componentDidUpdate(prevProps: Readonly<LandingFragmentProps>, prevState: Readonly<LandingFragmentState>, snapshot?: any) {

        if (!prevProps.isFragmentActive && this.props.isFragmentActive) {
            GApageView("home/landing");
        }

        if (this.props.isFragmentActive) {
            if (!this.state.isFragmentActivated) {

                GAevent("LandingFragment", "Activated Fragment")
                this.setState({isFragmentActivated: true})

                const fragment : Element = document.querySelector(this.props.landingFragmentId)!;
                setTimeout(
                    () => {
                        enableBodyScroll(fragment);
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
                                        src={"https://drive.google.com/uc?export=view&id=1qd6_90DZBimSdwkO9ZjLZwYibQEWenbA"}
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
                                            multiline={true}>

                                            This is one of those concepts that doesn't lend itself to easy explanation.<br/>
                                            Someday, I'll develop the skill to be able to explain it by my own words.<br/>
                                            Till then, click&nbsp;
                                            <a href={"https://youtu.be/PrvtOWEXDIQ"} target="_blank">here</a>
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