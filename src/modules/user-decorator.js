const generateLikedFormatted = ({ liked }) => {
  return liked && liked.length ? new Set(liked) : new Set();
};

export default function decorateUser(user = {}) {
  return {
    ...user,
    liked: generateLikedFormatted(user),
  };
}

