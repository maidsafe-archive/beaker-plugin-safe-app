const ipcMain = require('electron').ipcMain; // electron deps will be avaible inside browser
let ipcEvent = null;

ipcMain.on('registerSafeApp', (event) => {
	ipcEvent = event;
	console.log("registerSafeApp: ", ipcEvent);
});

ipcMain.on('webClientContainerRes', (event, res) => {
	// handle response
	console.log("webClientContainerRes");
});

ipcMain.on('webClientAuthRes', (event, res) => {
	// handle response
	console.log("webClientAuthRes: ", res);
});

ipcMain.on('webClientErrorRes', (event, err) => {
	// handle Error
	console.log("webClientErrorRes");
});

module.exports.sendAuthReq = (req) => {
	console.log("Auth request: ", req.uri);
	if (ipcEvent.sender.send('webClientAuthReq', req.uri) === true) {
		return Promise.resolve();
	}
	return Promise.reject("Error sending authorization request");
}
