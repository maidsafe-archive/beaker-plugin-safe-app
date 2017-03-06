/*
* Manifest for Beaker:
* https://github.com/pfrazee/beaker/blob/master/doc/authoring-plugins.md#api-manifests
*/
const manifest = {
    test          : 'promise',
};

const test = function(id) {
   console.log("Hey dude! ", id);
   return Promise.resolve(id);
}

module.exports = {manifest, test}
