import Axios from 'axios';

const httpClient = Axios.create();

let apiUrl = 'https://project-testv01.herokuapp.com/';

const HttpPost = async (url, data) => {
    const accessToken = localStorage.getItem('accessToken');

    return httpClient
        .post(apiUrl + url, data, {
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
