import Axios from 'axios';

const httpClient = Axios.create();

// let apiUrl = 'https://project-testv01.herokuapp.com/';
// let apiUrl = 'https://test123-production.up.railway.app/';
let apiUrl = 'http://36.94.216.133:8081/';
let apiUrlLMS = 'http://api.lms.cyber-tik.com/';

const HttpPost = async (url, data) => {
  const accessToken = localStorage.getItem('accessToken');

  return httpClient.post(apiUrl + url, data, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : null,
    },
  })
    .then((res) => {
      switch (Number(res.data.status)) {
        case 200:
          return res.data.data;
        case 404:
          throw ({
            status: Number(res.data.status),
            message: res.data.message
          });
        default:
          break;
      }
    })
    .catch((error) => {
      throw error;
    });
};

const HttpGet = async (url) => {
  const accessToken = localStorage.getItem('accessToken');

  return httpClient
    .get(apiUrl + url, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : null,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

const HttpGetLMS = async (url) => {
  const accessToken = localStorage.getItem('accessToken');

  return httpClient
    .get(apiUrlLMS + url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        // Authorization: accessToken ? `Bearer ${accessToken}` : null,
      },
    })
    .then((res) => {
      console.log('res', res);
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export { HttpPost, HttpGet, HttpGetLMS };
