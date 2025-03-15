import clone from "clone";
import equal from "fast-deep-equal";
import PassageMetadataError from "./error/PassageMetadataError";

type DataType = {
    [key: string | number]: any
};

export default class PassageMetadata {
    private _data: DataType;
    private _originData: DataType;
    private _rewriteData: DataType | null;

    constructor(data: DataType) {
        if (typeof data !== 'object' || Array.isArray(data) || data === null) {
            throw new PassageMetadataError(`Invalid passage metadata (expected: object, actual: ${typeof data})`);
        }

        if (typeof data.passageName !== 'string') {
            throw new PassageMetadataError(`Invalid passage name (expected: string, actual: ${typeof data.passageName})`);
        }

        this._data = clone(data);
        this._originData = clone(data);
        this._rewriteData = null;
    }

    get passageName(): string {
        return this._data.passageName;
    }

    get data(): DataType {
        return this._data;
    }

    public setValue(key: string | number, value: any): void {
        this._data[key] = value;

        if (this._rewriteData === null) this._rewriteData = {};

        this._rewriteData[key] = value;

        if (equal(this._rewriteData[key], this._originData[key])) {
            delete this._rewriteData[key];
        }

        if (Object.keys(this._rewriteData).length <= 0) {
            this._rewriteData = null;
        }
    }

    get originData(): DataType {
        return this._originData;
    }

    get rewriteData(): DataType {
        return this._rewriteData;
    }

    public reset(): void {
        this._rewriteData = null;
        this._data = clone(this._originData);
    }
}
