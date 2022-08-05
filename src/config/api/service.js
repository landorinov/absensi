import Axios from 'axios';

const httpClient = Axios.create();

let apiUrl = 'https://project-testv01.herokuapp.com/';

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
                  throw({
                    status: Number(res.data.status),
                    message: res.data.message
                  });
              default:
                break;
            }
            console.log('sini');
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
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
        console.log(error);
        throw error;
      });
  };

export { HttpPost, HttpGet };
