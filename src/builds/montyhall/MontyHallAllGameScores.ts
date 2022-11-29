import RandomUtils from "../../utils/RandomUtils";

export enum StrategyType {
    STICK = "STICK",
    SWITCH = "SWITCH",
    ANY = "ANY"
}

export default class MontyHallAllGameScores {

    private _strategyTypeToNumberOfGamesPlayed : Map<StrategyType, number> = new Map([
        [StrategyType.ANY, 0],
        [StrategyType.SWITCH, 0],
        [StrategyType.STICK, 0]
    ]);
    private _strategyTypeToNumberOfGamesWon : Map<StrategyType, number> = new Map([
        [StrategyType.ANY, 0],
        [StrategyType.SWITCH, 0],
        [StrategyType.STICK, 0]
    ]);
    private _strategyTypeToNumberOfGamesWonPercentage : Map<StrategyType, number> = new Map([
        [StrategyType.ANY, 0],
        [StrategyType.SWITCH, 0],
        [StrategyType.STICK, 0]
    ]);

    registerNewGameDetails(type : StrategyType, didPlayerWin : boolean) {

        this.registerNewGameDetailsForType(StrategyType.ANY, didPlayerWin);
        this.registerNewGameDetailsForType(type, didPlayerWin); // For either Stick or Switch Strategy
    }

    private registerNewGameDetailsForType(type : StrategyType, didPlayerWin : boolean) {

        const newNumberOfGamesPlayed = this._strategyTypeToNumberOfGamesPlayed.get(type)! + 1;
        const newNumberOfGamesWon = this._strategyTypeToNumberOfGamesWon.get(type)! + (didPlayerWin ? 1 : 0);

        this._strategyTypeToNumberOfGamesPlayed.set(type, newNumberOfGamesPlayed);
        this._strategyTypeToNumberOfGamesWon.set(type, newNumberOfGamesWon);
        this._strategyTypeToNumberOfGamesWonPercentage.set(type, (newNumberOfGamesWon / newNumberOfGamesPlayed) * 100);
    }

    get strategyTypeToNumberOfGamesPlayed(): Map<StrategyType, number> {
        return this._strategyTypeToNumberOfGamesPlayed;
    }

    get strategyTypeToNumberOfGamesWon(): Map<StrategyType, number> {
        return this._strategyTypeToNumberOfGamesWon;
    }

    get strategyTypeToNumberOfGamesWonPercentage(): Map<StrategyType, number> {
        return this._strategyTypeToNumberOfGamesWonPercentage;
    }
}