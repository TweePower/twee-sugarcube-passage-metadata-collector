import SugarcubeFacade from "../facade/SugarcubeFacade";
import PassageMetadataApp from "../PassageMetadataApp";

export default (passageMetadataApp: PassageMetadataApp, sugarcubeFacade: SugarcubeFacade) => {
    sugarcubeFacade.addMacros('setPassageMetadataVariable', {
        handler: function() {
            if (this.args.length < 2 || this.args.length > 3) {
                return this.error(`Invalid number of arguments: expected 2 to 3, but received ${this.args.length}.`);
            }

            let passageMetadata = null;
            let key = null;
            let value = null;
            if (this.args.length === 3) {
                var passageName;
                if (typeof this.args[0] === 'object') {
                    passageName = this.args[0].link;
                } else {
                    passageName = this.args[0];
                }

                if (typeof this.args[1] !== 'string' && typeof this.args[1] !== 'number') {
                    return this.error(`Invalid type for second argument: expected string or number, but recived ${typeof this.args[1]}`);
                }

                passageMetadata = passageMetadataApp.get(passageName);
                key = this.args[1];
                value = this.args[2];
            } else {
                if (typeof this.args[0] !== 'string' && typeof this.args[0] !== 'number') {
                    return this.error(`Invalid type for second argument: expected string or number, but recived ${typeof this.args[0]}`);
                }

                passageMetadata = passageMetadataApp.get();
                key = this.args[0];
                value = this.args[1];
            }

            passageMetadata.setValue(key, value);
            passageMetadataApp.storeState();
        },
    });
}