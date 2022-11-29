import RandomUtils from "../../utils/RandomUtils";

export default class MontyHallGameSession {

    private doorIdToOpenStatusMap : Map<number, boolean>;
    private logs : string[];
    private doorIdPickedByPlayer : number | undefined;
    private doorIdOpenedByHost: number | undefined;
    private isGameSessionOver: boolean;
    private readonly winningDoorId: number;

    constructor() {

        this.doorIdToOpenStatusMap = new Map([
            [1, false],
            [2, false],
            [3, false]
        ]);
        this.logs = [];
        this.doorIdPickedByPlayer = undefined;
        this.doorIdOpenedByHost = undefined;
        this.isGameSessionOver = false;
        this.winningDoorId = RandomUtils.getRandomNumber(1, 4);
    }

    isDoorOpen(doorId : number): boolean {
        return this.doorIdToOpenStatusMap.get(doorId)!
    }

    openDoor(doorId : number) {
        this.doorIdToOpenStatusMap.set(doorId, true)
    }

    getLogs(): string[] {
        return this.logs.slice();
    }

    addLog(log : string) {
        this.logs.push(log)
    }

    getDoorIdPickedByPlayer(): number | undefined {
        return this.doorIdPickedByPlayer;
    }

    getDoorIdOpenedByHost(): number | undefined {
        return this.doorIdOpenedByHost;
    }

    getWinningDoorId(): number {
        return this.winningDoorId;
    }

    setDoorIdPickedByPlayer(doorId : number) {
        this.doorIdPickedByPlayer = doorId;
    }

    setDoorIdOpenedByHost(doorId : number) {
        this.doorIdOpenedByHost = doorId;
    }

    getOpenableDoorIds() {
        return Array.from(this.doorIdToOpenStatusMap.keys())
            .filter(id => this.winningDoorId != id)
            .filter(id => this.doorIdPickedByPlayer != id)
    }

    getGameSessionOver(): boolean {
        return this.isGameSessionOver;
    }

    completeGameSession() {
        this.isGameSessionOver = true
    }
}