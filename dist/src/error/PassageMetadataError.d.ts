type ScopeType = {
    [key: string]: string;
};
export default class PassageMetadataError extends Error {
    scope: ScopeType;
    constructor(message: string, scope?: ScopeType);
    static fromPreviousError(previousError: Error, scope?: ScopeType): PassageMetadataError;
}
export {};
//# sourceMappingURL=PassageMetadataError.d.ts.map