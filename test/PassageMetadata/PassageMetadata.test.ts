import PassageMetadata from "../../src/PassageMetadata";

const defautlData = {
    passageName: 'test1',
    param: 'foo',
    2: 'bar',
    bool: true,
    object: {
        foo: 'bar',
    }
};

test('success create passage metadata with different data types', async () => {
    const passageMetadata = new PassageMetadata(defautlData);

    expect(passageMetadata).toBeInstanceOf(PassageMetadata);
    expect(passageMetadata.passageName).toEqual('test1');
    expect(passageMetadata.data).toMatchObject(defautlData);
    expect(passageMetadata.originData).toMatchObject(defautlData);
    expect(passageMetadata.rewriteData).toBeNull();
});

test('success set value', async () => {
    const passageMetadata = new PassageMetadata(defautlData);

    passageMetadata.setValue('param', 'bar');
    passageMetadata.setValue('bool', false);

    expect(passageMetadata.passageName).toEqual('test1');
    expect(passageMetadata.data).toMatchObject({
        param: 'bar',
        2: 'bar',
        bool: false,
        object: {
            foo: 'bar',
        }
    });
    expect(passageMetadata.originData).toMatchObject(defautlData);
    expect(passageMetadata.rewriteData).toMatchObject({
        'param': 'bar',
        'bool': false,
    });
});

test('success clean rewrite data', async () => {
    const passageMetadata = new PassageMetadata(defautlData);

    passageMetadata.setValue('param', 'bar');
    passageMetadata.setValue('bool', false);

    expect(passageMetadata.passageName).toEqual('test1');
    expect(passageMetadata.data).toMatchObject({
        param: 'bar',
        2: 'bar',
        bool: false,
        object: {
            foo: 'bar',
        }
    });
    expect(passageMetadata.rewriteData).toMatchObject({
        'param': 'bar',
        'bool': false,
    });

    passageMetadata.setValue('param', 'foo');
    passageMetadata.setValue('bool', true);

    expect(passageMetadata.data).toMatchObject(defautlData);
    expect(passageMetadata.rewriteData).toBeNull();
});
