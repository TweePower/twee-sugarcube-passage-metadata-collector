(() => {
    function initialize() {
        window.passageMetadataApp.onBeforeAddMetadata.add((passageMetadata) => {
            // check that all passage have all required data
            if (typeof passageMetadata.backgroundColor !== 'string') {
                throw new Error(`PassageMetadata dostn't contain backgroundColor in ${passage()}`);
            }
            if (typeof passageMetadata.backgroundImage !== 'string') {
                throw new Error(`PassageMetadata dostn't contain backgroundImage in ${passage()}`);
            }

            // validate passage metadata thoughts and set thought as '...' by default
            if (!Array.isArray(passageMetadata.thoughts)) {
                passageMetadata.thoughts = [{condition: true, text: '...'}];
            } else {
                for (const thought of passageMetadata.thoughts) {
                    if (
                        typeof thought.condition !== 'boolean'
                        && typeof thought.condition !== 'string'
                    ) {
                        throw new Error(`PassageMetadata dostn't contain invalid thought.condition`);
                    }
                    // TODO: also here we can validate that twine script is valid

                    if (typeof thought.text !== 'string') {
                        throw new Error(`PassageMetadata dostn't contain invalid thought.text type (expected string, actual ${typeof thought.text})`);
                    }
                }
            }
        });

        // Use onBeforeStore and onBeforeRestore for optimize storage size
        window.passageMetadataApp.onBeforeStore.add((state) => {
            for (const passageName in state) {
                if (state[passageName] === null) {
                    continue;
                }

                if (state[passageName].backgroundColor !== undefined) {
                    state[passageName].c = state[passageName].backgroundColor;
                    delete state[passageName].backgroundColor;
                }
                if (state[passageName].backgroundImage !== undefined) {
                    state[passageName].i = state[passageName].backgroundImage;
                    delete state[passageName].backgroundImage;
                }
                if (state[passageName].throughGroup !== undefined) {
                    state[passageName].t = state[passageName].throughGroup;
                    delete state[passageName].throughGroup;
                }
            }
        });

        window.passageMetadataApp.onBeforeRestore.add((state) => {
            for (const passageName in state) {
                if (state[passageName] === null) {
                    continue;
                }

                if (state[passageName].c !== undefined) {
                    state[passageName].backgroundColor = state[passageName].c;
                    delete state[passageName].c;
                }
                if (state[passageName].i !== undefined) {
                    state[passageName].backgroundImage = state[passageName].i;
                    delete state[passageName].i;
                }
                if (state[passageName].t !== undefined) {
                    state[passageName].throughGroup = state[passageName].t;
                    delete state[passageName].t;
                }
            }
        });
    }

    window.addEventListener('passage-metadata-app-initialized', () => {
        initialize();
    });
    if (window.passageMetadataApp !== undefined) {
        initialize();
    }
})();
