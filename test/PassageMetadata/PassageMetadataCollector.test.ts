import PassageMetadataCollector from "../../src/PassageMetadataCollector";
import SugarcubeFacade from "../fixtures/SugarcubeFacadeMock";

const sugarcubeFacadeMock = new SugarcubeFacade();

test('success throw an error with empty passage metadata and search type is byTag', async () => {
    sugarcubeFacadeMock.setPassagesList([
        sugarcubeFacadeMock.createPassage('test1', ['passage_metadata'], 'my test content', null),
    ]);
    const passageMetadataCollector = new PassageMetadataCollector(sugarcubeFacadeMock);

    expect(() => passageMetadataCollector.collect()).toThrowError('Passage metadata not found in test1');
});

test('success skip with empty passage metadata and search type is byTag', async () => {
    sugarcubeFacadeMock.setPassagesList([
        sugarcubeFacadeMock.createPassage('test1', ['passage_metadata'], 'my test content', null),
    ]);
    const passageMetadataCollector = new PassageMetadataCollector(
        sugarcubeFacadeMock,
        'PassageMetadata',
        'all'
    );

    expect(passageMetadataCollector.collect).toThrowError();
});

test('success create PassageMetadata', async () => {
    sugarcubeFacadeMock.setPassagesList([
        sugarcubeFacadeMock.createPassage('test1', ['passage_metadata'], 'my test content', {
            isEnabled: true,
            type: "goto",
        }),
    ]);
    const passageMetadataCollector = new PassageMetadataCollector(sugarcubeFacadeMock);
    const passageMetadataCollection = passageMetadataCollector.collect();

    const passageMetadata = passageMetadataCollection.get('test1');

    expect(passageMetadata.passageName).toEqual('test1');
    expect(passageMetadata.data).toMatchObject({
        passageName: 'test1',
        isEnabled: true,
        type: "goto",
    });
    expect(passageMetadata.originData).toMatchObject({
        passageName: 'test1',
        isEnabled: true,
        type: "goto",
    });
    expect(passageMetadata.rewriteData).toBeNull();
});

test('success throw an error with invalid JSON in PassageMetadata', async () => {
    sugarcubeFacadeMock.setPassagesList([
        {
            title: 'test1',
            tags: ['passage_metadata'],
            element: {
                textContent: '<<PassageMetadata>>\ninvalid data<</PassageMetadata>>\nsome passage content'
            }
        },
    ]);
    const passageMetadataCollector = new PassageMetadataCollector(sugarcubeFacadeMock);

    expect(() => passageMetadataCollector.collect()).toThrowError(`Invalid passage metadata JSON: Unexpected identifier 'data'`)
});

test('success throw an error with invalid format in PassageMetadata', async () => {
    sugarcubeFacadeMock.setPassagesList([
        {
            title: 'test1',
            tags: ['passage_metadata'],
            element: {
                textContent: '<<PassageMetadata>>\n["invalid format"]<</PassageMetadata>>\nsome passage content'
            }
        },
    ]);
    const passageMetadataCollector = new PassageMetadataCollector(sugarcubeFacadeMock);

    expect(() => passageMetadataCollector.collect()).toThrowError(`Invalid passage metadata JSON: Passage metadata JSON should contain object`)
});
