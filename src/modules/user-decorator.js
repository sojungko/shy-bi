const generateDisplayedAge = ({ age }) => Math.floor(age.months / 12);


export default function decorateUser(userObj) {
  if (!userObj) {
    return null;
  }

  return {
    ...userObj,
    age: generateDisplayedAge(userObj),
  };
}
