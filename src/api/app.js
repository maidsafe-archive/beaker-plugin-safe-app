const safeApp = require('safe-app');
const ipc = require('./ipc');
const { genHandle, getObj, freeObj, netStateCallbackHelper } = require('./helpers');

module.exports.manifest = {
  _with_async_cb_initialise: 'readable',
  connect: 'promise',
  authorise: 'promise',
  connectAuthorised: 'promise',
  authoriseContainer: 'promise',
  webFetch: 'promise',
  isRegistered: 'promise',
  networkState: 'promise',
  canAccessContainer: 'promise',
  refreshContainersPermissions: 'promise',
  getContainersNames: 'promise',
  getHomeContainer: 'promise',
  getContainer: 'promise',
  reconnect: 'promise',
  logPath: 'promise',
  free: 'sync'
};

/**
 * Create a new SAFEApp instance without a connection to the network
 * @name window.safeApp.initialise
 *
 * @param {AppInfo} appInfo
 * @param {Function} [networkStateCallback=null] optional callback function
 * to receive network state updates after a unregistered/registered
 * connection is made with `connect`/`connectAuthorised` functions.
 *
 * @returns {Promise<SAFEAppToken>} new app instance token
 *
 * @example
 * window.safeApp.initialise({
 *       id: 'net.maidsafe.test.webapp.id',
 *       name: 'WebApp Test',
 *       vendor: 'MaidSafe Ltd.'
 *    }, (newState) => {
 *       console.log("Network state changed to: ", newState);
 *    })
 *    .then((appToken) => {
 *       console.log('SAFEApp instance initialised and token returned: ', appToken);
 *    });
 **/
module.exports._with_async_cb_initialise = (appInfo, safeAppGroupId) => {
  if (this && this.sender) {
    const wholeUrl = this.sender.getURL();
    appInfo.scope = wholeUrl;
  } else {
    appInfo.scope = null;
  }
  return netStateCallbackHelper(safeApp, appInfo, safeAppGroupId);
};

/**
 * Create a new, unregistered session (read-only),
 * e.g. useful for browsing web sites or just publicly available data.
 * @name window.safeApp.connect
 *
 * @param {SAFEAppToken} appToken the app handle
 *
 * @returns {Promise<SAFEAppToken>} same app token
 *
 * @example
 * window.safeApp.initialise({
 *    id: 'net.maidsafe.test.webapp.id',
 *    name: 'WebApp Test',
 *    vendor: 'MaidSafe Ltd.'
 * })
 * .then((appToken) => window.safeApp.connect(appToken))
 * .then(_ => {
 *    console.log('Unregistered session created');
 * });
 **/
module.exports.connect = (appToken) => {
  return new Promise((resolve, reject) => {
    getObj(appToken)
      .then((obj) => obj.app.auth.genConnUri()
        .then((connReq) => ipc.sendAuthReq(connReq, (err, res) => {
          if (err) {
            return reject(new Error('Unable to get connection information: ', err));
          }
          return obj.app.auth.loginFromURI(res)
            .then(() => resolve(appToken));
        })))
      .catch(reject);
  });
};

/**
 * Request the Authenticator (and user) to authorise this application
 * with the given permissions and optional parameters.
 * @name window.safeApp.authorise
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {Object} permissions mapping the container-names
 *                  to a list of permissions you want to
 *                  request
 * @param {Object} options optional parameters
 * @param {Boolean} [options.own_container=false] whether or not to request
 *    our own container to be created for the app.
 *
 * @returns {Promise<AuthURI>} auth granted `safe-://`-URI
 *
 * @example // Example of authorising an app:
 * window.safeApp.authorise(
 *    appToken, // the app token obtained when invoking `initialise`
 *    {
 *      _public: ['Insert'], // request to insert into `_public` container
 *      _other: ['Insert', 'Update'] // request to insert and update in `_other` container
 *    },
 *    {own_container: true} // and we want our own container, too
 * ).then((authUri) => {
 *    console.log('App was authorised and auth URI received: ', authUri);
 * });
 **/
module.exports.authorise = (appToken, permissions, options) => {
  return new Promise((resolve, reject) => {
    getObj(appToken)
      .then((obj) => obj.app.auth.genAuthUri(permissions, options)
        .then((authReq) => ipc.sendAuthReq(authReq, (err, res) => {
          if (err) {
            return reject(new Error('Unable to authorise the application: ', err));
          }
          return resolve(res);
        })))
      .catch(reject);
  });
};

/**
 * Create a new, registered Session (read-write)
 * If you have received a response URI (which you are allowed
 * to store securely), you can directly get an authenticated app
 * by using this helper function. Just provide said URI as the
 * second value.
 * @name window.safeApp.connectAuthorised
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {AuthURI} authUri granted auth URI
 *
 * @returns {Promise<SAFEAppToken>} same app token
 *
 * @example // Example of creating a registered session:
 * window.safeApp.authorise(
 *    appToken, // the app token obtained when invoking `initialise`
 *    {
 *      _public: ['Insert'], // request to insert into `_public` container
 *      _other: ['Insert', 'Update'] // request to insert and update in `_other` container
 *    },
 *    {own_container: true} // and we want our own container, too
 * )
 * .then((authUri) => window.safeApp.connectAuthorised(appToken, authUri))
 * .then(_ => {
 *    console.log('The app was authorised & a session was created with the network');
 * });
 **/
module.exports.connectAuthorised = (appToken, authUri) => {
  return getObj(appToken)
    .then((obj) => obj.app.auth.loginFromURI(authUri))
    .then((_) => appToken);
};

/**
 * Request the Authenticator (and user) to authorise this application
 * with further continer permissions.
 * @name window.safeApp.authoriseContainer
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {Object} permissions mapping container name to list of permissions
 *
 * @returns {Promise<AuthURI>} auth granted `safe-://`-URI
 *
 * @example // Requesting further container authorisation:
 * window.safeApp.authoriseContainer(
 *   appToken, // the app token obtained when invoking `initialise`
 *   { _publicNames: ['Update'] } // request to update into `_publicNames` container
 * ).then((authUri) => {
 *    console.log('App was authorised and auth URI received: ', authUri);
 * });
 **/
module.exports.authoriseContainer = (appToken, permissions) => {
  return new Promise((resolve, reject) => {
    getObj(appToken)
      .then((obj) => obj.app.auth.genContainerAuthUri(permissions)
        .then((authReq) => ipc.sendAuthReq(authReq, (err, res) => {
          if (err) {
            return reject(new Error('Unable to authorise the application: ', err)); // TODO send Error in specific
          }
          return resolve(res);
        })))
      .catch(reject);
  });
};

/**
 * Lookup a given `safe://`-URL in accordance with the
 * convention and fetch the requested object.
 * @name window.safeApp.webFetch
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {AuthURI} authUri granted auth URI
 *
 * @returns {Promise<File>} the file object found for that URL
 *
 * @example // Retrieving a web page:
 * window.safeApp.webFetch(
 *   appToken, // the app token obtained when invoking `initialise`
 *   'safe://servicename.publicid' // the SAFE Network URL
 * )
 * .then((data) => {
 *    console.log('Web page content retrieved: ', data.toString());
 * });
 **/
module.exports.webFetch = (appToken, url) => {
  return getObj(appToken)
    .then((obj) => obj.app.webFetch(url)
      .then((f) => obj.app.immutableData.fetch(f.dataMapName))
      .then((i) => i.read())
    );
};

/**
 * Whether or not this is a registered/authenticated session.
 * @name window.safeApp.isRegistered
 *
 * @param {SAFEAppToken} appToken the app handle
 *
 * @returns {Boolean} true if this is an authenticated session
 *
 * @example // Checking if app is registered:
 * window.safeApp.isRegistered(appToken)
 *    .then((r) => console.log('Is app registered?: ', r));
 **/
module.exports.isRegistered = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.auth.registered);
};

/**
 * Current network connection state, e.g. `Connected` or `Disconnected`.
 * @name window.safeApp.networkState
 *
 * @param {SAFEAppToken} appToken the app handle
 *
 * @returns {String} network state
 *
 * @example // Checking network connection state:
 * window.safeApp.networkState(appToken)
 *    .then((s) => console.log('Current network state: ', s));
 **/
module.exports.networkState = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.networkState);
};

/**
 * Whether or not this session has specifc permission access of a given
 * container.
 * @name window.safeApp.canAccessContainer
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {String} name name of the container, e.g. `_public`
 * @param {(String|Array<String>)} [permissions=['Read']] permissions to check for
 *
 * @returns {Promise<Boolean>} true if this app can access the container with given permissions
 *
 * @example // Checking if the app has 'Read' permission for the '_public' container:
 * window.safeApp.canAccessContainer(appToken, '_public', ['Read'])
 *    .then((r) => console.log('Has the app `Read` permission for `_public` container?: ', r));
 **/
module.exports.canAccessContainer = (appToken, name, permissions) => {
  return getObj(appToken)
    .then((obj) => obj.app.auth.canAccessContainer(name, permissions));
};

/**
 * Refresh permissions for accessible containers from the network. Useful when
 * you just connected or received a response from the authenticator.
 * @name window.safeApp.refreshContainersPermissions
 *
 * @param {SAFEAppToken} appToken the app handle
 *
 * @returns {Promise} resolves when finished refreshing
 **/
module.exports.refreshContainersPermissions = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.auth.refreshContainersPermissions())
    .then((_) => appToken);
};

/**
 * Get the names of all containers found.
 * @name window.safeApp.getContainersNames
 *
 * @param {SAFEAppToken} appToken the app handle
 *
 * @returns {Promise<Array<String>>} list of containers names
 **/
module.exports.getContainersNames = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.auth.getContainersNames());
};

/**
 * Get the MutableData for the apps own container generated by Authenticator
 * @name window.safeApp.getHomeContainer
 *
 * @param {SAFEAppToken} appToken the app handle
 *
 * @returns {Promise<MutableDataHandle>} the handle for the MutableData behind it
 *
 * @example // Retrieve home container:
 * window.safeApp.getHomeContainer(appToken)
 *    .then((mdHandle) => window.safeMutableData.getVersion(mdHandle))
 *    .then((v) => console.log('Home Container version: ', v));
 **/
module.exports.getHomeContainer = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.auth.getHomeContainer()
      .then((md) => genHandle(obj.app, md)));
};

/**
 * Lookup and return the information necessary to access a container.
 * @name window.safeApp.getContainer
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {String} name name of the container, e.g. `_public`
 *
 * @returns {Promise<MutableDataHandle>} the MutableData handle the handle for the MutableData behind it
 *
 * @example // Retrieve the '_public' container:
 * window.safeApp.canAccessContainer(appToken, '_public', ['Read'])
 *    .then((r) => {
 *       if (r) {
 *          console.log('The app has `Read` permission for `_public` container');
 *          window.safeApp.getContainer(appToken, '_public')
 *             .then((mdHandle) => window.safeMutableData.getVersion(mdHandle))
 *             .then((v) => console.log('`_public` Container version: ', v));
 *       }
 *    });
 **/
module.exports.getContainer = (appToken, name) => {
  return getObj(appToken)
    .then((obj) => obj.app.auth.getContainer(name)
      .then((md) => genHandle(obj.app, md)));
};

/**
 * Reconnect SAFEApp instance if connection is disconnected
 * @name window.safeApp.reconnect
 *
 * @param {SAFEAppToken} appToken the app handle
 **/
module.exports.reconnect = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.reconnect());
};

/**
 * Generate the log path for the provided filename.
 * If the filename provided is null, it then returns
 * the path of where the safe_core log file is located.
 * @name window.safeApp.logPath
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {String} [filename=null] log filename to generate the path
 *
 * @returns {Promise<String>} the log filename path generated
 *
 * @example // Retrieve the '_public' container:
 * window.safeApp.logPath(appToken, 'mylogfile.log')
 *    .then((path) => console.log('Log path generated: ', path));
 **/
module.exports.logPath = (appToken, filename) => {
  return getObj(appToken)
    .then((obj) => obj.app.logPath(filename));
};

/**
 * Free the SAFEApp instance from memory, as well as all other
 * objects created with it, e.g. ImmutableData and MutableData objects, etc.
 * @name window.safeApp.free
 *
 * @param {SAFEAppToken} appToken the app handle
 **/
module.exports.free = (appToken) => freeObj(appToken);

/**
 * @name SAFEAppToken
 * @typedef {String} SAFEAppToken
 * @description Holds the reference to a SAFEApp instance which is the primary interface to interact
 * with the SAFE network.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/

/**
 * @name AppInfo
 * @typedef {Object} AppInfo
 * @description Holds the information about tha client application, needed for authentication.
 * @param {String} id - unique identifier for the app
 *        (e.g. 'net.maidsafe.examples.mail-app')
 * @param {String} name - human readable name of the app (e.g. "Mail App")
 * @param {String} vendor - human readable name of the vendor (e.g. "MaidSafe Ltd.")
 **/

/**
 * @name AuthURI
 * @typedef {String} AuthURI
 * @description The auth URI (`'safe-auth://...'`) returned by the Authenticator after the user has
 * authorised the application. This URL can be used by the
 * application to connect to the network wihout the need to get authorisation
 * from the Authenticator again. Although if the user decided to revoke the application
 * the auth URI shall be obtained again from the Authenticator.
 **/
