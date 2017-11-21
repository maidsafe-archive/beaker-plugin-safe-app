# beaker-plugin-safe-app

**Maintainer:** Krishna Kumar (krishna.kumar@maidsafe.net)

SAFE App API plugin for SAFE Browser.

|Linux/OS X|Windows|
|:---:|:--------:|
|[![Build Status](https://travis-ci.org/maidsafe/beaker-plugin-safe-app.svg?branch=master)](https://travis-ci.org/maidsafe/beaker-plugin-safe-app)|[![Build status](https://ci.appveyor.com/api/projects/status/684fxjpg88vu87hf/branch/master?svg=true)](https://ci.appveyor.com/project/MaidSafe-QA/beaker-plugin-safe-app/branch/master)|

## Documentation

The documentation for the safeApp DOM API is available at http://docs.maidsafe.net/beaker-plugin-safe-app/.

## Dependency

Project depends on [safe_app_nodejs](https://github.com/maidsafe/safe_app_nodejs). The dependency is specified as a git submodule.

## Development

Node.js are required for development.

1. Clone the project
2. Run `npm i` to install the nodejs dependency
3. `npm run build` will build the project to the `dist` folder.

In [safe_browser](https://github.com/maidsafe/safe_browser/) `app/node_modules`, create a folder `beaker-plugin-safe-app` and add `index.js` file and the `dist` folder obtained after building the plugin.

# License

Licensed under either of

* the MaidSafe.net Commercial License, version 1.0 or later ([LICENSE](LICENSE))
* the General Public License (GPL), version 3 ([COPYING](COPYING) or http://www.gnu.org/licenses/gpl-3.0.en.html)

at your option.

# Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the
work by you, as defined in the MaidSafe Contributor Agreement, version 1.1 ([CONTRIBUTOR]
(CONTRIBUTOR)), shall be dual licensed as above, and you agree to be bound by the terms of the
MaidSafe Contributor Agreement, version 1.1.
