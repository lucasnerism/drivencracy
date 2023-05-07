import { db } from "./connect.js";
const collection = db.collection("choices");

const createChoice = (choice) => collection.insertOne(choice);
const findOneChoice = (query) => collection.findOne(query);
const findPollChoices = (query) => collection.find(query).toArray();

export default {
  createChoice,
  findOneChoice,
  findPollChoices
};