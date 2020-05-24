import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Room from '../../src/models/Room.js';
import "regenerator-runtime/runtime.js";

let mongod;
let room1, room2, room3;

beforeAll(async () => {
  mongod = new MongoMemoryServer();
  const mongoUri = await mongod.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true }, (err) => {
    if (err) console.error(err);
  });
});

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

afterEach(async () => {
  await mongoose.connection.db.dropCollection('rooms');
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

it('gets rooms', async () => {
  const rooms = await Room.find();
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
});

it('gets a single room', async () => {
  const room = await Room.findOne({ host: room1.host });
  expect(room.host).toBe("George");
  expect(room.video).toBe("www.youtube.com/w?8w390hjrb");
  expect(room.viewers[0]).toBe("Greg");
  expect(room.viewers[1]).toBe("Frank");
  expect(room.viewers[2]).toBe("Richard");
});

it('successfully adds a new room with correct id size', async () => {
  const room = new Room({
    host: "Johnothan",
    video: "www.youtube.com/w?q35yweshrjkft",
    viewers: ["Ariana", "Dave"]
  });

  await room.save();

  const fromDb = await mongoose.connection.db.collection('rooms').findOne({ _id: room._id });

  expect(fromDb).toBeTruthy();
  expect(fromDb._id.length).toBe(7);
  expect(fromDb.host).toBe("Johnothan");
  expect(fromDb.video).toBe("www.youtube.com/w?q35yweshrjkft");
  expect(fromDb.viewers).toStrictEqual(["Ariana", "Dave"]);
});

it('fails to add room when no host', async () => {
  const room = new Room({
    video: "www.youtube.com/w?q35yweshrjkft",
    viewers: ["Ariana", "Dave"]
  });

  return expect(room.save()).rejects.toThrow();
});

it('succeeds creating add room with no video', async () => {
  const room = new Room({
    host: "Johnothan",
    viewers: ["Ariana", "Dave"]
  });

  await room.save();

  const fromDb = await mongoose.connection.db.collection('rooms').findOne({ _id: room._id });

  expect(fromDb).toBeTruthy();
  expect(fromDb.host).toBe("Johnothan");
  expect(fromDb.video).toBe("");
  expect(fromDb.viewers).toStrictEqual(["Ariana", "Dave"]);
});

it('succeeds creating add room with no viewers', async () => {
  const room = new Room({
    host: "Johnothan",
    video: "www.youtube.com/w?q35yweshrjkft"
  });

  await room.save();

  const fromDb = await mongoose.connection.db.collection('rooms').findOne({ _id: room._id });

  expect(fromDb).toBeTruthy();
  expect(fromDb.host).toBe("Johnothan");
  expect(fromDb.video).toBe("www.youtube.com/w?q35yweshrjkft");
  expect(fromDb.viewers).toStrictEqual([]);
});
