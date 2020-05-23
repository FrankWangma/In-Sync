import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../src/models/User.js';
import "regenerator-runtime/runtime.js";

let mongod;
let user1, user2, user3;

beforeAll(async () => {
  mongod = new MongoMemoryServer();
  const mongoUri = await mongod.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true }, (err) => {
    if (err) console.error(err);
  });
});

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

afterEach(async () => {
  await mongoose.connection.db.dropCollection('users');
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

it('runs dummy to test fix initialization issues', async () => {
  expect(1).toBe(1);
});

it('gets users', async () => {
  const users = await User.find();;
  expect(users).toBeTruthy();
  expect(users.length).toBe(3);

  expect(users[0].firstName).toBe("George");
  expect(users[0].lastName).toBe("Mcerlean");
  expect(users[0].username).toBe("gman229");
  expect(users[0].hash).toBe("password");
  expect(users[0].email).toBe("george@gmail.com");

  expect(users[1].firstName).toBe("billy");
  expect(users[1].lastName).toBe("batson");
  expect(users[1].username).toBe("BB2000");
  expect(users[1].hash).toBe("hunter2");
  expect(users[1].email).toBe("BB@hotmail.com");

  expect(users[2].firstName).toBe("Maximillian");
  expect(users[2].lastName).toBe("Thoroughbred");
  expect(users[2].username).toBe("MTLIVE");
  expect(users[2].hash).toBe("123qweasd");
  expect(users[2].email).toBe("");
});

it('gets a single user', async () => {
  const user = await User.findById(user1._id);
  expect(user.firstName).toBe("George");
  expect(user.lastName).toBe("Mcerlean");
  expect(user.username).toBe("gman229");
  expect(user.hash).toBe("password");
  expect(user.email).toBe("george@gmail.com");
});

it('successfully adds a new user', async () => {
  const user = new User({
    firstName: "New kid",
    lastName: "On the Block",
    username: "Its me",
    hash: "secret",
    email: "email@email.com"
  });

  await user.save();

  const fromDb = await mongoose.connection.db.collection('users').findOne({ _id: user._id });

  expect(fromDb).toBeTruthy();
  expect(fromDb.firstName).toBe("New kid");
  expect(fromDb.lastName).toBe("On the Block");
  expect(fromDb.username).toBe("Its me");
  expect(fromDb.hash).toBe("secret");
  expect(fromDb.email).toBe("email@email.com");
});

it('fails to add user when no firstname', async () => {
  const user = new User({
    lastName: "On the Block",
    username: "Its me",
    hash: "secret",
    email: "email@email.com"
  });

  return expect(user.save()).rejects.toThrow();
});

it('fails to add user when no lastname', async () => {
  const user = new User({
    firstName: "New kid",
    username: "Its me",
    hash: "secret",
    email: "email@email.com"
  });

  return expect(user.save()).rejects.toThrow();
});

it('fails to add user when no username', async () => {
  const user = new User({
    firstName: "New kid",
    lastName: "On the Block",
    hash: "secret",
    email: "email@email.com"
  });

  return expect(user.save()).rejects.toThrow();
});

it('fails to add user when no hash', async () => {
  const user = new User({
    firstName: "New kid",
    lastName: "On the Block",
    username: "Its me",
    email: "email@email.com"
  });

  return expect(user.save()).rejects.toThrow();
});

it('succeeds creating add user when no email', async () => {
  const user = new User({
    firstName: "New kid",
    lastName: "On the Block",
    username: "Its me",
    hash: "secret",
  });

  await user.save();

  const fromDb = await mongoose.connection.db.collection('users').findOne({ _id: user._id });

  expect(fromDb).toBeTruthy();
  expect(fromDb.firstName).toBe("New kid");
  expect(fromDb.lastName).toBe("On the Block");
  expect(fromDb.username).toBe("Its me");
  expect(fromDb.hash).toBe("secret");
  expect(fromDb.email).toBe("");
});

it('updates a single user', async () => {
  const user = await User.findById(user1._id);
  user.firstName = "John";
  user.save();
  const fromDb = await mongoose.connection.db.collection('users').findOne({ _id: user1._id });
  expect(user.firstName).toBe("John");
  expect(user.lastName).toBe("Mcerlean");
  expect(user.username).toBe("gman229");
  expect(user.hash).toBe("password");
  expect(user.email).toBe("george@gmail.com");
});
