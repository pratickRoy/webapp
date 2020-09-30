import React from "react";
import "./post.scss"
import $ from "jquery";
import {Card, CardActionArea, CardContent, CardHeader, CardMedia} from "@material-ui/core";
import AreVoidMethodsBadFeatureImage from "./assets/are-void-methods-bad-feature-image.png"
import WhatIsGoodCodeFeatureImage from "./assets/what-is-good-code-feature-image.png"
// @ts-ignore
import {AwesomeButton} from "react-awesome-button";
import {GAevent, GApageView} from "../../index";
import {toast} from "react-toastify";
import {ToastOptions} from "react-toastify/dist/types";
import ToastUtils from "../../utils/ToastUtils";

interface PostFragmentProps {
    postFragmentId : string
    isFragmentActive : boolean
}

interface PostFragmentState {
    isFragmentActivated : boolean
    isPostReferred : boolean
}

export default class PostFragment extends React.Component<PostFragmentProps, PostFragmentState> {

    private static DEFAULT_ABOUT_ME_FRAGMENT_ID = "prw-home-page-posts-fragment";
    private static readonly POST_TOAST_OPTIONS : ToastOptions = {
        className: "prw-toast",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
    }
    private static readonly POST_TOAST_ID = {
        REDIRECTION : "post-fragment-redirection-toast"
    }

    static defaultProps = {
        aboutMeFragmentId : PostFragment.DEFAULT_ABOUT_ME_FRAGMENT_ID
    }

    constructor(props: PostFragmentProps) {

        super(props);
        this.state = {
            isFragmentActivated : false,
            isPostReferred : false
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.updatePostWidth.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updatePostWidth.bind(this));
    }

    componentDidUpdate(prevProps: Readonly<PostFragmentProps>, prevState: Readonly<PostFragmentState>, snapshot?: any) {

        if (!prevProps.isFragmentActive && this.props.isFragmentActive) {
            //window.history.replaceState("object or string", "", "/home/post");
            GApageView("home/post");
        }
        if (prevProps.isFragmentActive && !this.props.isFragmentActive) {
            toast.dismiss(PostFragment.POST_TOAST_ID.REDIRECTION);
        }

        if (this.props.isFragmentActive) {
            if (!this.state.isFragmentActivated) {
                GAevent("PostFragment", "Activated Fragment")
                this.setState({isFragmentActivated: true})
                this.updatePostWidth();
                const url = window.location.hash;
                const title = unescape(url.substring(url.indexOf("blogTitle") + 10))

                let post = $("[data-name='" + title + "']")
                if (!post[0]) {
                    post = $("[data-id='" + title + "']")
                    if (!post[0]) {
                        post = $("[data-title='" + title + "']")
                    }
                }

                if (window.location.hash.includes("weblog") && post[0]) {

                    GAevent("PostFragment", "Referred Post", title)
                    this.setState({isPostReferred : true});
                    toast.dark(
                        <p>
                            Hi. Thank you for coming to read my blog. I'll redirect you to the full post
                            as soon as the the loading finishes. After reading do come back to check out
                            the rest of my website :)<br/>

                            If not automatically redirected, please click on the card or allow popups from this page.
                        </p>,
                        Object.assign(
                            {
                                onClose: () => {
                                    GAevent("PostFragment", "Referred Post Redirection Attempted", title)
                                    window.open(post.data("url"), "_blank")
                                }

                            } as ToastOptions,
                            ToastUtils.buildToastOptions(
                                PostFragment.POST_TOAST_OPTIONS,
                                PostFragment.POST_TOAST_ID.REDIRECTION
                            )
                        )
                    );
                    setTimeout(() => {
                        $("#prw-home-page-posts-fragment-posts").animate(
                            {scrollLeft: post.offset()!.left - 10},
                            'slow'
                        );
                    }, 2000);
                }
            }
        }
    }

    render() {

        const activatedDeactivatedClass = this.state.isFragmentActivated
            ? "activated"
            : "deactivated";

        return (
            <div id={this.props.postFragmentId}>
                <div id={"prw-home-page-posts-fragment-loader"} className={activatedDeactivatedClass}>
                    <svg
                        version="1.1"
                        id="L2"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 100 100" enableBackground="new 0 0 100 100">
                        <circle fill="none" stroke="#fff" strokeWidth="4" strokeMiterlimit="10" cx="50" cy="50" r="48"/>
                        <line fill="none" strokeLinecap="round" stroke="#fff" strokeWidth="4" strokeMiterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
                            <animateTransform
                                attributeName="transform"
                                dur="2s"
                                type="rotate"
                                from="0 50 50"
                                to="360 50 50"
                                repeatCount="indefinite" />
                        </line>
                        <line fill="none" strokeLinecap="round" stroke="#fff" strokeWidth="4" strokeMiterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
                            <animateTransform
                                attributeName="transform"
                                dur="15s"
                                type="rotate"
                                from="0 50 50"
                                to="360 50 50"
                                repeatCount="indefinite" />
                        </line>
                    </svg>
                    <p style={{textAlign: "center"}}>Page Construction In Progress. Give me 2 Secs.</p>
                </div>
                <div id={"prw-home-page-posts-fragment-posts"} className={activatedDeactivatedClass}>

                    {this.buildCardListItem(
                        "https://towardsdatascience.com/are-void-methods-bad-6d67dedc6600?source=friends_link&sk=23ac126c1b359cc407a07b1908c8daf3",
                        AreVoidMethodsBadFeatureImage,
                        "A Void Method can be expressed by the formula : F(x) = Nothing :)",
                        "21162d1e-dd01-4891-80bf-5428b89acf19",
                        "Are Void Methods bad?",
                        "Why to avoid them, and also when not to.",
                        "A deep-dive into the nature of void methods and the associated side-effects. Why you should broadly avoid them. And the cases when you shouldn't."
                    )}
                    {this.buildCardListItem(
                        "https://medium.com/pratickroy/ray-vs-ethics-part-i-97103758b596?source=friends_link&sk=aa4a2dafba55f25150bb42256bfac5e3",
                        "https://miro.medium.com/max/1400/1*4IFIVHJApjLFznJo3KsNZA.jpeg",
                        "Satyajit Ray on a 1994 stamp of India",
                        "e4519e6a-cea2-48a9-9159-6d20336fbe9d",
                        "Ray vs Ethics",
                        "Part I",
                        "A deep-dive into Satyajit Ray’s filmography, in an attempt to confront his arch-nemesis — the ethics question."
                    )}
                    {this.buildCardListItem(
                        "https://towardsdatascience.com/what-is-good-code-an-actionable-introduction-1cad30551ad4?source=friends_link&sk=5eaf417af41f908a82d03791c51dac32",
                        WhatIsGoodCodeFeatureImage,
                        "CODE YOUR CUSTOMER. CODE YOUR DESIGN. DON'T SURPRISE ME.",
                        "d82e9a14-cd77-460a-a72f-5c9af1043498",
                        "What Is Good code?",
                        "A 10-minute actionable introduction.",
                        "A Deep Dive of Clean Code Principles; Highlighting the value of readability in a multi authored, large & complex project whose end customer is a human."
                    )}
                    {this.buildCardListItem(
                        "https://medium.com/the-double-slit/deriving-integral-calculus-the-geometric-way-e631d9aaffc6?source=friends_link&sk=b443854834af0df6f1cbfc96cd12d953",
                        "https://miro.medium.com/max/1400/1*i5B0gKAoqjwWIzxHjWME9w.jpeg",
                        "The Principia Mathematica",
                        "af07b516-5cdd-4b19-8b08-748c5a46eba0",
                        "Deriving Integral Calculus",
                        "The Geometric Way.",
                        "Using simple english & geometry to prove integration formulas."
                    )}
                    {this.buildCardListItem(
                        "https://medium.com/saint-ajay/open-letter-to-preludes-by-iceman-newton-af99ad90b711?source=friends_link&sk=e3b75425cc496d61427011d8f3e6dad8",
                        "https://miro.medium.com/max/1400/0*L2F4r0jbMe9xWCsf",
                        "Sparrows on the barbed wires",
                        "1c2f3add-4501-4f8f-8092-314a3592b2ba",
                        "Open Letter",
                        "A Preludes critique",
                        "Preludes. A poem on modern urban life's monotony, harpooned my then 17 year old mind. Now Iceman Newton replies to the palpable ubiquitous elitism therein.."
                    )}

                </div>
                <a
                    id={"prw-home-page-posts-fragment-see-all-posts"}
                    className={activatedDeactivatedClass}
                    onClick={() => { GAevent("PostFragment", "Show All Posts Engaged") }}
                    href="https://medium.com/@pratickRoy"
                    target="_blank">
                    See all Posts
                </a>
            </div>
        )
    }

    buildCardListItem(url : string,
                      featureImageId : string,
                      featureImageAlt : string,
                      postId : string,
                      postTitle : string,
                      postSubtitle : string,
                      postDesc : string) {

        const activatedDeactivatedClass = this.state.isFragmentActivated
            ? "activated"
            : "deactivated";

        const isPostReferredStyle = this.state.isPostReferred
            ? {transition: "none"}
            : {};

        return (
            <li>
                <Card
                    data-name={postTitle + " | " + postSubtitle}
                    data-id={postId}
                    data-title={postTitle}
                    data-url={url}
                    className={"prw-home-page-posts-fragment-post " + activatedDeactivatedClass}
                    style={isPostReferredStyle}
                    onClick={() => {
                        GAevent("PostFragment", "Post Engaged", (postTitle + " | " + postSubtitle))
                        window.open(url, "_blank")}
                    }>

                    <CardContent className={"prw-home-page-posts-fragment-post-content"}>
                        <CardMedia
                            className={"prw-home-page-posts-fragment-post-image"}
                            image={featureImageId}
                            title={featureImageAlt}>
                        </CardMedia>
                        <div className={"prw-home-page-posts-fragment-post-heading"}>
                            <hr/>
                            <h2>{postTitle}</h2>
                            <h3>{postSubtitle}</h3>
                        </div>
                        <p className={"prw-home-page-posts-fragment-post-description"}>
                            {postDesc}
                        </p>
                    </CardContent>

                </Card>
            </li>
        )
    }

    updatePostWidth() {

        const windowWidth = window.innerWidth;

        const posts = document.getElementsByClassName("prw-home-page-posts-fragment-post");
        for (let postIndex = 0; postIndex < posts.length; postIndex++) {

            const post = $(posts[postIndex]);
            const rightMargin = 0.05 * windowWidth;
            const postWidth = ((windowWidth - (2 * rightMargin)) / (1 + (10 / 100)))

            post.css("margin-right", rightMargin);
            post.width(Math.min(900, postWidth));
        }
    }
}