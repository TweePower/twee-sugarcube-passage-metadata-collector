import PassageMetadata from "./PassageMetadata";
import PassageMetadataCollection from "./PassageMetadataCollection";
import PassageMetadataError from "./error/PassageMetadataError";
import SugarcubeFacade from "./facade/SugarcubeFacade";
import EventHandlerCollection from "./EventHandlerCollection"

export default class PassageMetadataCollector {
    private passageMetadataRegex: RegExp;
    public onBeforeAddMetadata = new EventHandlerCollection<{[key: string | number]: any}>();
    public onAfterAddMetadata = new EventHandlerCollection<PassageMetadata>();

    constructor(
        private sugarcubeFacade: SugarcubeFacade,
        passageMetadataWidgetName: string = 'PassageMetadata',
        private mode: string = 'byTag',// all
        private modeParams: { filterTag?: string } = { filterTag: 'passage_metadata' }
    ) {
        if (typeof passageMetadataWidgetName !== 'string') {
            throw new TypeError(`${this.constructor.name}.constructor: Invalid type for argument 'passageMetadataWidgetName'. `
                + `Expected RegExp, got ${typeof passageMetadataWidgetName}.`);
        }

        if (!(/^[a-zA-Z]+$/gs.test(passageMetadataWidgetName))) {
            throw new RangeError(`${this.constructor.name}.constructor: Invalid value for argument 'passageMetadataWidgetName'. `
                + `Expected string [a-zA-Z]+, got ${passageMetadataWidgetName}.`);
        }

        this.passageMetadataRegex = new RegExp(`<<${passageMetadataWidgetName}>>(.*)<<\/${passageMetadataWidgetName}>>`, 'gms');

        if (typeof mode !== 'string') {
            throw new TypeError(`${this.constructor.name}.constructor: Invalid type for argument 'mode'. `
                + `Expected string, got ${typeof mode}.`);
        }

        if (!['byTag', 'all'].includes(mode)) {
            throw new RangeError(`${this.constructor.name}.constructor: Invalid value for argument 'mode'. `
                + `Expected 'byTag' or 'all', got ${mode}.`);
        }

        if (mode === 'byTag' && typeof modeParams.filterTag !== 'string') {
            throw new TypeError(`${this.constructor.name}.constructor: Invalid type for argument 'modeParams.filterTag'. `
                + `Expected string, got ${typeof modeParams.filterTag}.`);
        }
    }

    public collect(): PassageMetadataCollection {
        let passages = this.sugarcubeFacade.getAllPassages();

        if (this.mode === 'byTag') {
            passages = passages.filter(passge => passge.tags.includes(this.modeParams.filterTag) );
        }

        const passageMetadataCollection = new PassageMetadataCollection();
        passages.forEach((passage: {[key: string]: any}) => {
            const passageName = typeof passage.name === 'string' ? passage.name : passage.title;
            this.passageMetadataRegex.lastIndex = 0;
            const passageMetadataRegexResult = this.passageMetadataRegex.exec(passage.element.textContent);

            if (this.mode === 'byTag' && passageMetadataRegexResult === null) {
                throw new PassageMetadataError(`Passage metadata not found in ${passageName}`);
            }

            try {
                let passageMetadataEvalResult: {[key: string]: any} = this.createPassageMetadataObject(passageMetadataRegexResult[1]);

                passageMetadataEvalResult = {
                    passageName: passageName,
                    ...passageMetadataEvalResult,
                };

                this.onBeforeAddMetadata.all().forEach((handler) => {
                    handler(passageMetadataEvalResult);
                });

                const passageMetadata = new PassageMetadata(passageMetadataEvalResult)
                passageMetadataCollection.add(passageMetadata);

                this.onAfterAddMetadata.all().forEach((handler) => {
                    handler(passageMetadata);
                });
            } catch (error) {
                throw PassageMetadataError.fromPreviousError(error, {'passageName': passageName});
            }

            // remove definition from passage
            passage.element.textContent = passage.element.textContent.replace(passageMetadataRegexResult[0], '');
        });

        return passageMetadataCollection;
    }

    private createPassageMetadataObject(passageMetadata: string): { name: string } {
        let passageMetadataEvalResult: { name: string };

        try {
            eval('passageMetadataEvalResult = ' + passageMetadata);

            if (
                typeof passageMetadataEvalResult !== 'object'
                || Array.isArray(passageMetadataEvalResult)
                || passageMetadataEvalResult === null
            ) {
                throw new PassageMetadataError("Passage metadata JSON should contain object");
            }
        } catch (error) {
            throw new PassageMetadataError(`Invalid passage metadata JSON: ${error.message}`);
        }

        return passageMetadataEvalResult;
    }
}
