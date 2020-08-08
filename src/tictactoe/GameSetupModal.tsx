import React from "react";
import Modal from "./commons/Modal";
import CssHelper from "../utils/CssHelper";
import {ToastType} from "./commons/TicTacToeToast";

interface GameSetupModalProps {
    showModal: boolean;
    onGameSetupConfigurationsSubmit(numberOfGames : number) : void;
    showToast(toastType : ToastType, toastText : string) : void;
}

interface GameSetupModalState {
    numberOfGames : number
}

export default class GameSetupModal extends React.Component<GameSetupModalProps, GameSetupModalState> {

    private static defaultHeaderCssClasses : string[] = ["ttt-game-setup-modal-header"]

    constructor(props: GameSetupModalProps) {
        super(props);
        this.state = {
            numberOfGames: 4
        };
    }

    render() {

        if (!this.props.showModal) {
            return null;
        }

        return (

            <Modal modalStyleClasses={["ttt-modal"]}>
                <div className={"ttt-modal-content"}>
                    <div
                        className={
                            CssHelper.getCssClassName(
                                GameSetupModal.defaultHeaderCssClasses
                            )
                        }
                    >
                        {"Game Setup"}
                    </div>
                    <div className={"ttt-form"}>
                        <div className={"form-box"}>
                            <label>No. of Games:</label>
                            <input type="number" value={this.state.numberOfGames} onChange={this.updateNumberOfGames.bind(this)} />
                        </div>
                        <div className={"form-box"}>
                            <label>Game Type:</label>
                            <input type="readonly" value="Single-Player" onClick={this.updateGameType.bind(this)}/>
                        </div>
                        <div className={"form-box"}>
                            <label>Opponent Type:</label>
                            <input type="readonly" value="Human" onClick={this.updateOpponentType.bind(this)} />
                        </div>
                        <button
                            className={"submit-button"}
                            onClick={() => this.props.onGameSetupConfigurationsSubmit(this.state.numberOfGames)}>
                            Let's Play!
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }

    private updateNumberOfGames(event : React.FormEvent<HTMLInputElement>) {

        const numberOfGames = parseInt(event.currentTarget.value);
        if (numberOfGames < 1) {
            this.props.showToast(ToastType.ERROR,"At least One Game must be played!");
            return;
        }
        this.setState({numberOfGames: numberOfGames});
    }

    private updateGameType() {
        this.updateDisabledInputTypes();
    }

    private updateOpponentType() {
        this.updateDisabledInputTypes();
    }

    private updateDisabledInputTypes() {
        this.props.showToast(ToastType.ERROR,"Sorry! This feature is still under construction.");
    }
}