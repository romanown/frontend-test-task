import axios from 'axios';

const apiUrl = process.env.REACT_APP_BASE_URL;
const myAxios = axios.create({
  baseURL: apiUrl,
});
export const runFetch = async (url: string, dataToSend: any = {}): Promise<any> => {
  const respdata = await myAxios.get(url, {
    params: {
      ...dataToSend,
    },
  });
  return respdata.data;
};
