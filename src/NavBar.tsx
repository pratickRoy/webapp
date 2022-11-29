import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "underscore";
import SmoothScrollUtils from "./utils/SmoothScrollUtils";
// @ts-ignore
import {AwesomeButton} from "react-awesome-button";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import HorizontalColorBandDivider from "./components/HorizontalColorBandDivider";
import {GAevent} from "./index";
import LandingFragmentDisplayImage from "./home/landing/assets/landing-fragment-display-image.jpg"

interface NavBarProps {
    showNavigationBar : boolean
    navigationRoutes : { inPageId? : string, externalPageLink?: string, displayName : string, faIcon : IconDefinition }[]
}

interface NavBarState {
    isFocused : boolean
}

export default class NavBar extends React.Component<NavBarProps, NavBarState> {

    constructor(props : NavBarProps) {
        super(props);
        this.state = {
            isFocused : false
        }
    }
    render() {

        let navbarShowHideClass : string
        if (this.state.isFocused || this.props.showNavigationBar) {
            navbarShowHideClass = " prw-navbar-visible"
        } else {
            navbarShowHideClass = " prw-navbar-invisible"
        }

        return (
            <div
                onMouseOver={() => {this.setState({isFocused : true})}}
                onMouseOut={() => {this.setState({isFocused : false})}}>
                <Navbar variant="dark" expand="lg" className={"prw-navbar" + navbarShowHideClass}>
                    <Navbar variant="dark" className={"prw-navbar-brand"}>
                        <Navbar.Brand href="#">
                            <img
                                className={"prw-navbar-brand-img"}
                                src={LandingFragmentDisplayImage}
                            />
                            Pratick Roy
                        </Navbar.Brand>
                    </Navbar>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav ">
                        <Nav className="prw-navbar-navigation-button-wrapper" style={{ width: "100%" }}>
                            {
                                _.map(this.props.navigationRoutes, ({inPageId, externalPageLink, displayName, faIcon}) => {
                                    return (
                                        <AwesomeButton
                                            size={"small"}
                                            href={externalPageLink}
                                            target={"_blank"}
                                            onReleased={() => {
                                                GAevent(
                                                    "NavBar",
                                                    "Fragment Navigation Button Engaged",
                                                    displayName
                                                )
                                                if (inPageId) {
                                                    SmoothScrollUtils.scrollToId(inPageId);
                                                }
                                            }}>
                                            <FontAwesomeIcon icon={faIcon} />
                                            <span className={"prw-navbar-navigation-button-text"}>{ " " + displayName }</span>
                                        </AwesomeButton>
                                    )
                                })
                            }
                        </Nav>
                    </Navbar.Collapse>
                    <HorizontalColorBandDivider className={"prw-navbar-bottom-decoration"}/>
                </Navbar>
            </div>
        )
    }
}