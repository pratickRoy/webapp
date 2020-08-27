import React from "react";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import HorizontalColorBandDivider from "../../components/HorizontalColorBandDivider";

interface LandingFragmentProps {

}

interface LandingFragmentState {
}

export default class LandingFragment extends React.Component<LandingFragmentProps, LandingFragmentState> {

    private static LANDING_FRAGMENT_ID = "prw-landing-fragment";
    private static ON_LOAD_ANIMATION_TIME_DURATION_IN_MILLIS = 6000;

    constructor(props: LandingFragmentProps) {
        super(props);
        this.state = {
        }
    }

    /**
     * On Fragment Load, we prevent scrolling until animation completes, allowing user to properly experience the ux.
     */
    componentDidMount() {

        const fragment : Element = document.querySelector(LandingFragment.LANDING_FRAGMENT_ID)!;

        disableBodyScroll(fragment);
        setTimeout(
            () => { enableBodyScroll(fragment); },
            LandingFragment.ON_LOAD_ANIMATION_TIME_DURATION_IN_MILLIS
        );
    }

    render() {

        return (
            <div id={LandingFragment.LANDING_FRAGMENT_ID}>
                <div id={"prw-landing-fragment-background"}/>
                <div id={"prw-landing-fragment-background-overlay"}/>
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
                        <h2>Software Developer</h2>
                    </div>
                </div>
                <HorizontalColorBandDivider className={"prw-landing-fragment-top-direction"}/>
            </div>
        )
    }
}