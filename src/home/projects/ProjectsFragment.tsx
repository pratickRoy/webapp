import React from "react";
import "./projects.scss"
import TicTacToeFeatureImage from "./assets/tictactoe-feature-image.png";
import DotsFeatureImage from "./assets/dots-feature-image.png";
import MLFeatureImage from "./assets/ml-feature-image.png";
import GithubFeatureImage from "./assets/github-feature-image.png";
import $ from "jquery";
import {
    faAndroid,
    faChrome, faGitAlt,
    faGithubAlt,
    faGooglePlay,
    faJava,
    faJs,
    faPython,
    faReact
} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBrain, faCode} from "@fortawesome/free-solid-svg-icons";
import {Fab} from "@material-ui/core";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
import {GAevent, GApageView} from "../../index";

interface ProjectsFragmentProps {
    isFragmentActive : boolean,
    projectsFragmentId : string
}

interface ProjectsFragmentState {
    isFragmentActivated : boolean
    activeProjectKey : number | undefined
}

export default class ProjectsFragment
    extends React.Component<ProjectsFragmentProps, ProjectsFragmentState> {

    private static DEFAULT_PROJECTS_FRAGMENT_ID = "prw-home-page-projects-fragment";

    static defaultProps = {
        aboutMeFragmentId : ProjectsFragment.DEFAULT_PROJECTS_FRAGMENT_ID
    }

    constructor(props: ProjectsFragmentProps) {

        super(props);
        this.state = {
            isFragmentActivated : false,
            activeProjectKey : undefined
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateProjectWidth.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateProjectWidth.bind(this));
    }

    componentDidUpdate(prevProps: Readonly<ProjectsFragmentProps>, prevState: Readonly<ProjectsFragmentState>, snapshot?: any) {

        if (!prevProps.isFragmentActive && this.props.isFragmentActive) {
            //window.history.replaceState("object or string", "", "/home/projects");
            GApageView("home/projects");
        }

        if (this.props.isFragmentActive) {
            if (!this.state.isFragmentActivated) {
                GAevent("ProjectsFragment", "Activated Fragment")
                this.setState({isFragmentActivated: true})
                this.updateProjectWidth();

                $(".prw-home-page-projects-fragment-project").on('click mouseenter', (e) => {
                    const element = $(e.target).closest(".prw-home-page-projects-fragment-project")
                    this.setState({activeProjectKey: parseInt(element[0].dataset.key!)})
                })
            }
        }
    }

    render() {

        const activatedDeactivatedClass = this.state.isFragmentActivated
            ? "activated"
            : "deactivated";

        return (
            <div id={this.props.projectsFragmentId}>
                <div id={"prw-home-page-projects-fragment-loader"} className={activatedDeactivatedClass}>
                    <svg
                        version="1.1"
                        id="L1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 100 100"
                        enableBackground="new 0 0 100 100">

                        <circle fill="none" stroke="#fff" strokeWidth="6" strokeMiterlimit="15" strokeDasharray="14.2472,14.2472" cx="50" cy="50" r="47" >
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="rotate"
                                dur="5s"
                                from="0 50 50"
                                to="360 50 50"
                                repeatCount="indefinite" />
                        </circle>
                        <circle fill="none" stroke="#fff" strokeWidth="1" strokeMiterlimit="10" strokeDasharray="10,10" cx="50" cy="50" r="39">
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="rotate"
                                dur="5s"
                                from="0 50 50"
                                to="-360 50 50"
                                repeatCount="indefinite" />
                        </circle>
                        <g fill="#fff">
                            <rect x="30" y="35" width="5" height="30">
                                <animateTransform
                                    attributeName="transform"
                                    dur="1s"
                                    type="translate"
                                    values="0 5 ; 0 -5; 0 5"
                                    repeatCount="indefinite"
                                    begin="0.1"/>
                            </rect>
                            <rect x="40" y="35" width="5" height="30" >
                                <animateTransform
                                    attributeName="transform"
                                    dur="1s"
                                    type="translate"
                                    values="0 5 ; 0 -5; 0 5"
                                    repeatCount="indefinite"
                                    begin="0.2"/>
                            </rect>
                            <rect x="50" y="35" width="5" height="30" >
                                <animateTransform
                                    attributeName="transform"
                                    dur="1s"
                                    type="translate"
                                    values="0 5 ; 0 -5; 0 5"
                                    repeatCount="indefinite"
                                    begin="0.3"/>
                            </rect>
                            <rect x="60" y="35" width="5" height="30" >
                                <animateTransform
                                    attributeName="transform"
                                    dur="1s"
                                    type="translate"
                                    values="0 5 ; 0 -5; 0 5"
                                    repeatCount="indefinite"
                                    begin="0.4"/>
                            </rect>
                            <rect x="70" y="35" width="5" height="30" >
                                <animateTransform
                                    attributeName="transform"
                                    dur="1s"
                                    type="translate"
                                    values="0 5 ; 0 -5; 0 5"
                                    repeatCount="indefinite"
                                    begin="0.5"/>
                            </rect>
                        </g>
                    </svg>

                    <p style={{textAlign: "center", marginTop: "10px"}}>Page Construction In Progress. Give me 2 Secs.</p>
                </div>
                <div id={"prw-home-page-projects-fragment-projects-header"} className={activatedDeactivatedClass}>
                    <h1>My Builds</h1><hr style={{zIndex: -1}}/>
                </div>
                <div id={"prw-home-page-projects-fragment-projects"} className={activatedDeactivatedClass}>
                    <div
                        className={"prw-home-page-projects-fragment-project " + activatedDeactivatedClass}
                        key={0}
                        data-key="0"
                        onClick={() => {this.xScrollToProject(0)}}>

                        <div className={"prw-home-page-projects-fragment-project-content"}>
                            <img src={DotsFeatureImage}/>
                            <div>
                                <h1><a
                                    onClick={() => { GAevent("ProjectsFragment", "Project Engaged", "Dots") }}
                                    href={"https://play.google.com/store/apps/details?id=com.dots.games.pratick.dots"} target={"_blank"}>Dots</a></h1>
                                <div className={"prw-home-page-projects-fragment-project-tags"}>
                                    <FontAwesomeIcon
                                        className={"prw-home-page-projects-fragment-project-tag"}
                                        icon={faAndroid} />
                                    <FontAwesomeIcon
                                        className={"prw-home-page-projects-fragment-project-tag"}
                                        icon={faJava} />
                                    <FontAwesomeIcon
                                        className={"prw-home-page-projects-fragment-project-tag"}
                                        icon={faGooglePlay} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={"prw-home-page-projects-fragment-project " + activatedDeactivatedClass}
                        key={1}
                        data-key="1"
                        onClick={() => {this.xScrollToProject(1)}}>

                        <div className={"prw-home-page-projects-fragment-project-content"}>
                            <img src={TicTacToeFeatureImage}/>
                            <div>
                                <h1><a
                                    onClick={() => { GAevent("ProjectsFragment", "Project Engaged", "T3") }}
                                    href={"/builds/tictactoe"} target={"_blank"}>T<sup>3</sup></a></h1>
                                <div className={"prw-home-page-projects-fragment-project-tags"}>
                                    <FontAwesomeIcon
                                        className={"prw-home-page-projects-fragment-project-tag"}
                                        icon={faReact} />
                                    <FontAwesomeIcon
                                        className={"prw-home-page-projects-fragment-project-tag"}
                                        icon={faJs} />
                                    <FontAwesomeIcon
                                        className={"prw-home-page-projects-fragment-project-tag"}
                                        icon={faChrome} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={"prw-home-page-projects-fragment-project " + activatedDeactivatedClass}
                        key={2}
                        data-key="2"
                        onClick={() => {this.xScrollToProject(2)}}>

                        <div className={"prw-home-page-projects-fragment-project-content"}>
                            <img src={MLFeatureImage}/>
                            <div>
                                <h1><a
                                    onClick={() => { GAevent("ProjectsFragment", "Project Engaged", "ML") }}
                                    href={"https://learning-machine.herokuapp.com/naiveBayes/"} target={"_blank"}>ML</a></h1>
                                <div className={"prw-home-page-projects-fragment-project-tags"}>
                                    <FontAwesomeIcon
                                        className={"prw-home-page-projects-fragment-project-tag"}
                                        icon={faBrain} />
                                    <FontAwesomeIcon
                                        className={"prw-home-page-projects-fragment-project-tag"}
                                        icon={faPython} />
                                    <FontAwesomeIcon
                                        className={"prw-home-page-projects-fragment-project-tag"}
                                        icon={faChrome} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={"prw-home-page-projects-fragment-project " + activatedDeactivatedClass}
                        key={3}
                        data-key="3"
                        onClick={() => {this.xScrollToProject(3)}}>
                        <div className={"prw-home-page-projects-fragment-project-content"}>
                            <img src={GithubFeatureImage}/>
                            <div>
                                <h1><a
                                    onClick={() => { GAevent("ProjectsFragment", "Project Engaged", "Repo") }}
                                    href={"https://github.com/pratickRoy?tab=repositories"} target={"_blank"}>Repo</a></h1>
                                <div className={"prw-home-page-projects-fragment-project-tags"}>
                                    <FontAwesomeIcon
                                        className={"prw-home-page-projects-fragment-project-tag"}
                                        icon={faCode} />
                                    <FontAwesomeIcon
                                        className={"prw-home-page-projects-fragment-project-tag"}
                                        icon={faGithubAlt} />
                                    <FontAwesomeIcon
                                        className={"prw-home-page-projects-fragment-project-tag"}
                                        icon={faGitAlt} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id={"prw-home-page-projects-fragment-card-controller"} className={activatedDeactivatedClass}>
                    <Fab
                        id={"prw-home-page-projects-fragment-card-controller-left-button"}
                        className={"prw-home-page-projects-fragment-card-controller-button " + activatedDeactivatedClass}
                        color="primary"
                        aria-label="add"
                        onClick={() => {this.showLeftProject()}}>
                        <ArrowBackIosSharpIcon />
                    </Fab>
                    <Fab
                        id={"prw-home-page-projects-fragment-card-controller-right-button"}
                        className={"prw-home-page-projects-fragment-card-controller-button " + activatedDeactivatedClass}
                        color="primary"
                        aria-label="add"
                        onClick={() => {this.showRightProject()}}>
                        <ArrowForwardIosSharpIcon />
                    </Fab>
                </div>
            </div>
        )
    }

    updateProjectWidth() {

        return;
        const windowWidth = window.innerWidth;

        const projects = document.getElementsByClassName("prw-home-page-projects-fragment-project");
        for (let projectIndex = 0; projectIndex < projects.length; projectIndex++) {

            const project = $(projects[projectIndex]);
            const projectWidth = Math.min(500, (windowWidth * (30 / 100)));

            project.width(projectWidth);

            if (projectIndex != 0) {
                project.css("margin-left", -1 * (projectWidth * (30 / 100)));
            }
        }
    }

    private xScrollToProject(key : number) {

        const project = $(".prw-home-page-projects-fragment-project");
        const width = project[0].getBoundingClientRect().width
        $("#prw-home-page-projects-fragment-projects").animate(
            {scrollLeft: (key * width) - (key * 30)},
            'slow'
        );

        this.setState({
            activeProjectKey : key
        })
    }

    private showLeftProject() {

        const key = this.state.activeProjectKey ?? 1;
        this.showProject(key == 0 ? 3 : key - 1)
    }

    private showRightProject() {

        const key = this.state.activeProjectKey ?? -1;
        this.showProject(key == 3 ? 0 : key + 1)
    }

    private showProject(key: number) {

        const element = $(".prw-home-page-projects-fragment-project[data-key='" + key + "']");
        element.trigger("click")
        element.find("a").focus()
    }
}