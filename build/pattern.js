// repository: https://github.com/TweePower/twee-sugarcube-passage-metadata-collector

const passageMetadataWidgetName = 'PassageMetadata';
const mode = 'byTag';
const modeParams = { filterTag: 'passage_metadata' };

(function () {
    'use strict';

    /*<<PassageMetadataAppLibraryPlaceholder>>*/
    const PassageMetadataApp = PassageMetadataAppExport.default;

    ////////////////////////////////////////////
    /// Sugarcube hacks
    ////////////////////////////////////////////
    Engine = new Proxy(Engine, {
        get: function(target, prop) {
            if (prop === 'backward' || prop === 'forward') {
                jQuery.event.trigger({
                    type: ':called_' + prop,
                });
            }

            return target[prop];
        }
    });

    ////////////////////////////////////////////
    /// initialize PassageMetadataApp
    ////////////////////////////////////////////
    window.passageMetadataApp = new PassageMetadataApp(
        passageMetadataWidgetName,
        mode,
        modeParams,
    );

    $(document).on(':called_backward', function() {
        window.passageMetadataApp.resetPassageStateLoaded();
    });

    $(document).on(':called_forward', function() {
        window.passageMetadataApp.resetPassageStateLoaded();
    });

    Save.onLoad.add((save) => {
        if (save.state.history.length > 0) {
            window.passageMetadataApp.resetPassageStateLoaded();
        }
    });
})();
