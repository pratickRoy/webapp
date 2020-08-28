import React from "react";
import LandingFragment from "./landing/LandingFragment";
import $ from "jquery";
import SmoothScrollUtils from "../utils/SmoothScrollUtils";
import _ from "underscore";
import HomePageFragmentMeta from "./HomePageFragmentMeta";
import { faCode, faFeatherAlt, faInfo, faPaperPlane, faRocket } from "@fortawesome/free-solid-svg-icons";
import HomeNavBar from "./HomeNavBar";

interface HomePageProps {
}

interface HomePageState {
    showNavigationBar : boolean;
}

export default class HomePage extends React.Component<HomePageProps, HomePageState> {

    private static HOME_PAGE_ID = "prw-home-page";

    private static HOME_PAGE_CHILDREN_FRAGMENT_LIST = [
        new HomePageFragmentMeta("prw-home-page-landing-fragment", "Houston", faRocket),
        new HomePageFragmentMeta("prw-home-page-info-fragment", "Info", faInfo),
        new HomePageFragmentMeta("prw-home-page-posts-fragment", "Posts", faFeatherAlt),
        new HomePageFragmentMeta("prw-home-page-projects-fragment", "Projects", faCode),
        new HomePageFragmentMeta("prw-home-page-contact-fragment", "Contact", faPaperPlane),
    ]

    constructor(props: HomePageProps) {
        super(props);
        this.state = {
            showNavigationBar: false
        }
    }

    componentDidMount() {
        this.setupSmoothScrollForFragmentChildren();
    }

    componentWillUnmount() {
        HomePage.tearDownSmoothScrollForFragmentChildren();
    }

    render() {

        return (
            <div id={HomePage.HOME_PAGE_ID}>
                <HomeNavBar
                    showNavigationBar={this.state.showNavigationBar}
                    navigationRoutes={
                        _.map(HomePage.HOME_PAGE_CHILDREN_FRAGMENT_LIST, (homePageFragmentMeta) => {
                            return {
                                id : homePageFragmentMeta.id,
                                displayName : homePageFragmentMeta.displayName,
                                faIcon : homePageFragmentMeta.iconDefinition
                            }
                        })
                    }
                />
                <LandingFragment
                    landingFragmentId={HomePage.HOME_PAGE_CHILDREN_FRAGMENT_LIST[0].id}
                    navigationRoutes={
                        _.map(HomePage.HOME_PAGE_CHILDREN_FRAGMENT_LIST.slice(1), (homePageFragmentMeta) => {
                            return {
                                id : homePageFragmentMeta.id,
                                displayName : homePageFragmentMeta.displayName,
                                faIcon : homePageFragmentMeta.iconDefinition
                            }
                        })
                    }
                />
                <div id={HomePage.HOME_PAGE_CHILDREN_FRAGMENT_LIST[1].id} style={{backgroundColor : "red", height : "100vh"}}><h1>1</h1></div>
                <div id={HomePage.HOME_PAGE_CHILDREN_FRAGMENT_LIST[2].id} style={{backgroundColor : "blue", height : "100vh"}}><h1>2</h1></div>
                <div id={HomePage.HOME_PAGE_CHILDREN_FRAGMENT_LIST[3].id} style={{backgroundColor : "yellow", height : "100vh"}}><h1>3</h1></div>
                <div id={HomePage.HOME_PAGE_CHILDREN_FRAGMENT_LIST[4].id} style={{backgroundColor : "green", height : "100vh"}}><h1>4</h1></div>
            </div>
        )
    }

    private static tearDownSmoothScrollForFragmentChildren() {

        $(window).off('scroll')
    }

    private setupSmoothScrollForFragmentChildren() {

        this.setupSmoothScrollForIds(

            $.map($("#" + HomePage.HOME_PAGE_ID).children(), function (child ) {
                const element = (child as HTMLElement);
                if (element.id) {
                    return (child as HTMLElement).id
                }
            })
        )
    }

    private setupSmoothScrollForIds(idList : string[]) {

        let isSmoothScrolling = true
        SmoothScrollUtils.scrollToId(idList[0], () => {isSmoothScrolling = false});

        let isScrolling: number | NodeJS.Timeout | undefined;

        const landingFragment = $("#" + idList[0])[0];
        $(window).on('scroll', () => {

            // ToDo : Fix Hack
            const windowTop  = window.pageYOffset || document.documentElement.scrollTop
            const landingFragmentHeight = landingFragment.getBoundingClientRect().bottom
                - landingFragment.getBoundingClientRect().top

            if (windowTop >= landingFragmentHeight) {
                if (!this.state.showNavigationBar) {
                    this.setState({
                        showNavigationBar: true
                    })
                }
            }
            else if (windowTop < landingFragmentHeight) {
                if (this.state.showNavigationBar) {
                    this.setState({
                        showNavigationBar: false
                    })
                }
            }

            if (isSmoothScrolling) {
                return;
            }

            // @ts-ignore
            window.clearTimeout( isScrolling );

            const homePageInstance = this;
            // Set a timeout to run after scrolling ends
            isScrolling = setTimeout(function() {

                // Run the callback
                const majorityId = HomePage.getIdOfAbsoluteMajorityForIdList(idList);
                if (majorityId && !HomePage.isFragmentOverflowing(majorityId)) {
                    isSmoothScrolling = true
                    SmoothScrollUtils.scrollToId(majorityId, () => {isSmoothScrolling = false});
                }

                // Hide navbar after 2 seconds of no scroll
                setTimeout(function () {
                    if (homePageInstance.state.showNavigationBar) {
                        homePageInstance.setState({
                            showNavigationBar: false
                        })
                    }
                }, 1500);
            }, 500);

        });
    }

    static isFragmentOverflowing(id : string) : boolean {

        const windowTop = 0;
        const windowBottom = window.innerHeight || document.documentElement.clientHeight;
        const windowHeight = windowBottom - windowTop

        const element = $("#" + id)[0];
        const rect = element.getBoundingClientRect();

        const heightOfElement = rect.bottom - rect.top;

        return heightOfElement > windowHeight;
    }

    static getIdOfAbsoluteMajorityForIdList(idList : string[]) : string | undefined {

        const windowTop = 0;
        const windowBottom = window.innerHeight || document.documentElement.clientHeight;
        const windowHeight = windowBottom - windowTop

        let majorityElementId : string | undefined;
        let majorityElementHeightPercentage = 0;

        idList.forEach(function (id) {
            const element = $("#" + id)[0];
            const rect = element.getBoundingClientRect();

            const heightOfElement = rect.bottom - rect.top
                - (rect.top >= windowTop ? 0 : 0 - rect.top)
                - (rect.bottom <= windowBottom ? 0 : rect.bottom - windowBottom);

            const heightPercentage = heightOfElement / windowHeight * 100;

            console.log(id)
            console.log(heightPercentage)

            if (heightPercentage > majorityElementHeightPercentage) {

                majorityElementHeightPercentage = heightPercentage
                majorityElementId = id;
            }
        });

        return majorityElementId;
    }
}