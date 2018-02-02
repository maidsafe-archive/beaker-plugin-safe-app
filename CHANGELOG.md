# Beaker Plugin SAFE App Change Log

## [Unreleased]
### Changed
- Upgrade safe-node-app to v0.7.0

### SAFE libraries Dependencies
- @maidsafe/safe-node-app: v0.7.0

## [0.4.4] - 20-12-2017
### Changed
- Upgrade safe-node-app to v0.6.0

### Fixed
- Fix the safeMutableDataEntries.forEach function which was incorrectly returning the 'key' as an object
- Allow MutableData handles to be removed from the plugin's Map thru a 'free' function
- Minor fix in documentation example for safeCryptoSignKeyPair.getSecSignKey function

### SAFE libraries Dependencies
- @maidsafe/safe-node-app: v0.6.0

## 0.4.3

- upgrades `@maidsafe/safe-node-app` to v0.5.3


## 0.4.2

- upgrades `@maidsafe/safe-node-app` to v0.5.2

## 0.4.1

- upgrades `@maidsafe/safe-node-app` to v0.5.1

## 0.4.0

- signing key API upgrade
- update mutable data with safe_app_nodejs  changes
- update crypto with safe_app_nodejs changes
- adds new safe_app_nodejs functions for safeApp
- updates documentation in accordance with latest API changes
- @maidsafe/safe-node-app version change 0.5.0

## 0.3.2

- Avoid connecting to the network at protocol's registration time


## 0.3.1

- Fix reconnection handling of unregistered client
- Fix URI scheme registration for dev mode
- Compatible with safe-app-nodejs v0.4.1


## 0.3.0

- Compatible with safe-app v0.3.0


## 0.1.0-dev.1

- NFS API updates
- localhost scheme support
- Freeing of safe_app and object handles
- Minor fixes
