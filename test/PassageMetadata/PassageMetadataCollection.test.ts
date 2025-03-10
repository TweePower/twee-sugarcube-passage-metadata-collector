import PassageMetadata from "../../src/PassageMetadata";
import PassageMetadataCollection from "../../src/PassageMetadataCollection";

const passageMetadataFixture1 = new PassageMetadata({ passageName: 'test1', foo: 'bar' });
const passageMetadataFixture2 = new PassageMetadata({ passageName: 'test2', foo: 'bar' });
const passageMetadataCollection = new PassageMetadataCollection();
passageMetadataCollection.add(passageMetadataFixture1);

test('success has', async () => {
    expect(passageMetadataCollection.has('test1')).toBeTruthy();
});

test('fail has', async () => {
    expect(passageMetadataCollection.has('noname')).toBeFalsy();
});

test('success add', async () => {
    passageMetadataCollection.add(passageMetadataFixture2);

    expect(passageMetadataCollection.get('test2')).toBe(passageMetadataFixture2);
});

test('fail add duplicated passage name', async () => {
    expect(() => passageMetadataCollection.add(passageMetadataFixture1)).toThrowError(`Passage metadata with name 'test1' already exist`);
});

test('success find', async () => {
    expect(passageMetadataCollection.find('test1')).toBe(passageMetadataFixture1);
});

test('fail find', async () => {
    expect(passageMetadataCollection.find('noname')).toBeNull();
});

test('success get', async () => {
    expect(passageMetadataCollection.get('test1')).toBe(passageMetadataFixture1);
});

test('fail get', async () => {
    expect(() => passageMetadataCollection.get('noname')).toThrow();
});

test('success update data', async () => {
    const passageMetadata = passageMetadataCollection.get('test1');
    passageMetadata.setValue('foo', 'baz');

    expect(passageMetadataCollection.get('test1').data).toMatchObject({
        foo: 'baz',
        passageName: 'test1',
    });
});
