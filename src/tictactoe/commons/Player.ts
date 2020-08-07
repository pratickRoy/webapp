export default class Player {

    private readonly _name: string
    private readonly _side: string
    private readonly _styleClass: string

    constructor(name: string, side: string, styleClass: string) {
        this._name = name;
        this._side = side;
        this._styleClass = styleClass;
    }

    get name(): string {
        return this._name;
    }

    get side(): string {
        return this._side;
    }

    get styleClass(): string {
        return this._styleClass;
    }
}