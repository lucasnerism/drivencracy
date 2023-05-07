import { db } from "./connect.js";
const collection = db.collection('polls');

const insertPoll = (poll) => collection.insertOne(poll);
const findAllPolls = () => collection.find().toArray();
const findOnePoll = (query) => collection.findOne(query);

export default {
  insertPoll,
  findAllPolls,
  findOnePoll
};