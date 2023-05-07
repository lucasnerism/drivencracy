import { db } from "./connect.js";
const collection = db.collection("votes");

const createVote = (vote) => collection.insertOne(vote);
const findAllVotes = (query) => collection.find(query).toArray();

export default {
  createVote,
  findAllVotes
};
