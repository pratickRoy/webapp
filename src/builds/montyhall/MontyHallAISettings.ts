import RandomUtils from "../../utils/RandomUtils";

export enum AIType {
    ALWAYS_STICK = "ALWAYS_STICK",
    ALWAYS_SWITCH = "ALWAYS_SWITCH",
    RANDOM = "RANDOM"
}

export default class MontyHallAISettings {

    private _gamesToPlay : number;
    private _aiType : AIType;
    private _waitTime : number;
    private _isAiPlaying: boolean;

    constructor() {

        this._gamesToPlay = 10000;
        this._aiType = AIType.RANDOM;
        this._waitTime = 0;
        this._isAiPlaying = false;
    }

    get isAiPlaying(): boolean {
        return this._isAiPlaying;
    }

    set isAiPlaying(value: boolean) {
        this._isAiPlaying = value;
    }
    get waitTime(): number {
        return this._waitTime;
    }

    set waitTime(value: number) {
        this._waitTime = value;
    }
    get aiType(): AIType {
        return this._aiType;
    }

    set aiType(value: AIType) {
        this._aiType = value;
    }
    get gamesToPlay(): number {
        return this._gamesToPlay;
    }

    set gamesToPlay(value: number) {
        this._gamesToPlay = value;
    }
}