var io = require('socket.io-client')
const socket = io("ws://localhost:8080")
import Vue from 'vue/dist/vue';

// model. kinda
let data = {
	username: localStorage.getItem("username"),
	userid: '',
	bruh: '',
	messages: []
		// 'user': '',
		// 'text': ''
}

// main vue instance
let app = new Vue({
	el: '#app',
	data: data,
	methods: {
		sendmessage: function () {
			this.registername()
			if(this.username!='') {
				// add userid to be able to see the difference between users with the same name and the client.
				socket.emit("message", {
					'user': socket.id,
					'text': this.bruh
				})
				this.bruh = '';
			}
			else {
				alert("You need to register a username...")
			}
		},
		registername: function () {
			localStorage.setItem("username", this.username)
			socket.emit("registername", {
				'userid': socket.id,
				'name': this.username
			})
		}
	},
})

// Triggered on established connection with server
socket.on("connect", (bruh) => {
	console.log(bruh);
	app.userid = socket.id;
})

// Client receiving a message...
socket.on('message', (d) => {
	let newmessage = {
		'user': d.user,
		'text': d.text
	}
	app.messages.push(newmessage)
})

// https://www.youtube.com/watch?v=VX0Yz8YmVxI nice