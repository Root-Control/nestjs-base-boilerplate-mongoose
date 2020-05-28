let socket = null;

const setSocketServer = server => {
	console.log('SETTING SOCKET SERVER');
	socket = server;
};

const getSocketServer = () => {
	console.log('GETTING SOCKET SERVER');
	return socket;
};

export {
    setSocketServer,
    getSocketServer
};