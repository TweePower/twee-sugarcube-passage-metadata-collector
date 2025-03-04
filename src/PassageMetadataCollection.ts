import PassageMetadataError from "./error/PassageMetadataError";
import PassageMetadata from "./PassageMetadata";

export default class PassageMetadataCollection {
    public items: { [key: string]: PassageMetadata } = {};

    public add(passageMetadata: PassageMetadata): void {
        if (this.has(passageMetadata.passageName)) {
            throw new PassageMetadataError(`Passage metadata with name '${passageMetadata.passageName}' already exist`);
        }

        this.items[passageMetadata.passageName] = passageMetadata;
    }

    public has(passageName: string): boolean {
        if (typeof passageName !== 'string') {
            throw new PassageMetadataError(`passageName should be string`);
        }

        return this.items[passageName] !== undefined;
    }

    public get(passageName: string): PassageMetadata {
        if (!this.has(passageName)) {
            throw new PassageMetadataError(`PassageMetadata with passageName ${passageName} doesn't exist`);
        }

        return this.items[passageName];
    }

    public find(passageName: string): PassageMetadata | null {
        if (this.has(passageName) === false) {
            return null;
        }

        return this.items[passageName];
    }
}
