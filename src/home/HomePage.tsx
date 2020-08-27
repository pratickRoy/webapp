import React from "react";
import LandingFragment from "./landing/LandingFragment";
import $ from "jquery";

interface HomePageProps {
}

interface HomePageState {
}

export default class HomePage extends React.Component<HomePageProps, HomePageState> {

    private static HOME_PAGE_ID = "prw-home-page";

    constructor(props: HomePageProps) {
        super(props);
        this.state = {}
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
                <LandingFragment/>
                <div id="placeholder1" style={{backgroundColor : "red", height : "100%"}}><h1>1</h1></div>
                <div id="placeholder2" style={{backgroundColor : "blue", height : "100%"}}><h1>2</h1></div>
                <div id="placeholder3" style={{backgroundColor : "yellow", height : "100%"}}><h1>3</h1></div>
                <div id="placeholder4" style={{backgroundColor : "green", height : "100%"}}><h1>4</h1></div>
                <div id="placeholder5" style={{backgroundColor : "white", height : "100%"}}><h1>5</h1></div>
                <div id="placeholder6" style={{backgroundColor : "black", height : "100%"}}><h1>6</h1></div>
            </div>
        )
    }

    private static tearDownSmoothScrollForFragmentChildren() {

        $(window).off('scroll')
    }

    private setupSmoothScrollForFragmentChildren() {

        this.setupSmoothScrollForIds(

            $.map($("#" + HomePage.HOME_PAGE_ID).children(), function (child ) {
                return (child as HTMLElement).id
            })
        )
    }

    private setupSmoothScrollForIds(idList : string[]) {

        let isDuplicateScrollEvent = false;
        let currentChildrenIndex = 0;
        let oldWindowPosition = $(window).scrollTop();

        $(window).on('scroll', () => {

            let currentWindowPosition = $(window).scrollTop();
            if (!isDuplicateScrollEvent) {
                isDuplicateScrollEvent = true;
                if (currentWindowPosition! > oldWindowPosition!) {
                    currentChildrenIndex = currentChildrenIndex < idList.length - 1
                        ? currentChildrenIndex + 1
                        : currentChildrenIndex
                } else {
                    currentChildrenIndex = currentChildrenIndex > 0
                        ? currentChildrenIndex - 1
                        : currentChildrenIndex
                }
                this.goToByScroll(idList[currentChildrenIndex], () => {isDuplicateScrollEvent = false})
            }
            oldWindowPosition = currentWindowPosition;
        });
    }

    private goToByScroll(id : String, callback: { (): void; (...args: any[]): void; }) {

        const linkedId : String = id.replace("link", "");
        const element : JQuery<HTMLElement> = $("#" + linkedId);

        // Scroll
        $('html,body').animate(
            {scrollTop: element.offset()?.top!},
            'fast',
            () => { setTimeout(callback, 100) }
        );
    }
}