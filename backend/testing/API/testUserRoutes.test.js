import routes from '../../src/routes/index.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import fetch from 'isomorphic-unfetch';
import "regenerator-runtime/runtime.js";
import axios from "axios";

let mongod, app, server;
let user1, user2, user3;

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 * 
 * Also, start an express server running on port 3000, hosting the routes we wish to test.
 */
beforeAll(async done => {

    mongod = new MongoMemoryServer();

    const connectionString = await mongod.getConnectionString();
    await mongoose.connect(connectionString, { useNewUrlParser: true });

    app = express();
    routes(app);
    server = app.listen(6000, () => done());
})

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
    const coll = await mongoose.connection.db.createCollection('users');

    user1 = {
        firstName: "George",
        lastName: "Mcerlean",
        username: "gman229",
        hash: "password",
        email: "george@gmail.com"
      };
    
      user2 = {
        firstName: "billy",
        lastName: "batson",
        username: "BB2000",
        hash: "hunter2",
        email: "BB@hotmail.com"
      }
    
      user3 = {
        firstName: "Maximillian",
        lastName: "Thoroughbred",
        username: "MTLIVE",
        hash: "123qweasd",
      }

    await coll.insertMany([user1, user2, user3]);
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    await mongoose.connection.db.dropCollection('users');
})

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 * 
 * Also, stop the express server
 */
afterAll(done => {
    server.close(async () => {
        await mongoose.disconnect();
        await mongod.stop();

        done();
    });
});

it('dummy test to intentionally fail', async () => {
    expect(1).toBe(1);
});
  

it('gets all users from server', async () => {

    const response = await fetch('http://localhost:6000/user');
    const users = await response.json();

    expect(users).toBeTruthy();
    expect(users.length).toBe(3);

    expect(users[0].firstName).toBe("George");
    expect(users[0].lastName).toBe("Mcerlean");
    expect(users[0].username).toBe("gman229");
    expect(users[0].hash).toBeUndefined();
    expect(users[0].email).toBe("george@gmail.com");

    expect(users[1].firstName).toBe("billy");
    expect(users[1].lastName).toBe("batson");
    expect(users[1].username).toBe("BB2000");
    expect(users[1].hash).toBeUndefined();
    expect(users[1].email).toBe("BB@hotmail.com");

    expect(users[2].firstName).toBe("Maximillian");
    expect(users[2].lastName).toBe("Thoroughbred");
    expect(users[2].username).toBe("MTLIVE");
    expect(users[2].hash).toBeUndefined();
    expect(users[2].email).toBe("");
})

it('gets a single user from the server', async () => {

    const response = await fetch(`http://localhost:6000/user/${user1._id}`);
    const user = await response.json();

    expect(user.firstName).toBe("George");
    expect(user.lastName).toBe("Mcerlean");
    expect(user.username).toBe("gman229");
    expect(user.hash).toBeUndefined();
    expect(user.email).toBe("george@gmail.com");
})

// it('registers a user with the server', async () => {
//     const response = await axios.post(`http://localhost:6000/register`, {
//             firstName: "Peter",
//             lastName: "Mcerlean",
//             username: "PM",
//             password: "dabbin",
//             email: "bopy@email.com"
//         })
//     console.log(response);
//     const user = await response.json();

//     expect(user.firstName).toBe("Peter");
//     expect(user.lastName).toBe("Mcerlean");
//     expect(user.username).toBe("PM");
//     expect(user.hash).toBeUndefined();
//     expect(user.email).toBe("bopy@email.com");
// })
