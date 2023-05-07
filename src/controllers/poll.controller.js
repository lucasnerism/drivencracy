import pollService from "../services/poll.service.js";

const postPoll = async (req, res) => {
  const { status, message } = await pollService.postPoll(req.body);
  res.status(status).json({ message });
};

const getAllPolls = async (req, res) => {
  const { status, polls } = await pollService.getPolls();
  res.status(status).json(polls);
};

const getPollById = async (req, res) => {
  const { id } = req.params;
  const { status, poll } = await pollService.getPollChoices(id);
  res.status(status).json(poll);
};

const getResult = async (req, res) => {
  const { id } = req.params;
  const { status, result } = await pollService.getResult(id);
  res.status(status).json(result);
};

export default {
  postPoll,
  getAllPolls,
  getPollById,
  getResult
};