import PassageMetadata from "./PassageMetadata";
export default class PassageMetadataCollection {
    items: {
        [key: string]: PassageMetadata;
    };
    add(passageMetadata: PassageMetadata): void;
    has(passageName: string): boolean;
    get(passageName: string): PassageMetadata;
    find(passageName: string): PassageMetadata | null;
}
//# sourceMappingURL=PassageMetadataCollection.d.ts.map