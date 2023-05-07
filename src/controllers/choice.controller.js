import choiceService from "../services/choice.service.js";

const createChoice = async (req, res) => {
  const { status, message } = await choiceService.createChoice(req.body);
  res.status(status).json({ message });
};

const postAVote = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await choiceService.createVote(id);
  res.status(status).json({ message });
};
export default {
  createChoice,
  postAVote
};