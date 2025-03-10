import PassageMetadata from "../../src/PassageMetadata";
import PassageMetadataApp from "../../src/PassageMetadataApp";
import SugarcubeFacade from "../fixtures/SugarcubeFacadeMock";

const sugarcubeFacade = new SugarcubeFacade();
jest.mock('../../src/facade/SugarcubeFacade');

beforeEach(() => {
    (SugarcubeFacade as jest.Mock).mockImplementation(() => sugarcubeFacade);
});

test('success create run app', async () => {
    sugarcubeFacade.passages = [
        sugarcubeFacade.createPassage('test1', ['passage_metadata'], 'test passage text', {
            isEnabled: true,
            type: 'goto',
        })
    ]

    const passageMetadataApp = new PassageMetadataApp();
    passageMetadataApp.collect();

    const passageMetadata = passageMetadataApp.passageMetadataCollection?.get('test1');

    expect(passageMetadata).toBeInstanceOf(PassageMetadata);
    expect(passageMetadata?.passageName).toBe('test1');
    expect(passageMetadata?.data).toStrictEqual({
        passageName: 'test1',
        isEnabled: true,
        type: "goto",
    });
    expect(passageMetadata).toBeInstanceOf(PassageMetadata);
    expect(passageMetadata).toBeInstanceOf(PassageMetadata);
});
