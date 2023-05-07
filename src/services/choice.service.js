import { ObjectId } from "mongodb";
import accessChoicesDatabase from "../database/accessChoices.database.js";
import accessPollsDatabase from "../database/accessPolls.database.js";
import dayjs from "dayjs";
import accessVotesDatabase from "../database/accessVotes.database.js";

const createChoice = async ({ title, pollId }) => {
  try {
    if (pollId.length < 24) return { status: 404, message: "Essa enquete não existe" };

    const poll = await accessPollsDatabase.findOnePoll({ _id: new ObjectId(pollId) });
    if (!poll) return { status: 404, message: "Essa enquete não existe" };

    if (dayjs() > dayjs(poll.expireAt).valueOf()) return { status: 403, message: "Essa enquete já expirou" };

    const choice = await accessChoicesDatabase.findOneChoice({ title, pollId: new ObjectId(pollId) });
    if (choice) return { status: 409, message: "Já existe uma opção com esse nome" };

    await accessChoicesDatabase.createChoice({ title, pollId: new ObjectId(pollId) });
    return { status: 201, message: "Opção criada com sucesso" };
  } catch (error) {
    return { status: 500, message: "Erro de servidor" };
  }
};

const createVote = async (choiceId) => {
  try {
    if (choiceId.length < 24) return { status: 404, message: "Essa opção não existe" };

    const choice = await accessChoicesDatabase.findOneChoice({ _id: new ObjectId(choiceId) });
    if (!choice) return { status: 404, message: "Essa opção não existe" };

    const poll = await accessPollsDatabase.findOnePoll({ _id: new ObjectId(choice.pollId) });
    if (dayjs() > dayjs(poll.expireAt).valueOf()) return { status: 403, message: "Essa enquete já expirou" };

    await accessVotesDatabase.createVote({ createdAt: dayjs().format("YYYY-MM-DD HH:mm"), choiceId: new ObjectId(choiceId) });
    return { status: 201, message: "Voto registrado com sucesso" };
  } catch (error) {
    return { status: 500, message: "Erro de servidor" };
  }
};

export default {
  createChoice,
  createVote
};