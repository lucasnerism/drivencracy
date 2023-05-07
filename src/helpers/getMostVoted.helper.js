const getMostVoted = (arr) => {
  let mostVoted = 0;
  let mostVotedIndex = 0;
  arr.forEach((el, index) => {
    if (el > mostVoted) {
      mostVoted = el;
      mostVotedIndex = index;
    }
  });
  return { mostVoted, mostVotedIndex };
};

export default getMostVoted;