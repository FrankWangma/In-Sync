import routes from '../../src/routes/index.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import fetch from 'isomorphic-unfetch';
import "regenerator-runtime/runtime.js";

let mongod, app, server;
let room1, room2, room3;

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
  server = app.listen(5000, () => done());

})

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
  const coll = await mongoose.connection.db.createCollection('rooms');

  room1 = {
    host: "George",
    video: "www.youtube.com/w?8w390hjrb",
    viewers: ["Greg", "Frank", "Richard"]
  };

  room2 = {
    host: "Sam",
    video: "www.youtube.com/w?aesfnt45",
    viewers: ["Ariana", "Dave"]
  }

  room3 = {
    host: "Billy",
    video: "www.youtube.com/w?aerj5he56ijrd5",
    viewers: ["Sam"]
  }

  await coll.insertMany([room1, room2, room3]);
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
  await mongoose.connection.db.dropCollection('rooms');
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

it('gets all rooms from server', async () => {

  const response = await fetch('http://localhost:5000/room');
  const rooms = await response.json();

  expect(rooms).toBeTruthy();
  expect(rooms.length).toBe(3);

  expect(rooms[0].host).toBe("George");
  expect(rooms[0].video).toBe("www.youtube.com/w?8w390hjrb");
  expect(rooms[0].viewers[0]).toBe("Greg");
  expect(rooms[0].viewers[1]).toBe("Frank");
  expect(rooms[0].viewers[2]).toBe("Richard");

  expect(rooms[1].host).toBe("Sam");
  expect(rooms[1].video).toBe("www.youtube.com/w?aesfnt45");
  expect(rooms[1].viewers[0]).toBe("Ariana");
  expect(rooms[1].viewers[1]).toBe("Dave");

  expect(rooms[2].host).toBe("Billy");
  expect(rooms[2].video).toBe("www.youtube.com/w?aerj5he56ijrd5");
  expect(rooms[2].viewers[0]).toBe("Sam");
})