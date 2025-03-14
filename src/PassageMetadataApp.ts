import SugarcubeFacade from "./facade/SugarcubeFacade";
import PassageMetadataCollection from "./PassageMetadataCollection";
import PassageMetadataCollector from "./PassageMetadataCollector";
import PassageMetadataError from "./error/PassageMetadataError";
import PassageMetadataStateManager, { PassageMetadataStateType } from "./PassageMetadataStateManager";
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

    public onBeforeAddMetadata: EventHandlerCollection<{[key: string | number]: any}>;
    public onAfterAddMetadata: EventHandlerCollection<PassageMetadata>;
    public onBeforeStore: EventHandlerCollection<PassageMetadataStateType>;
    public onBeforeRestore: EventHandlerCollection<PassageMetadataStateType>;

    constructor(
        private _passageMetadataWidgetName: string = 'PassageMetadata',
        private _mode: string = 'byTag',// all
        private _modeParams: { filterTag?: string } = { filterTag: 'passage_metadata' }
    ) {
        this.sugarcubeFacade = new SugarcubeFacade();

        this.passageMetadataCollector = new PassageMetadataCollector(
            this.sugarcubeFacade,
            _passageMetadataWidgetName,
            _mode,
            _modeParams
        );

        this.passageMetadataStateManager = new PassageMetadataStateManager(
            this.sugarcubeFacade,
        );

        // For detail see: https://github.com/tmedwards/sugarcube-2/pull/299
        this._realCurrentPassage = this.sugarcubeFacade.getCurrentPassage();
        $(document).on(':passageinit', (ev) => {
            const passage: any = ev.passage;
            this._realCurrentPassage = typeof passage.name === 'string' ? passage.name : passage.title;
        });

        $(document).on(':passagestart', () => {
            // it necesarry to do on ':passagestart' event, becasue here Sugarcube varialbes already loaded
            if (this._isPassageMetadataAppInitialized === false) {
                this._isPassageMetadataAppInitialized = true;

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

    get passageMetadataWidgetName(): string {
        return this._passageMetadataWidgetName;
    }

    get mode(): string {
        return this._mode;
    }

    get modeParams(): { filterTag?: string } {
        return clone(this._modeParams);
    }

    get isInitialized(): boolean {
        return this._isPassageMetadataAppInitialized;
    }

    get isCollected(): boolean {
        return this._isPassageMetadataCollected;
    }

    get isStateLoaded(): boolean {
        return this._isPassageStateLoaded;
    }

    get isWidgetsInitialized(): boolean {
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
                error.message += " (" + Object.keys(error.scope).map(scopeKey => `${scopeKey}: ${error.scope[scopeKey]}`).join(', ') + ')';
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

        this.sugarcubeFacade.addMacros(this._passageMetadataWidgetName, {
            handler: function () {
                return this.error('Passage metadata was not processed, please check passage tags');
            }
        })

        initializeMacros(this, this.sugarcubeFacade);
    }

    public storeState(): void {
        this.passageMetadataStateManager.store(this.passageMetadataCollection);
    }

    public has(passageName: string | null = null): boolean {
        if (this.isCollected === false) throw new Error('Passage matadata was not collected');

        if (passageName === null) {
            passageName = this._realCurrentPassage;
        }

        return this.passageMetadataCollection.has(passageName);
    }

    public previousHas(): boolean {
        if (this.isCollected === false) throw new Error('Passage matadata was not collected');

        return this.passageMetadataCollection.has(previous());
    }

    public find(passageName: string | null = null): PassageMetadata | null {
        if (this.isCollected === false) throw new Error('Passage matadata was not collected');

        if (passageName === null) {
            passageName = this._realCurrentPassage;
        }

        return this.passageMetadataCollection.find(passageName);
    }

    public get(passageName: string | null = null): PassageMetadata | null {
        if (this.isCollected === false) throw new Error('Passage matadata was not collected');

        if (passageName === null) {
            passageName = this._realCurrentPassage;
        }

        return this.passageMetadataCollection.get(passageName);
    }

    public getValue(passageNameOrKey: string | number, key: string | number | null = null): any {
        if (this.isCollected === false) throw new Error('Passage matadata was not collected');

        let passageName = this._realCurrentPassage;
        let valueKey = null;
        if (key === null) {
            valueKey = passageNameOrKey;
        } else {
            if (typeof passageNameOrKey !== 'string') {
                throw new TypeError(`${this.constructor.name}.getValue: Invalid type for argument 'passageNameOrKey'. `
                    + `Expected string, got ${typeof passageNameOrKey}.`);
            }

            passageName = passageNameOrKey;
            valueKey = key;
        }

        return this.passageMetadataCollection.find(passageName)?.data[valueKey];
    }
}
