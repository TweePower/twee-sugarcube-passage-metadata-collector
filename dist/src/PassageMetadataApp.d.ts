import PassageMetadataCollection from "./PassageMetadataCollection";
import EventHandlerCollection from "./EventHandlerCollection";
import PassageMetadata from "./PassageMetadata";
export default class PassageMetadataApp {
    private passageMetadataWidgetName;
    private sugarcubeFacade;
    private passageMetadataCollector;
    private passageMetadataStateManager;
    passageMetadataCollection: PassageMetadataCollection | null;
    private _isPassageMetadataAppInitialized;
    private _isPassageMetadataCollected;
    private _isPassageStateLoaded;
    private _isPassageMetadataWidgetsInitialized;
    private _realCurrentPassage;
    onBeforeAddMetadata: EventHandlerCollection;
    onAfterAddMetadata: EventHandlerCollection;
    onBeforeStore: EventHandlerCollection;
    onBeforeRestore: EventHandlerCollection;
    constructor(passageMetadataWidgetName?: string, mode?: string, // all
    modeParams?: {
        filterTag?: string;
    });
    get isPassageMetadataAppInitialized(): boolean;
    get isPassageMetadataCollected(): boolean;
    get isPassageStateLoaded(): boolean;
    get isPassageMetadataWidgetsInitialized(): boolean;
    resetPassageStateLoaded(): void;
    get realCurrentPassage(): string | null;
    collect(force?: boolean): void;
    loadState(force?: boolean): void;
    initWidgets(): void;
    storeState(): void;
    isHasPassageMetadata(passageName?: string | null): boolean;
    getPassageMetadata(passageName?: string | null): PassageMetadata | null;
    getPassageMetadataValue(passageNameOrKey: string | number, key?: string | number | null): any;
}
//# sourceMappingURL=PassageMetadataApp.d.ts.map