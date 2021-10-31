var io = require('socket.io-client')
const socket = io("ws://localhost:8080")
import Vue from 'vue/dist/vue';

let data = {
	username: '',
	userid: '',
	bruh: 'Message...',
	messages: []
		// 'user': '',
		// 'text': ''
	
}

let users = {}

let app = new Vue({
	el: '#app',
	data: data,
	methods: {
		sendmessage: function () {
			if(this.username!='') {
				socket.emit("message", {
					'user': socket.id,
					'text': this.bruh
				})
			}
			else {
				alert("You need to register a username...")
			}
		},
		registername: function () {
			socket.emit("registername", {
				'userid': socket.id,
				'name': this.username
			})
		}
	}
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
	let messagearr = app.messages
	messagearr.push(newmessage)
	app.messages = messagearr;
})

// https://www.youtube.com/watch?v=VX0Yz8YmVxI nice