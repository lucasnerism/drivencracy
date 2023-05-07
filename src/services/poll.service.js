import accessPollsDb from "../database/accessPolls.database.js";
import accessChoicesDb from "../database/accessChoices.database.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import accessVotesDb from "../database/accessVotes.database.js";
import getMostVoted from "../helpers/getMostVoted.helper.js";

const postPoll = async ({ title, expireAt }) => {

  if (!expireAt) {
    expireAt = dayjs().add(30, 'day').format("YYYY-MM-DD HH:mm");
  }

  let status = 500;
  let message = "";
  try {
    await accessPollsDb.insertPoll({ title, expireAt });
    status = 201;
    message = "Enquete criada com sucesso";
  } catch (error) {
    message = error;
  } finally {
    return { status, message };
  }

};

const getPolls = async () => {
  let status;
  let polls;
  try {
    polls = await accessPollsDb.findAllPolls();
    status = 200;
  } catch (error) {
    status = 500;
  } finally {
    return { status, polls };
  }
};

const getPollChoices = async (id) => {
  if (id.length < 24) return { status: 404, poll: { message: "Essa enquete não existe" } };
  try {
    const poll = await accessPollsDb.findOnePoll({ _id: new ObjectId(id) });
    if (!poll) return { status: 404, poll: { message: "Essa enquete não existe" } };
    const pollChoices = await accessChoicesDb.findPollChoices({ pollId: new ObjectId(id) });
    return { status: 200, poll: pollChoices };
  } catch (error) {
    return { status: 500, poll: { message: "Erro de servidor" } };
  }
};

const getResult = async (id) => {
  if (id.length < 24) return { status: 404, poll: { message: "Essa enquete não existe" } };
  const votes = [];
  try {
    const poll = await accessPollsDb.findOnePoll({ _id: new ObjectId(id) });
    if (!poll) return { status: 404, poll: { message: "Essa enquete não existe" } };
    const pollChoices = await accessChoicesDb.findPollChoices({ pollId: new ObjectId(id) });
    for (let i = 0; i < pollChoices.length; i++) {
      const choiceVotes = await accessVotesDb.findAllVotes({ choiceId: pollChoices[i]._id });
      votes.push(choiceVotes.length);
    }
    const { mostVoted, mostVotedIndex } = getMostVoted(votes);
    const result = { votes: mostVoted, title: pollChoices[mostVotedIndex].title };
    return { status: 200, result: { ...poll, result } };
  } catch (error) {
    return { status: 500, result: { message: "Erro de servidor" } };
  }
};

export default {
  postPoll,
  getPolls,
  getPollChoices,
  getResult
};