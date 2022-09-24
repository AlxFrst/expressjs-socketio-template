Template ExpressJS + Socket.io
============================

This is a template for a web application using ExpressJS and Socket.io.

It is based on the [ExpressJS generator](https://expressjs.com/en/starter/generator.html).

It uses [Socket.io](https://socket.io/) for real-time communication.

It uses [Bootstrap](https://getbootstrap.com/) for the UI.

It uses [JQuery](https://jquery.com/) for the UI.

How to use
----------

1. Clone this repository
2. Run `npm install`
3. Run `npm start`
4. Open your browser at `http://localhost:3000`

Setting up the PostgreSQL database
----------------------------------

1. Create your database
2. Create a .env file in the root of the project
3. Add the following lines to the .env file:
    - DB_USER=YourDatabaseUser
    - DB_PASS=YourDatabasePassword
    - DB_NAME=YourDatabaseName
    - DB_HOST=YourDatabaseHost
4. Start the application and check if you see the following message in the console:
    Connected to the PostgreSQL database
5. If you see the message, you are good to go! ENJYOY

TODO
----

- [X] Add a database
- [ ] Add a login system

License
-------

MIT
