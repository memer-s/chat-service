const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
	cors: {
		origin: '*'
	}
});

let users = {}

io.on("connection", (socket) => {
	console.log("A user connected. user ID: ",socket.id);

	socket.on('message', (data) => {
		io.emit("message", {
			'user': users[data.user],
			'text': data.text
		})
		console.log("User: ", users[data.user], " Wrote: ", data.text)
	})

	socket.on('registername', (data) => {
		console.log(users);
		users[data.userid] = data.name;
	})
});

httpServer.listen(8080);