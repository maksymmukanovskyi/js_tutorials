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

    const data = await responce.json();

    if (!responce.ok) throw new Error(`Fuck!!`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const responce = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await responce.json();

    if (!responce.ok) throw new Error(`Fuck!!`);

    return data;
  } catch (error) {
    throw error;
  }
};
