export default async function runParallel(funcObj = {}) {
  const funcMap = new Map();
  const resultObj = {};

  const unorderedKeys = Object.keys(funcObj);

  unorderedKeys.forEach(key => {
    funcMap.set(key, funcObj[key]);
  });

  try {
    const results = await Promise.all(funcMap.values());

    Array.from(funcMap.keys()).forEach((key, index) => {
      resultObj[key] = results[index];
    });
    return resultObj;
  } catch (error) {
    console.log('ERROR', error);
    return Promise.reject(new Error(error));
  }
}
