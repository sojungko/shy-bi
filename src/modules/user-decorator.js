const generateLikedFormatted = ({ liked }) => {
  return liked.length ? new Set(liked) : new Set();
};

export default function decorateUser(user = {}) {
  return {
    ...user,
    liked: generateLikedFormatted(user),
  };
}

