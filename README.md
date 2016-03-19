# webChatAdvancedHTML5
chat applying advanced html5, css3 and sockets concepts
### Includes the htmml5 concepts such as
* Application cache
* Web workers
* Web sockets
* Local storage

### Dependencies
No javascript nor css3 third parties used (not even jquery).

### Remarkable features
* I Used event-driven development for javascript code.
* No third parties for client-side code.
* Use of web sockets and web workers to communicate with the server.
* The application detects when the server is off and reconnects when it is restored.
* Implementation of javascript patterns such as: public and subscribe, promises, modules, object constructors.

### Server-side implementation
It is using MVC4 and Fleck for the sockets handling

### Description
This is basically an offline application that connects to a sockets using websockets. At first it is necessary access to the server and then, even if you refresh the browser without connection, the page will render.

All the calls to the sockets run in background using a web worker. This is a very good excercise if you are learning HTML5 or if you want to implement a very simple chat.

### How to use
Clone the repo and run the application using visual studio 2013 or later. I recommend to open two different browsers and create a room for both from the web application to test the chat.
