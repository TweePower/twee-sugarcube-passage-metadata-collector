import PassageMetadataCollection from "./PassageMetadataCollection";
import SugarcubeFacade from "./facade/SugarcubeFacade";
import EventHandlerCollection from "./EventHandlerCollection";
export default class PassageMetadataCollector {
    private sugarcubeFacade;
    private mode;
    private modeParams;
    private passageMetadataRegex;
    onBeforeAddMetadata: EventHandlerCollection;
    onAfterAddMetadata: EventHandlerCollection;
    constructor(sugarcubeFacade: SugarcubeFacade, passageMetadataWidgetName?: string, mode?: string, // all
    modeParams?: {
        filterTag?: string;
    });
    collect(): PassageMetadataCollection;
    private createPassageMetadataObject;
}
//# sourceMappingURL=PassageMetadataCollector.d.ts.map