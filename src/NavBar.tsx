import React from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faGoogleDrive, faGithub, faMedium, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NavBarProps {
}

interface NavBarState {

}

export default class NavBar extends React.Component<NavBarProps, NavBarState> {

    render() {

        return (
            <Navbar bg="dark" variant="dark" expand="lg" className={"prw-navbar"} sticky={"top"}>
                <Navbar.Brand href="#home">Pratick Roy</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav ">
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Nav.Link href="https://drive.google.com/file/d/11mQdCVA1H39n5su4rjRmBcrF9DnOOAzy/view?usp=sharing" target="_blank">
                            <FontAwesomeIcon icon={faGoogleDrive} /> Resume
                        </Nav.Link>
                        <Nav.Link href="https://github.com/pratickRoy" target="_blank">
                            <FontAwesomeIcon icon={faGithub} /> Projects
                        </Nav.Link>
                        <Nav.Link href="https://medium.com/@pratickRoy" target="_blank">
                            <FontAwesomeIcon icon={faMedium} /> Posts
                        </Nav.Link>
                        <Nav.Link href="https://www.linkedin.com/in/pratickroy/" target="_blank">
                            <FontAwesomeIcon icon={faLinkedin} /> Connect
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}