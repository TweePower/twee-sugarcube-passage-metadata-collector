import { default as BaseSugarcubeFacade } from "../../src/facade/SugarcubeFacade";

type PassageType = { tags: string[], title: string, element: { textContent: string } };

export default class SugarcubeFacade extends BaseSugarcubeFacade {
    passages: PassageType[] = [];
    variables: {[key: string]: string | number | boolean} = {};

    createPassage(title: string, tags: string[], content: string, metadata: { [key: string]: any } | null = null ): PassageType {
        let resultContent = '';
        if (metadata !== null) {
            resultContent = `<<PassageMetadata>>\n${JSON.stringify(metadata, null, 4)}<</PassageMetadata>>\n`
        }
        resultContent += content;

        return {
            title: title,
            tags: tags,
            element: {
                textContent: resultContent
            }
        }
    }

    setPassagesList(passages: PassageType[]) {
        this.passages = passages;
    }

    getAllPassages(): PassageType[] {
        return this.passages;
    }

    setVariable(name: string, value: any): void {
        this.variables[name] = value;
    }

    getVariable(name: string): string | number | boolean {
        return this.variables[name];
    }

    saveVariable(name: string, value: string | number | boolean): void {
        this.setVariable(name, value)
    }
}
