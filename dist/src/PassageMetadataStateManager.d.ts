import SugarcubeFacade from "./facade/SugarcubeFacade";
import PassageMetadataCollection from "./PassageMetadataCollection";
import EventHandlerCollection from "./EventHandlerCollection";
export type PassageMetadataStateType = {
    [passageName: string]: {
        [metadataProperty: string]: any;
    };
};
export default class PassageMetadataStateManager {
    private sugarcubeFacade;
    private sugarcubeHistoryVariableName;
    onBeforeStore: EventHandlerCollection;
    onBeforeRestore: EventHandlerCollection;
    constructor(sugarcubeFacade: SugarcubeFacade, sugarcubeHistoryVariableName?: string);
    store(passageMetadataCollection: PassageMetadataCollection): void;
    restore(passageMetadataCollection: PassageMetadataCollection): void;
    private deserialize;
    private serialize;
}
//# sourceMappingURL=PassageMetadataStateManager.d.ts.map