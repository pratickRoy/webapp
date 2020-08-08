import React from "react";
import CssHelper from "../../utils/CssHelper";
import {createPortal} from "react-dom";

interface ModalProps {
    modalRootId? : string
    modalStyleClasses? : string[]
}

interface ModalState {
}

export default class Modal extends React.Component<ModalProps, ModalState> {

    private readonly modalRoot: HTMLElement;
    private readonly modalElement: HTMLElement;

    constructor(props : ModalProps) {
        super(props);
        this.modalRoot = document.getElementById( this.props.modalRootId ?? 'root' )!;
        this.modalElement = document.createElement( 'div' );
        this.modalElement.className = CssHelper.getCssClassName(this.props.modalStyleClasses)
    }

    componentDidMount() {
        this.modalRoot.appendChild( this.modalElement );
    }

    componentWillUnmount() {
        this.modalRoot.removeChild( this.modalElement );
    }

    render() {

        return createPortal( this.props.children, this.modalElement );
    }
}