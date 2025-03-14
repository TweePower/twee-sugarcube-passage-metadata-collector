import clone from "clone";
import SugarcubeFacade from "./facade/SugarcubeFacade";
import PassageMetadataCollection from "./PassageMetadataCollection";
import EventHandlerCollection from "./EventHandlerCollection"

export type PassageMetadataStateType = {
    [ passageName: string]: {
        [ metadataProperty: string ]: any
    }
};

export default class PassageMetadataStateManager {
    public onBeforeStore = new EventHandlerCollection<PassageMetadataStateType>();
    public onBeforeRestore = new EventHandlerCollection<PassageMetadataStateType>();

    constructor(
        private sugarcubeFacade: SugarcubeFacade,
        private sugarcubeHistoryVariableName: string = 'passageMetadataState'
    ) {
    }

    public store(passageMetadataCollection: PassageMetadataCollection): void {
        let state: PassageMetadataStateType = {};
        for (const passageName in passageMetadataCollection.items) {
            const passageMetadata = passageMetadataCollection.items[passageName];

            if (passageMetadata.rewriteData !== null) {
                state[passageName] = clone(passageMetadata.rewriteData);
            }
        }

        this.onBeforeStore.all().forEach((handler) => {
            handler(state);
        });
        this.sugarcubeFacade.saveVariable(this.sugarcubeHistoryVariableName, this.serialize(state));
    }

    public restore(passageMetadataCollection: PassageMetadataCollection): void {
        const historyData = this.sugarcubeFacade.getVariable(this.sugarcubeHistoryVariableName);

        if (typeof historyData !== 'string') {
            return;
        }

        const state = this.deserialize(historyData);

        // reset before fill from history
        for (const passageName in passageMetadataCollection.items) {
            passageMetadataCollection.items[passageName].reset();
        }

        this.onBeforeRestore.all().forEach((handler) => {
            handler(state);
        });
        for (const passageName in state) {
            if (!passageMetadataCollection.has(passageName)) {
                continue;
            }

            const passageRewriteMetadata = state[passageName];
            for (const key in passageRewriteMetadata) {
                passageMetadataCollection.get(passageName).setValue(key, passageRewriteMetadata[key]);
            }
        }
    }

    private deserialize(data: string): PassageMetadataStateType {
        return JSON.parse(data);
    }

    private serialize(data: PassageMetadataStateType): string {
        return JSON.stringify(data);
    }
}
