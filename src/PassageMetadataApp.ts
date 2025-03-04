import SugarcubeFacade from "./facade/SugarcubeFacade";
import PassageMetadataCollection from "./PassageMetadataCollection";
import PassageMetadataCollector from "./PassageMetadataCollector";
import PassageMetadataError from "./error/PassageMetadataError";
import PassageMetadataStateManager from "./PassageMetadataStateManager";
import EventHandlerCollection from "./EventHandlerCollection"
import { default as initializeMacros } from "./macros/index"
import PassageMetadata from "./PassageMetadata";

export default class PassageMetadataApp {
    private sugarcubeFacade: SugarcubeFacade;
    private passageMetadataCollector: PassageMetadataCollector;
    private passageMetadataStateManager: PassageMetadataStateManager;
    public passageMetadataCollection: PassageMetadataCollection|null;

    private _isPassageMetadataAppInitialized = false;
    private _isPassageMetadataCollected = false;
    private _isPassageStateLoaded = false;
    private _isPassageMetadataWidgetsInitialized = false;
    private _realCurrentPassage: string|null;

    public onBeforeAddMetadata: EventHandlerCollection;
    public onAfterAddMetadata: EventHandlerCollection;
    public onBeforeStore: EventHandlerCollection;
    public onBeforeRestore: EventHandlerCollection;

    constructor(
        private passageMetadataWidgetName: string = 'PassageMetadata',
        mode: string = 'byTag',// all
        modeParams: { filterTag?: string } = { filterTag: 'passage_metadata' }
    ) {
        this.sugarcubeFacade = new SugarcubeFacade();

        this.passageMetadataCollector = new PassageMetadataCollector(
            this.sugarcubeFacade,
            this.passageMetadataWidgetName,
            mode,
            modeParams
        );

        this.passageMetadataStateManager = new PassageMetadataStateManager(
            this.sugarcubeFacade,
        );

        // For detail see: https://github.com/tmedwards/sugarcube-2/pull/299
        this._realCurrentPassage = this.sugarcubeFacade.getCurrentPassage();
        $(document).on(':passageinit', (ev) => {
            this._realCurrentPassage = typeof ev.passage.name === 'string' ? ev.passage.name : ev.passage.title;
        });

        $(document).on(':passagestart', () => {
            // it necesarry to do on ':passagestart' event, becasue here Sugarcube varialbes already loaded
            if (this._isPassageMetadataAppInitialized === false) {
                this.collect();
                this.initWidgets();
            }

            this.loadState();
        })

        this.onBeforeAddMetadata = this.passageMetadataCollector.onBeforeAddMetadata;
        this.onAfterAddMetadata = this.passageMetadataCollector.onAfterAddMetadata;
        this.onBeforeStore = this.passageMetadataStateManager.onBeforeStore;
        this.onBeforeRestore = this.passageMetadataStateManager.onBeforeRestore;
    }

    get isPassageMetadataAppInitialized(): boolean {
        return this._isPassageMetadataAppInitialized;
    }

    get isPassageMetadataCollected(): boolean {
        return this._isPassageMetadataCollected;
    }

    get isPassageStateLoaded(): boolean {
        return this._isPassageStateLoaded;
    }

    get isPassageMetadataWidgetsInitialized(): boolean {
        return this._isPassageMetadataWidgetsInitialized;
    }

    public resetPassageStateLoaded(): void {
        this._isPassageStateLoaded = false;
    }

    get realCurrentPassage(): string|null {
        return this._realCurrentPassage;
    }

    public collect(force: boolean = false): void {
        if (force !== true && this._isPassageMetadataCollected === true) {
            return;
        }

        this._isPassageMetadataCollected = true;

        try {
            this.passageMetadataCollection = this.passageMetadataCollector.collect();
        } catch (error) {
            if (error instanceof PassageMetadataError) {
                error.message += " (" + Object.keys(error.scope).map(scopeKey => `${scopeKey}: ${error.scope[scopeKey]}`).join(', ');
            }

            throw error;
        }
    }

    public loadState(force: boolean = false): void {
        if (force !== true && this._isPassageStateLoaded === true) {
            return;
        }

        this._isPassageStateLoaded = true;

        try {
            this.passageMetadataStateManager.restore(this.passageMetadataCollection);
        } catch (error) {
            if (error instanceof PassageMetadataError) {
                error.message += " (" + Object.keys(error.scope).map(scopeKey => `${scopeKey}: ${error.scope[scopeKey]}`).join(', ');
            }

            throw error;
        }
    }

    public initWidgets(): void {
        if (this._isPassageMetadataWidgetsInitialized === true) {
            return;
        }

        this._isPassageMetadataWidgetsInitialized = true;
        const passageMetadataApp = this;

        this.sugarcubeFacade.addMacros(this.passageMetadataWidgetName, {
            handler: function () {
                return this.error('Passage metadata was not processed, please check passage tags');
            }
        })

        initializeMacros(this, this.sugarcubeFacade);
    }

    public storeState(): void {
        this.passageMetadataStateManager.store(this.passageMetadataCollection);
    }

    public isHasPassageMetadata(passageName: string | null = null): boolean {
        if (this.isPassageMetadataCollected === false) throw new Error('Passage matadata was not collected');

        if (passageName === null) {
            passageName = this._realCurrentPassage;
        }

        return this.passageMetadataCollection.has(passageName);
    }

    public getPassageMetadata(passageName: string | null = null): PassageMetadata | null {
        if (this.isPassageMetadataCollected === false) throw new Error('Passage matadata was not collected');

        if (passageName === null) {
            passageName = this._realCurrentPassage;
        }

        return this.passageMetadataCollection.find(passageName);
    }

    public getPassageMetadataValue(passageNameOrKey: string | number, key: string | number | null = null): any {
        if (this.isPassageMetadataCollected === false) throw new Error('Passage matadata was not collected');


        let passageName = this._realCurrentPassage;
        let valueKey = null;
        if (key === null) {
            valueKey = passageNameOrKey;
        } else {
            if (typeof passageNameOrKey !== 'string') {
                throw new TypeError(`${this.constructor.name}.getPassageMetadataValue: Invalid type for argument 'passageNameOrKey'. `
                    + `Expected string, got ${typeof passageNameOrKey}.`);
            }

            passageName = passageNameOrKey;
            valueKey = key;
        }

        return this.passageMetadataCollection.find(passageName)?.data[valueKey];
    }
}
