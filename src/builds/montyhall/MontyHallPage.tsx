import React from "react";
import './montyhall.scss';
import {GApageView} from "../../index";
import ReactCardFlip from 'react-card-flip';
import {Card, FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import { Bar, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, ReferenceLine} from 'recharts';
import RandomUtils from "../../utils/RandomUtils";
import MontyHallGameSession from "./MontyHallGameSession";
import MontyHallAISettings, {AIType} from "./MontyHallAISettings";
import MontyHallAllGameScores, {StrategyType} from "./MontyHallAllGameScores";
// @ts-ignore
import {AwesomeButton} from "react-awesome-button";
// @ts-ignore
import CornerRibbon from "react-corner-ribbon";
import NavBar from "../../NavBar";
import HomePageFragmentMeta from "../../home/HomePageFragmentMeta";
import {faBook, faCode, faFeatherAlt, faInfo, faPaperPlane, faRocket} from "@fortawesome/free-solid-svg-icons";
import _ from "underscore";
import {faGoogleDrive} from "@fortawesome/free-brands-svg-icons";


interface MontyHallPageProps {
}

interface MontyHallPageState {
    gameSession : MontyHallGameSession
    aiSettings : MontyHallAISettings
    allGameScores : MontyHallAllGameScores
}

export default class MontyHallPage extends React.Component<MontyHallPageProps, MontyHallPageState> {

    constructor(props: MontyHallPageProps) {
        super(props);
        this.state = {
            gameSession : new MontyHallGameSession(),
            aiSettings : new MontyHallAISettings(),
            allGameScores : new MontyHallAllGameScores()
        }
    }

    componentDidMount() {
        GApageView("builds/montyhall");
    }

    render() {

        return (
            <React.Fragment>
                <NavBar navigationRoutes={
                    [
                        {
                            externalPageLink: "#/home/weblog?blogTitle=bd20c922-01d9-44e5-bec1-32614f5bbe63",
                            displayName: "Rel. Blog",
                            faIcon: faFeatherAlt
                        },
                        {
                            externalPageLink: "#/home/builds",
                            displayName: "All Builds",
                            faIcon: faCode
                        },
                        {
                            externalPageLink: "#/home/aboutme?category=workex",
                            displayName: "Work Ex.",
                            faIcon: faBook
                        },
                        {
                            externalPageLink: "#/home/contact",
                            displayName: "Say Hi",
                            faIcon: faPaperPlane
                        },
                    ]
                } showNavigationBar={true}/>
                <div className={"prw-montyhall-main"}>
                    {this.renderController()}
                    {this.renderGame()}
                    {this.renderResult()}
                </div>
            </React.Fragment>
        )
    }

    private renderController() : JSX.Element {

        return (
            <div className={"prw-montyhall-controller"}>
                <div className={"prw-montyhall-section-label"}>
                    AI Simulation Controls
                </div>
                <div className={"prw-montyhall-form"}>
                    <label>No. of Rounds:</label>
                    <input className={"prw-montyhall-form-input"}
                           type="number"
                           min={1}
                           disabled={this.state.aiSettings.isAiPlaying}
                           value={this.state.aiSettings.gamesToPlay}
                           onChange={(event) => this.updateNumberOfGames(parseInt(event.currentTarget.value))}
                    />
                </div>
                <div className={"prw-montyhall-form"}>
                    <FormControl>
                        <label>AI Behaviour:</label>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={this.state.aiSettings.aiType}
                            name="radio-buttons-group"
                            onChange={(event, value) => this.updateComputerType(event, value)}
                        >
                            <FormControlLabel
                                disabled={this.state.aiSettings.isAiPlaying}
                                className={"prw-montyhall-form-radio"}
                                value={AIType.ALWAYS_STICK}
                                control={<Radio />}
                                label="AI will always stick to the first picked Door"
                            />
                            <FormControlLabel
                                disabled={this.state.aiSettings.isAiPlaying}
                                className={"prw-montyhall-form-radio"}
                                value={AIType.ALWAYS_SWITCH}
                                control={<Radio />}
                                label="AI will always switch to the other Door"
                            />
                            <FormControlLabel
                                disabled={this.state.aiSettings.isAiPlaying}
                                className={"prw-montyhall-form-radio"}
                                value={AIType.RANDOM}
                                control={<Radio />}
                                label="AI will will stick or switch at random"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={"prw-montyhall-form"}>
                    <label>AI wait time (in milliseconds) : [Note we will value less than 250ms will disable animations to prevent jittering]</label>
                    <input
                        disabled={this.state.aiSettings.isAiPlaying}
                        className={"prw-montyhall-form-input"}
                        min={0}
                        type="number"
                        value={this.state.aiSettings.waitTime}
                        onChange={(event) => this.updateWaitTime(parseInt(event.currentTarget.value))}
                    />
                </div>
                <div id={"prw-montyhall-control-buttons"} className={"prw-montyhall-form"}>
                    <AwesomeButton
                        className={"prw-montyhall-button"}
                        type={"primary"}
                        disabled={this.state.aiSettings.isAiPlaying}
                        onPress={() => this.start()}>
                        Start
                    </AwesomeButton>
                    <AwesomeButton
                        className={"prw-montyhall-button"}
                        type={"secondary"}
                        disabled={!this.state.aiSettings.isAiPlaying}
                        onPress={() => this.stop()}>
                        Pause
                    </AwesomeButton>
                </div>
            </div>
        )
    }

    private renderGame() : JSX.Element {

        const switchDoor = this.getSwitchDoorId();

        return (
            <div className={"prw-montyhall-game"}>
                <div className={"prw-montyhall-section-label"}>
                    The Game
                </div>
                <div className={"prw-montyhall-doors"}>
                    {this.renderDoor(1)}
                    {this.renderDoor(2)}
                    {this.renderDoor(3)}
                </div>
                {this.shouldAnimationBeEnabled() && this.state.gameSession.getDoorIdOpenedByHost() &&
                    <div className={"prw-montyhall-buttons"}>
                        <AwesomeButton
                            className={"prw-montyhall-button"}
                            type={"primary"}
                            disabled={this.state.gameSession.getGameSessionOver()}
                            onPress={() => this.handlePlayerSwitchingDoor(switchDoor)}>
                            Switch to Door : {switchDoor}
                        </AwesomeButton>
                        <AwesomeButton
                            className={"prw-montyhall-button"}
                            type={"secondary"}
                            disabled={this.state.gameSession.getGameSessionOver()}
                            onPress={() => this.handlePlayerStickingToDoor()}>
                            Stick with Door : {this.state.gameSession.getDoorIdPickedByPlayer()}
                        </AwesomeButton>
                    </div>
                }
                {this.shouldAnimationBeEnabled() && this.state.gameSession.getDoorIdOpenedByHost &&
                    <div className={"prw-montyhall-logs"}>
                        <ul>
                            {this.state.gameSession.getLogs().map((log, index) => (<li key={ index }>{log}</li>))}
                        </ul>
                    </div>
                }
                {this.shouldAnimationBeEnabled() && this.state.gameSession.getGameSessionOver() &&
                    <div className={"prw-montyhall-next-round"}>
                        <AwesomeButton
                            className={"prw-montyhall-button"}
                            type={"secondary"}
                            onPress={() => this.resetGame()}>
                            Next Round
                        </AwesomeButton>
                    </div>
                }
            </div>
        )
    }

    private renderResult() : JSX.Element {

        return (
            <div className={"prw-montyhall-result"}>
                <div className={"prw-montyhall-section-label"}>
                    The Result
                </div>
                <div className={"prw-montyhall-result-sections"}>
                    <ul className={"prw-montyhall-result-section"}>
                        <li>Games Played : {this.state.allGameScores.strategyTypeToNumberOfGamesPlayed.get(StrategyType.ANY)}</li>
                        <li>Games Won : {this.state.allGameScores.strategyTypeToNumberOfGamesWon.get(StrategyType.ANY)}</li>
                        <li>Games Won Percentage : {this.state.allGameScores.strategyTypeToNumberOfGamesWonPercentage.get(StrategyType.ANY)!.toFixed(2)}%</li>
                        <li>Stuck To Original Door : {this.state.allGameScores.strategyTypeToNumberOfGamesPlayed.get(StrategyType.STICK)}</li>
                        <li>Stuck To Original Door & Won : {this.state.allGameScores.strategyTypeToNumberOfGamesWon.get(StrategyType.STICK)}</li>
                        <li>Stuck To Original Door & Won % : {this.state.allGameScores.strategyTypeToNumberOfGamesWonPercentage.get(StrategyType.STICK)!.toFixed(2)}%</li>
                        <li>Switched Door : {this.state.allGameScores.strategyTypeToNumberOfGamesPlayed.get(StrategyType.SWITCH)}</li>
                        <li>Switched Door & Won : {this.state.allGameScores.strategyTypeToNumberOfGamesWon.get(StrategyType.SWITCH)}</li>
                        <li>Switched Door & Won % : {this.state.allGameScores.strategyTypeToNumberOfGamesWonPercentage.get(StrategyType.SWITCH)!.toFixed(2)}%</li>
                    </ul>
                    <div id={"prw-montyhall-result-charts"} className={"prw-montyhall-result-section"}>
                        <ResponsiveContainer width="80%" height="100%">
                            <BarChart data={
                                [
                                    { name: 'All', data : this.state.allGameScores.strategyTypeToNumberOfGamesWonPercentage.get(StrategyType.ANY)!.toFixed(2)},
                                    { name: 'Switched Door', data : this.state.allGameScores.strategyTypeToNumberOfGamesWonPercentage.get(StrategyType.SWITCH)!.toFixed(2)},
                                    { name: 'Stuck To Door', data : this.state.allGameScores.strategyTypeToNumberOfGamesWonPercentage.get(StrategyType.STICK)!.toFixed(2)},
                                ]
                            }>
                                <CartesianGrid />
                                <XAxis dataKey="name" />
                                <YAxis type="number" domain={[0, 100]}/>
                                <Tooltip />
                                <Legend />
                                <ReferenceLine y={33.33} stroke={"#e70f14"} />
                                <ReferenceLine y={50} stroke={"#e70f14"} />
                                <ReferenceLine y={66.67} stroke={"#e70f14"} />
                                <Bar dataKey="data" name={"Win %"} fill="#8BC34A"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        )
    }

    private renderDoor(doorId : number) : JSX.Element {

        const isWinningDoor = this.isWinningDoor(doorId);

        return (
            <ReactCardFlip
                isFlipped={this.shouldAnimationBeEnabled() && this.state.gameSession.isDoorOpen(doorId)}
                flipDirection="horizontal">
                <Card
                    className={"prw-montyhall-door front"}
                    onClick={() => {!this.state.aiSettings.isAiPlaying && this.handlePlayerPickingDoor(doorId)}}>
                    <b><u>DOOR : {(doorId)}</u></b>
                </Card>
                <Card
                    className={this.buildClassNames(["prw-montyhall-door"], [
                        {condition : () => isWinningDoor, classes : ["prize"]},
                        {condition : () => !isWinningDoor, classes : ["empty"]}
                    ])}>
                    <b><u>{isWinningDoor ? "PRIZE" : "EMPTY"}</u></b>
                </Card>
            </ReactCardFlip>
        )
    }

    private haveHostToOpenDoor() {

        const openableDoorIds = this.state.gameSession.getOpenableDoorIds();
        const doorIdToOpen = openableDoorIds[RandomUtils.getRandomNumber(0, openableDoorIds.length)];

        this.setState(state => {
            state.gameSession.setDoorIdOpenedByHost(doorIdToOpen)
            state.gameSession.openDoor(doorIdToOpen)
            state.gameSession.addLog("Host Opened Door : " + doorIdToOpen)
            return {gameSession : state.gameSession};
        });
    }

    private resetGame() {
        this.setState({gameSession : new MontyHallGameSession()})
    }

    private stop() {
        this.setState(state => {
            state.aiSettings.isAiPlaying = false
            return {aiSettings : state.aiSettings}
        });
    }

    private start() {

        this.setState(
            state => {
                state.aiSettings.isAiPlaying = true
                return {aiSettings : state.aiSettings}
            },
            () => {
                setTimeout(() => {
                    this.handlePlayerPickingDoor(
                        RandomUtils.getRandomNumber(1, 4),
                        () => {
                            setTimeout(() => {
                                if (this.state.aiSettings.aiType == AIType.ALWAYS_STICK) {
                                    this.handlePlayerStickingToDoor(() => { this.haveAIStartPlayingNextRound() })
                                } else if (this.state.aiSettings.aiType == AIType.ALWAYS_SWITCH) {
                                    this.handlePlayerSwitchingDoor(this.getSwitchDoorId(), () => { this.haveAIStartPlayingNextRound() })
                                } else {
                                    RandomUtils.getRandomBoolean()
                                        ? this.handlePlayerStickingToDoor(() => { this.haveAIStartPlayingNextRound() })
                                        : this.handlePlayerSwitchingDoor(this.getSwitchDoorId(), () => { this.haveAIStartPlayingNextRound() })
                                }
                            }, this.state.aiSettings.waitTime)
                        }
                    )
                }, this.state.aiSettings.waitTime)
            }
        );
    }

    private handlePlayerPickingDoor(doorId: number,
                                    callback?: () => void) {

        if (!this.state.gameSession.getDoorIdPickedByPlayer()) {
            this.setState(state => {
                state.gameSession.setDoorIdPickedByPlayer(doorId)
                state.gameSession.addLog("Player Picked Door : " + (doorId))
                return {gameSession : state.gameSession};
            }, () => {
                this.haveHostToOpenDoor();
                if (callback) {callback()}
            });
        }
    }

    private handlePlayerSwitchingDoor(doorId: number,
                                      callback?: () => void) {

        this.setState(state => {
            state.gameSession.setDoorIdPickedByPlayer(doorId)
            state.gameSession.openDoor(doorId)
            state.gameSession.addLog("Player Switched to Door : " + doorId)
            state.gameSession.completeGameSession()
            if (doorId == this.state.gameSession.getWinningDoorId()) {
                state.gameSession.addLog("This is the Door with the Prize")
                state.gameSession.addLog("Player has won this round!")
                state.allGameScores.registerNewGameDetails(StrategyType.SWITCH, true)
            } else {
                state.gameSession.addLog("There is nothing behind this door")
                state.gameSession.addLog("Player has lost this round!")
                state.allGameScores.registerNewGameDetails(StrategyType.SWITCH, false)
            }
            return {
                gameSession : state.gameSession,
                allGameScores : state.allGameScores
            };
        }, () => {
            if (callback) {callback()}
        });
    }

    private handlePlayerStickingToDoor(callback?: () => void) {

        this.setState(state => {
            state.gameSession.openDoor(this.state.gameSession.getDoorIdPickedByPlayer()!)
            state.gameSession.addLog("Player Stuck to Door : " + this.state.gameSession.getDoorIdPickedByPlayer())
            state.gameSession.completeGameSession()
            if (this.state.gameSession.getDoorIdPickedByPlayer() == this.state.gameSession.getWinningDoorId()) {
                state.gameSession.addLog("This is the Door with the Prize")
                state.gameSession.addLog("Player has won this round!")
                state.allGameScores.registerNewGameDetails(StrategyType.STICK, true)
            } else {
                state.gameSession.addLog("There is nothing behind this door")
                state.gameSession.addLog("Player has lost this round!")
                state.allGameScores.registerNewGameDetails(StrategyType.STICK, false)
            }
            return {
                gameSession : state.gameSession,
                allGameScores : state.allGameScores
            };
        }, () => {
            if (callback) {callback()}
        });
    }

    private haveAIStartPlayingNextRound() {
        setTimeout(() => {
            this.resetGame();
            if (this.state.aiSettings.isAiPlaying
                && (this.state.allGameScores.strategyTypeToNumberOfGamesPlayed.get(StrategyType.ANY)! < this.state.aiSettings.gamesToPlay)) {
                this.start()
            } else {
                this.stop()
            }
        }, this.state.aiSettings.waitTime)
    }

    private updateNumberOfGames(gamesToPlay : number) {

        this.setState(state => {
            state.aiSettings.gamesToPlay = gamesToPlay
            return {aiSettings : state.aiSettings}
        });
    }

    private updateWaitTime(waitTime : number) {

        this.setState(state => {
            state.aiSettings.waitTime = waitTime
            return {aiSettings : state.aiSettings}
        });
    }

    private updateComputerType(_: React.ChangeEvent<HTMLInputElement>, value: string) {

        this.setState(state => {
            state.aiSettings.aiType = value as AIType
            return {aiSettings : state.aiSettings}
        });
    }

    private isWinningDoor(doorId : number) : boolean {
        return this.state.gameSession.getWinningDoorId() == doorId
    }

    private getSwitchDoorId() : number {
        return [1, 2, 3]
            .filter(id => id != this.state.gameSession.getDoorIdPickedByPlayer())
            .filter(id => id != this.state.gameSession.getDoorIdOpenedByHost())
            [0];
    }

    private shouldAnimationBeEnabled() {
        return !this.state.aiSettings.isAiPlaying || this.state.aiSettings.waitTime >= 250
    }

    private buildClassNames(defaultClasses : string[],
                            conditionalClasses?: {condition : () => boolean, classes : string[]}[]) : string {

        let classNames = "";
        defaultClasses.forEach(className => classNames += " " + className);

        if (conditionalClasses) {

            conditionalClasses
                .forEach((conditionalClass) => conditionalClass.condition()
                    ? classNames += " " + conditionalClass.classes.join(" ")
                    : ""
                )
        }
        return classNames
    }
}