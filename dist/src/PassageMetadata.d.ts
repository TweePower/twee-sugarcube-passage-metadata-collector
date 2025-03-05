type DataType = {
    [key: string | number]: any;
};
export default class PassageMetadata {
    private _passageName;
    private _data;
    private _originData;
    private _rewriteData;
    constructor(_passageName: string, _data: DataType);
    get passageName(): string;
    get data(): DataType;
    setValue(key: string | number, value: any): void;
    get originData(): DataType;
    get rewriteData(): DataType;
    reset(): void;
}
export {};
//# sourceMappingURL=PassageMetadata.d.ts.map