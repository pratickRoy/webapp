import {IconDefinition} from "@fortawesome/fontawesome-common-types";

export default class HomePageFragmentMeta {

    private readonly _id: string;
    private readonly _displayName: string;
    private readonly _iconDefinition: IconDefinition;

    constructor(id: string, displayName: string, iconDefinition: IconDefinition) {
        this._id = id;
        this._displayName = displayName;
        this._iconDefinition = iconDefinition;
    }

    get id(): string {
        return this._id;
    }

    get displayName(): string {
        return this._displayName;
    }

    get iconDefinition(): IconDefinition {
        return this._iconDefinition;
    }
}