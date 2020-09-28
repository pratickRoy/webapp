import React from "react";
import "./aboutme.scss"
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    Fab,
    Paper,
    Typography
} from "@material-ui/core";
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import $ from "jquery";
import {toast, ToastContainer} from "react-toastify";
import {ReactComponent} from "*.svg";
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import {faAmazon, faGoogleDrive} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUniversity} from "@fortawesome/free-solid-svg-icons";
import {Nav} from "react-bootstrap";
import {white} from "material-ui/styles/colors";
import {ToastOptions} from "react-toastify/dist/types";
import {GAevent, GApageView} from "../../index";
import ToastUtils from "../../utils/ToastUtils";


interface AboutMeProps {
    isFragmentActive : boolean
    aboutMeFragmentId : string
}

interface AboutMeState {
    isFragmentActivated : boolean
    isWorkExCardActivated : boolean
    visibleCardKey : number
}

export default class AboutMe extends React.Component<AboutMeProps, AboutMeState> {

    private static DEFAULT_ABOUT_ME_FRAGMENT_ID = "prw-home-page-about-me-fragment";
    private static readonly ABOUT_ME_TOAST_OPTIONS : ToastOptions = {
        className: "prw-toast",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true
    }
    private static readonly ABOUT_ME_TOAST_ID = {
        NAVIGATION : "about-me-fragment-navigation-toast"
    }

    static defaultProps = {
        aboutMeFragmentId : AboutMe.DEFAULT_ABOUT_ME_FRAGMENT_ID
    }

    private readonly bull = <span style={{
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    }}>•</span>;

    constructor(props: AboutMeProps) {

        super(props);
        this.state = {
            isFragmentActivated : false,
            isWorkExCardActivated : false,
            visibleCardKey : 0
        }
    }

    componentDidUpdate(prevProps: Readonly<AboutMeProps>, prevState: Readonly<AboutMeState>, snapshot?: any) {

        if (!prevProps.isFragmentActive && this.props.isFragmentActive) {
            GApageView("home/aboutme");
        }
        if (prevProps.isFragmentActive && !this.props.isFragmentActive) {
            toast.dismiss(AboutMe.ABOUT_ME_TOAST_ID.NAVIGATION);
        }

        if (prevState.visibleCardKey !== this.state.visibleCardKey) {

            let card : string = "Unknown"
            switch (this.state.visibleCardKey) {
                case 0: card = "Me the Human."; break;
                case 1: card = "Me the Developer."; break;
                case 2: card = "Work Ex."; break;
            }

            GAevent(
                "AboutMeFragment",
                "AboutMe Card Engaged",
                card
            )
        }

        if (this.props.isFragmentActive) {

            if (!this.state.isFragmentActivated) {
                GAevent("AboutMeFragment", "AboutMe Card Engaged", "Me the Human.")
                GAevent("AboutMeFragment", "Activated Fragment")
                toast.dark(<p>
                    To move the cards, use the buttons or
                    press the &#8592; and &#8594; keys
                    and (only if you are a gamer)
                    the A & D keys work as well :)</p>,
                    ToastUtils.buildToastOptions(
                        AboutMe.ABOUT_ME_TOAST_OPTIONS,
                        AboutMe.ABOUT_ME_TOAST_ID.NAVIGATION
                    )
                );
                this.setState({isFragmentActivated : true})
                return
            }

            $(document).off('keyup');
            $(document).on('keyup', (event) => {

                let button : any;
                if(event.key === "ArrowRight" || event.key === "D" || event.key === "d") {
                    button = $("#" + "prw-home-page-about-me-fragment-card-controller-right-button");
                } else if(event.key === "ArrowLeft" || event.key === "A" || event.key === "a") {
                    button = $("#" + "prw-home-page-about-me-fragment-card-controller-left-button");
                }
                if (button != undefined) {
                    button.focus();
                    button[0].click();
                }
            });
        } else {
            $(document).off('keyup');
        }
    }

    render() {

        const activatedDeactivatedClass = this.state.isFragmentActivated
            ? "activated"
            : "deactivated";

        return (
            <div id={this.props.aboutMeFragmentId}>

                <div id={"prw-home-page-about-me-fragment-loader"} className={activatedDeactivatedClass}>
                    <svg
                         version="1.1"
                         id="L3"
                         xmlns="http://www.w3.org/2000/svg"
                         x="0px"
                         y="0px"
                         viewBox="0 0 100 100"
                         enableBackground="new 0 0 0 0">
                        <circle stroke="#fff" strokeWidth="4" cx="50" cy="50" r="44" style={{opacity: "0.5"}}/>
                        <circle fill="#fff" stroke="#e74c3c" strokeWidth="3" cx="8" cy="54" r="6" >
                            <animateTransform
                                attributeName="transform"
                                dur="2s"
                                type="rotate"
                                from="0 50 48"
                                to="360 50 52"
                                repeatCount="indefinite" />
                        </circle>
                    </svg>
                    <p style={{textAlign: "center"}}>Page Construction In Progress. Give me 2 Secs.</p>
                </div>
                <div id={"prw-home-page-about-me-fragment-cards"} className={activatedDeactivatedClass}>
                    {
                        this.getCard(0,
                            (
                                <React.Fragment>
                                    <CardContent className={"prw-home-page-about-me-fragment-card-content"}>
                                        <CardHeader
                                            title={<h1>Hello World<hr/></h1>}>
                                        </CardHeader>
                                        <p className={"prw-home-page-about-me-fragment-card-content-paragraph"}>
                                            I am a human being based out of a planet called Earth.
                                            Though habitually an introvert, I love to talk, write, debate and engage on things I care about.
                                            A pragmatist to a fault, my opinions on any subject are just that, very strongly held,
                                            but subject to change, in light of a better argument.
                                            So, if you are in for an old-fashioned, good natured&nbsp;
                                            <a href={"https://qz.com/india/1122129/adda-a-brief-history-of-the-bengali-fine-art-of-discussion/"}
                                               target="_blank">
                                                adda
                                            </a>
                                            , design or hack session, drop me a note. :)
                                            <br/>
                                            <br/>Some Trigger Topics : Programming (Super Class), Politics, Films & Documentaries, Education, Religion, (and the non-linear topics that arise from these in conversations.)
                                        </p>
                                    </CardContent>
                                </React.Fragment>
                            )
                        )
                    }
                    {
                        this.getCard(1,
                            (
                                <React.Fragment>
                                <CardContent className={"prw-home-page-about-me-fragment-card-content"}>
                                    <CardHeader
                                        title={<h2>I can build stuff that works <strong>And which will continue to work.</strong> But...<hr/></h2>}>
                                    </CardHeader>
                                    <blockquote
                                        className={"prw-blockquote"}>
                                        <p className={"prw-home-page-about-me-fragment-card-content-paragraph"}>
                                            One day, I want to become a Software Engineer, worth the title, and am ready and willing to pay my dues to get there.
                                        </p>
                                    </blockquote>
                                    <p className={"prw-home-page-about-me-fragment-card-content-paragraph"}>
                                        While today I am miles from the shore of being worth this title, my ethos for getting me there is simple.&nbsp;
                                        <a target="_blank" href={"https://towardsdatascience.com/what-is-good-code-an-actionable-introduction-1cad30551ad4"}>
                                            Build Clean, Maintainable, Scalable, High-Quality & Innovative Software, while always coding for the customer
                                        </a>
                                        . Striving to achieve this is hard, and while i am slowly but surely paddling my way there, the journey by itself is extremely rewarding.
                                    </p>
                                    <blockquote
                                        className={"prw-blockquote"}
                                        cite="https://www.goodreads.com/quotes/8800-the-illiterate-of-the-21st-century-will-not-be-those#:~:text=%E2%80%9CThe%20illiterate%20of%20the%2021st%20century%20will%20not%20be%20those,%2C%20unlearn%2C%20and%20relearn.%20%E2%80%9D">
                                        <p className={"prw-home-page-about-me-fragment-card-content-paragraph"}>
                                            The illiterate of the 21st century will not be those who cannot read and write, but those who cannot learn, unlearn, and relearn.
                                        </p>
                                        <p className={"prw-home-page-about-me-fragment-card-content-paragraph"}>― Alvin Toffler</p>
                                    </blockquote>
                                    <p className={"prw-home-page-about-me-fragment-card-content-paragraph"}>
                                        I want to be a technology leader where I can think big and understand what the future would demand, and be ready for it.
                                        In that light, I love to dabble in new technologies, and build platforms and frameworks, that does not just solve one customer problem,
                                        but whole classes of them in one go. While I been able to achieve this in some respects, I want to grow much further in this direction,
                                        culminating in tech products whose reputation would precede them.
                                    </p>
                                </CardContent>
                            </React.Fragment>
                            )
                        )
                    }
                    {
                        this.getCard(2,
                            (
                                <React.Fragment>
                                <CardContent
                                    id={"prw-home-page-about-me-fragment-work-ex-card-content"}
                                    className={
                                        "prw-home-page-about-me-fragment-card-content " +
                                        (this.state.isWorkExCardActivated ? "activated" : "")
                                    }>
                                    <Timeline align="alternate">
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <a
                                                    className={"resume-btn"}
                                                    onClick={() => {
                                                        GAevent(
                                                            "AboutMeFragment",
                                                            "View Full Resume Button Engaged"
                                                        )
                                                    }}
                                                    href="https://drive.google.com/file/d/11mQdCVA1H39n5su4rjRmBcrF9DnOOAzy/view?usp=sharing"
                                                    target="_blank">

                                                    View Full Resume
                                                </a>
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                            </TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineOppositeContent>
                                                <Typography variant="body2" color="textSecondary">
                                                    Apr '20 - Present
                                                </Typography>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot color="primary">
                                                    <FontAwesomeIcon icon={faAmazon} />
                                                </TimelineDot>
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography>SDE - II</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineOppositeContent>
                                                <Typography variant="body2" color="textSecondary">
                                                    June '18 - Mar '20
                                                </Typography>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot color="secondary">
                                                    <FontAwesomeIcon icon={faAmazon}/>
                                                </TimelineDot>
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography>SDE - I</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot
                                                    color="inherit"
                                                    variant={"outlined"}
                                                    style={{borderColor : "white"}}>
                                                    <FontAwesomeIcon icon={faUniversity} color={"white"}/>
                                                </TimelineDot>
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography>Graduated :)</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineOppositeContent>
                                                <Typography variant="body2" color="textSecondary">
                                                    Sept '17 - May '18
                                                </Typography>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot style={{background: "#1A1818"}}>
                                                    <img
                                                        style={{height: "20px"}}
                                                        src="https://media-exp1.licdn.com/dms/image/C560BAQEuGeAAIZVEww/company-logo_200_200/0?e=1606953600&v=beta&t=2U3HPJp-DJa9i1U78unG7EuhFYvjuU4b7JA5oDgVXz4"/>
                                                </TimelineDot>
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography>Project Manager and Tech Lead</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineOppositeContent>
                                                <Typography variant="body2" color="textSecondary">
                                                    Jan '17 - Aug '17
                                                </Typography>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot color="grey" style={{color: "black"}}>
                                                    <FontAwesomeIcon icon={faAmazon} />
                                                </TimelineDot>
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography>SDE - Intern</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineOppositeContent>
                                                <Typography variant="body2" color="textSecondary">
                                                    July '16 - Jan '17
                                                </Typography>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot style={{background: "#222E35"}}>
                                                    <img
                                                        style={{height: "20px"}}
                                                        src="https://media-exp1.licdn.com/dms/image/C4D0BAQEUgVZeEpiLDQ/company-logo_200_200/0?e=1606953600&v=beta&t=i5bw0ACiYIcmSnltDpIiRqfAtVnpbaS0eeoFXTpRVGY"/>
                                                </TimelineDot>
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography>App Dev Engineer</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineOppositeContent>
                                                <Typography variant="body2" color="textSecondary">
                                                    May '16 - June '16
                                                </Typography>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot style={{background: "#222E35"}}>
                                                    <img
                                                        style={{height: "20px"}}
                                                        src="https://media-exp1.licdn.com/dms/image/C4D0BAQEUgVZeEpiLDQ/company-logo_200_200/0?e=1606953600&v=beta&t=i5bw0ACiYIcmSnltDpIiRqfAtVnpbaS0eeoFXTpRVGY"/>
                                                </TimelineDot>
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography>Intern</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                    </Timeline>
                                </CardContent>
                            </React.Fragment>
                            )
                        )
                    }
                </div>
                <div id={"prw-home-page-about-me-fragment-card-controller"} className={activatedDeactivatedClass}>
                    <Fab
                        id={"prw-home-page-about-me-fragment-card-controller-left-button"}
                        className={"prw-home-page-about-me-fragment-card-controller-button"}
                        color="primary"
                        aria-label="add"
                        onClick={() => {this.showLeftCard()}}>
                        <ArrowBackIosSharpIcon />
                    </Fab>
                    <Fab
                        id={"prw-home-page-about-me-fragment-card-controller-right-button"}
                        className={"prw-home-page-about-me-fragment-card-controller-button"}
                        color="primary"
                        aria-label="add"
                        onClick={() => {this.showRightCard()}}>
                        <ArrowForwardIosSharpIcon />
                    </Fab>
                    <AwesomeButton
                        className={this.state.visibleCardKey === 0 ? "aws-btn--active" : "inactive"}
                        onPress={() => this.showCard(0)}
                        size="small">
                        Me the Human.
                    </AwesomeButton>
                    <AwesomeButton
                        className={this.state.visibleCardKey === 1 ? "aws-btn--active" : "inactive"}
                        onPress={() => this.showCard(1)}
                        size="small">
                        Me the Developer.
                    </AwesomeButton>
                    <AwesomeButton
                        className={this.state.visibleCardKey === 2 ? "aws-btn--active" : "inactive"}
                        onPress={() => this.showCard(2)}
                        size="small">
                        Work Ex.
                    </AwesomeButton>
                </div>
            </div>
        )
    }

    private getCard(key: number, cardContent? : any) {

        const cardClass = (this.state.visibleCardKey === key) ? " visible" : " invisible"

        const content = (cardContent != undefined)
            ? cardContent
            : (
                <React.Fragment>
                    <CardContent>
                        <Typography style={{fontSize: 14}} color="textSecondary" gutterBottom>
                            {"Word of the Day" + " " + key}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            be{this.bull}nev{this.bull}o{this.bull}lent
                        </Typography>
                        <Typography style={{marginBottom: 12}} color="textSecondary">
                            adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions className={"prw-home-page-about-me-fragment-card-action"}>
                        <Button
                            variant="outlined"
                            size="small"
                            className={"prw-home-page-about-me-fragment-next-card-button"}>
                            Next : Learn
                        </Button>
                    </CardActions>
                </React.Fragment>
            )

        return (
            <Card
                key={key}
                className={"prw-home-page-about-me-fragment-card" + cardClass}>
                {content}
            </Card>
        );
    }

    private showCard(cardIndex : number) {
        this.setState({
            isWorkExCardActivated : this.state.isWorkExCardActivated || cardIndex === 2,
            visibleCardKey : cardIndex
        })
    }

    private showLeftCard() {

        const visibleCardKey = this.state.visibleCardKey === 0 ? 2 : this.state.visibleCardKey - 1
        this.setState({
            isWorkExCardActivated : this.state.isWorkExCardActivated || visibleCardKey === 2,
            visibleCardKey : visibleCardKey
        })
    }

    private showRightCard() {

        const visibleCardKey = this.state.visibleCardKey === 2 ? 0 : this.state.visibleCardKey + 1
        this.setState({
            isWorkExCardActivated : this.state.isWorkExCardActivated || visibleCardKey === 2,
            visibleCardKey : visibleCardKey
        })
    }
}