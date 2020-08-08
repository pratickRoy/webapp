import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export enum ToastType {
    ERROR
}

interface ToastProps {
    toastType : ToastType
    toastText? : string
    showToast : boolean;
    notifyToastShown() : void
}

interface ToastState {
}

export default class TicTacToeToast extends React.Component<ToastProps, ToastState> {

    constructor(props : ToastProps) {
        super(props);
    }

    render() {

        if (this.props.showToast) {
            this.notify();
        }

        return (
            <ToastContainer
                position="top-center"
                toastClassName={"ttt-toast"}
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        );
    }

    notify() {

        if (this.props.toastType === ToastType.ERROR) {
            toast.error(this.props.toastText, {
                onClose : () => {this.props.notifyToastShown()}
            });
        }
    }
}