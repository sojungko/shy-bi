export const generateFormattedAge = ({ age }) => Math.floor(age.months / 12);

export const sexMap = {
  male: 'Male',
  female: 'Female',
  other: 'Other',
};

export const generateFormattedSex = ({ sex }) => sexMap[sex];


export const edLevelMap = {
  high_school: 'High School',
  some_college: 'Some College',
  bachelors: 'Bachelor\'s',
  masters: 'Master\'s',
  phd: 'Ph.D.',
};

export const generateFormattedEdLevel = ({ edLevel }) => edLevelMap[edLevel];

export default function decorateUser(userObj) {
  if (!userObj) {
    return null;
  }

  return {
    ...userObj,
    age: generateFormattedAge(userObj),
    sex: generateFormattedSex(userObj),
    edLevel: generateFormattedEdLevel(userObj),
  };
}
