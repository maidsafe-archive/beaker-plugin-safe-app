const ipcMain = require('electron').ipcMain; // electron deps will be avaible inside browser
let ipcEvent = null;

ipcMain.on('registerSafeApp', (event) => {
	ipcEvent = event;
});

ipcMain.on('webClientContainerRes', (event, res) => {
 // handle response
});

ipcMain.on('webClientAuthRes', (event, res) => {
 // handle response
});

ipcMain.on('webClientErrorRes', (event, err) => {
 // handle Error
});

module.exports.sendAuthReq = (req) => {
	console.log("Auth request: ", req);
	return ipcEvent.sender.send('webClientAuthReq', req);
//	return Promise.resolve('safe-bmV0Lm1haWRzYWZlLmV4YW1wbGVzLm5vZGUtanMtdGVzdC1hcHA=:AAAAAWqJQyQAAAAAAAAAAAAAAAAAAAAgKf93dpDDH83rbPEHdv-yVOdp-5cg4e21sIQLStzgV1sAAAAAAAAAIPA9UirtY4gZnQACwRZubU5IXREkGWUHx4TlJnt6JxCCAAAAAAAAACCA-JC8S3piz2gh04Lf0bMtLKtiFuTcU5vyeI-QObssewAAAAAAAABAu5DnQCn6lFnPr_npQf6T_hWIDhSLKc1aVxALaH4m5YCA-JC8S3piz2gh04Lf0bMtLKtiFuTcU5vyeI-QObssewAAAAAAAAAgA3LD4n881Xay-rjwxL_nZuMFHnyvP7Pp99mhCP5__R4AAAAAAAAAIDGkCvw0Jcpfk0u8Fg1Choe1k58uGgN_ml8GdV8dxkjpAAAAAAAAACDvfcNpfSM6tcigyaGPXjbYhmZBawfZiIZ7oJ60D2EktwAAAAAAADqYAAAAAAAAABhBwlUCCCr3XDBzI5KPdTkxtlYAVxU5Kpo=');
}
