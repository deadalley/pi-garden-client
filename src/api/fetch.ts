import axios, { Method } from 'axios';

export const fetch = async (method: Method, route: string, data?: object) => {
  try {
    const response = await axios({
      method,
      url: `http://192.168.0.91:1337/${route}`,
      data,
    });

    return { status: response.status, data: response.data };
  } catch (e) {
    console.log({ e });
    return { data: [] };
  }
};
