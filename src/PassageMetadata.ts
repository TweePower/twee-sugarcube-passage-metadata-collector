import PassageMetadataError from "./error/PassageMetadataError";

type DataType = {
    [key: string | number]: any
};

export default class PassageMetadata {
    private _data: DataType;
    private _originData: DataType;
    private _rewriteData: DataType | null;

    constructor(
        private _passageName: string,
        _data: DataType,
    ) {
        if (typeof _passageName !== 'string') {
            throw new PassageMetadataError(`Invalid passage name (expected: string, actual: ${typeof _passageName})`);
        }

        if (typeof _data !== 'object' || Array.isArray(_data) || _data === null) {
            throw new PassageMetadataError(`Invalid passage metadata (expected: object, actual: ${typeof _data})`);
        }

        this._data = { ..._data };
        this._originData = { ..._data };
        this._rewriteData = null;
    }

    get passageName(): string {
        return this._passageName;
    }

    get data(): DataType {
        return this._data;
    }

    public setValue(key: string | number, value: any): void {
        this._data[key] = value;

        if (this._rewriteData === null) this._rewriteData = {};

        this._rewriteData[key] = value;

        if (this._rewriteData[key] === this._originData[key]) {
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
        this._data = { ...this._originData };
    }
}
