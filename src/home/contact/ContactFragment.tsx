import React from "react";
import "./contact.scss"
import Form from "reactstrap/lib/Form";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import * as emailjs from 'emailjs-com'
// @ts-ignore
import {AwesomeButton} from "react-awesome-button";
import {toast, ToastContainer} from "react-toastify";
import {ToastOptions} from "react-toastify/dist/types";
import {CircularProgress} from "@material-ui/core";
import {faFacebook, faGithubAlt, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

interface ContactFragmentProps {
    contactFragmentId : string
    isFragmentActive : boolean
}

interface ContactFragmentState {
    isFragmentActivated : boolean
    areAllFormInputsProperlyFilled : boolean
    showProgress : boolean
    name: string,
    email: string,
    message: string,
}

export default class ContactFragment extends React.Component<ContactFragmentProps, ContactFragmentState> {

    private static readonly DEFAULT_CONTACT_FRAGMENT_ID = "prw-home-page-contact-fragment";
    private static readonly CONTACT_FRAGMENT_TOAST_OPTIONS : ToastOptions = {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true
    }

    static defaultProps = {
        aboutMeFragmentId : ContactFragment.DEFAULT_CONTACT_FRAGMENT_ID
    }

    constructor(props: ContactFragmentProps) {

        super(props);
        this.state = {
            isFragmentActivated : false,
            areAllFormInputsProperlyFilled : false,
            showProgress : false,
            name : "",
            email : "",
            message : ""
        }
    }

    componentDidUpdate(prevProps: Readonly<ContactFragmentProps>, prevState: Readonly<ContactFragmentState>, snapshot?: any) {

        if (this.props.isFragmentActive) {
            if (!this.state.isFragmentActivated) {
                this.setState({isFragmentActivated: true})
            }
        }
    }

    render() {

        const activatedDeactivatedClass = this.state.isFragmentActivated
            ? "activated"
            : "deactivated";

        return (
            <div id={this.props.contactFragmentId}>
                <div id={"prw-home-page-contact-fragment-loader"} className={activatedDeactivatedClass}>
                    <svg
                        version="1.1"
                        id="L7"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 100 100"
                        enableBackground="new 0 0 100 100">
                        <path
                            fill="#fff"
                            d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,
                               8.4-45.4-2-53.8-23.3c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="rotate"
                                dur="2s"
                                from="0 50 50"
                                to="360 50 50"
                                repeatCount="indefinite" />
                        </path>
                        <path
                            fill="#fff"
                            d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,
                               4.1-27.7c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="rotate"
                                dur="1s"
                                from="0 50 50"
                                to="-360 50 50"
                                repeatCount="indefinite" />
                        </path>
                        <path
                            fill="#fff"
                            d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,
                               13.5-35.3s29.3,0,35.3,13.5L82,35.7z">
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="rotate"
                                dur="2s"
                                from="0 50 50"
                                to="360 50 50"
                                repeatCount="indefinite" />
                        </path>
                    </svg>
                    <p style={{textAlign: "center"}}>Page Construction In Progress. Give me 2 Secs.</p>
                </div>
                <div id={"prw-home-page-contact-fragment-form-wrapper"} className={activatedDeactivatedClass}>
                    <Form
                        id={"prw-home-page-contact-fragment-form"}
                        onSubmit={this.handleSubmit.bind(this)}>

                        <FormGroup className="prw-home-page-contact-fragment-form-group"
                                   controlId="formBasicName">
                            <Input
                                type="text"
                                name="name"
                                value={this.state.name}
                                className="prw-home-page-contact-fragment-form-input"
                                onChange={(e) => {
                                    this.setState({ name: e.target.value }, this.validateAllFieldsAreFilled)
                                }}
                                placeholder="Name"
                            />
                        </FormGroup>
                        <FormGroup className="prw-home-page-contact-fragment-form-group"
                                   controlId="formBasicEmail">
                            <Input
                                id={"prw-home-page-contact-fragment-form-email-input"}
                                type="email"
                                name="email"
                                value={this.state.email}
                                className="prw-home-page-contact-fragment-form-input"
                                onChange={(e) => {
                                    this.setState({ email: e.target.value }, this.validateAllFieldsAreFilled)
                                }}
                                placeholder="Email"
                            />
                        </FormGroup>
                        <FormGroup className="prw-home-page-contact-fragment-form-group"
                                   controlId="formBasicMessage">
                            <Input
                                id={"prw-home-page-contact-fragment-form-message-input"}
                                type="textarea"
                                placeholder="Your Message"
                                className="prw-home-page-contact-fragment-form-input"
                                value={this.state.message}
                                onChange={(e) => {
                                    this.setState({ message: e.target.value }, this.validateAllFieldsAreFilled)
                                }}
                            />
                        </FormGroup>
                        <AwesomeButton
                            size={"small"}
                            disabled={!this.state.areAllFormInputsProperlyFilled}>
                            Submit
                        </AwesomeButton>
                    </Form>
                </div>
                <div id={"prw-home-page-contact-fragment-header-image"} className={activatedDeactivatedClass}>
                    <svg
                        preserveAspectRatio="none"
                        viewBox="0 0 100 102"
                        height="100%"
                        width="100%"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg" className="svgcolor-light">

                        <path d="M0 102 L50 0 L100 102 Z" fill="white" stroke="white"></path>
                    </svg>
                </div>
                <div id={"prw-home-page-contact-fragment-social-media-buttons"}  className={activatedDeactivatedClass}>
                    <a href={"https://www.linkedin.com/in/pratickroy/"}
                       className={"prw-home-page-projects-social-media-button"}
                       target={"_blank"}>

                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href={"https://www.facebook.com/Roy.online"}
                       className={"prw-home-page-projects-social-media-button"}
                       target={"_blank"}>

                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href={"https://mobile.twitter.com/sudo_pratickroy"}
                       className={"prw-home-page-projects-social-media-button"}
                       target={"_blank"}>

                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href={"mailto:roypratick.1@gmail.com"}
                       className={"prw-home-page-projects-social-media-button"}
                       target={"_blank"}>

                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                </div>
                <div className={
                    "prw-home-page-contact-fragment-progress-bar-wrapper " + (this.state.showProgress ? "active" : "")}>
                    <CircularProgress className={"prw-home-page-contact-fragment-progress-bar"}/>
                </div>
            </div>
        )
    }

    private handleSubmit(event: React.FormEvent) {

        event.preventDefault();

        if (!this.validateAllFieldsAreFilled()) {
            return;
        }

        let templateParams = {
            from_name: this.state.name,
            from_email: this.state.email,
            message: this.state.message,
        }

        this.setState({ showProgress: true })
        emailjs.send(
            'pratick_roy_gmail_id',
            'template_bt9u51y',
            templateParams,
            'user_yXYdo0mmf1coiUy8CwR9B'
        ).then((response) => {
            this.setState({ showProgress: false })
            toast.success(<p>Message Sent Successfully!</p>,
                ContactFragment.CONTACT_FRAGMENT_TOAST_OPTIONS
            );
            this.resetForm()
        }, (error) => {
            setTimeout(() => {
                this.setState({ showProgress: false })
                toast.error(<p>Failed to send message. Please Try again after some time.</p>,
                    ContactFragment.CONTACT_FRAGMENT_TOAST_OPTIONS
                );
            }, 500)

        });
    }

    private resetForm() {
        this.setState({
            name: "",
            email: "",
            message: "",
        })
    }

    private handleChange = (param: any, e: { target: { value: any; }; }) => {

        console.log("xxx")
        // @ts-ignore
        this.setState({ [param]: e.target.value })
        this.validateAllFieldsAreFilled();
    }

    private validateAllFieldsAreFilled() {

        if (this.state.name === "" || this.state.email === "" || this.state.message == "") {
            this.setState({
                areAllFormInputsProperlyFilled : false
            })
            return false;
        } else {
            this.setState({
                areAllFormInputsProperlyFilled : true
            })
            return true;
        }
    }
}