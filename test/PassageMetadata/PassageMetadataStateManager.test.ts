import SugarcubeFacade from "../fixtures/SugarcubeFacadeMock";
import PassageMetadata from "../../src/PassageMetadata";
import PassageMetadataCollection from "../../src/PassageMetadataCollection";
import PassageMetadataStateManager from "../../src/PassageMetadataStateManager";

const passageMetadataFixture1 = new PassageMetadata('test1', { name: 'test1', foo: 'bar' });
const passageMetadataCollection = new PassageMetadataCollection();
passageMetadataCollection.add(passageMetadataFixture1);
const sugarcubeFacade = new SugarcubeFacade();
const passageMetadataStateManager = new PassageMetadataStateManager(sugarcubeFacade);

test('success restore values from history', async () => {
    sugarcubeFacade.setVariable('passageMetadataState', JSON.stringify({
        test1: {
            foo: 'baz',
            bar: 'boo'
        }
    }))

    passageMetadataStateManager.restore(passageMetadataCollection);

    expect(passageMetadataCollection.has('test1')).toBeTruthy();

    expect(passageMetadataCollection.get('test1').data).toMatchObject({
        name: 'test1',
        foo: 'baz',
        bar: 'boo',
    });
    expect(passageMetadataCollection.get('test1').rewriteData).toMatchObject({
        foo: 'baz',
        bar: 'boo',
    });
    expect(passageMetadataCollection.get('test1').originData).toMatchObject({
        name: 'test1',
        foo: 'bar',
    });
});

test('success store values to history', async () => {
    const passageMetadata = passageMetadataCollection.get('test1');
    passageMetadata.setValue('foo', 'baz');
    passageMetadata.setValue('bar', 'boo');

    passageMetadataStateManager.store(passageMetadataCollection);

    expect(sugarcubeFacade.getVariable('passageMetadataState')).toEqual(JSON.stringify({
        test1: {
            foo: 'baz',
            bar: 'boo',
        },
    }));
});

test('success store and restore', async () => {
    const passageMetadata = passageMetadataCollection.get('test1');
    passageMetadata.setValue('foo', 'baz');
    passageMetadata.setValue('bar', 'boo');

    passageMetadataStateManager.store(passageMetadataCollection);

    expect(sugarcubeFacade.getVariable('passageMetadataState')).toEqual(JSON.stringify({
        test1: {
            foo: 'baz',
            bar: 'boo',
        },
    }));

    const newPassageMetadataCollection = new PassageMetadataCollection();
    newPassageMetadataCollection.add(passageMetadataFixture1);

    passageMetadataStateManager.restore(newPassageMetadataCollection);

    expect(newPassageMetadataCollection.has('test1')).toBeTruthy();

    expect(newPassageMetadataCollection.get('test1').data).toMatchObject({
        name: 'test1',
        foo: 'baz',
        bar: 'boo',
    });
    expect(newPassageMetadataCollection.get('test1').rewriteData).toMatchObject({
        foo: 'baz',
        bar: 'boo',
    });
    expect(newPassageMetadataCollection.get('test1').originData).toMatchObject({
        name: 'test1',
        foo: 'bar',
    });
});
