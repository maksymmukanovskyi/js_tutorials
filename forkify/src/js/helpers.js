import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const responce = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    console.log(responce);

    const data = await responce.json();
    console.log(data);

    if (!responce.ok) throw new Error(`Fuck!!`);

    return data;
  } catch (error) {
    throw error;
  }
};
