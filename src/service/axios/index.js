import axios from 'axios';

const axiosClient = axios.create();
//const access_token = localStorage.getItem('token')
let access_token = "";
axiosClient.interceptors.request.use(config => {
    access_token = localStorage.getItem('token');
    if (access_token) {
        config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


axiosClient.defaults.baseURL = process.env.REACT_APP_API;
axiosClient.defaults.baseURL = 'http://localhost:3011';
axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': ' *',
    'Authorization': `Bearer ${access_token}`
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 5000;

axiosClient.defaults.withCredentials = false;
axiosClient.interceptors.response.use((response) => {

    return response;
}, (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log('API Error Data',error.response.data);
        // console.log('API Error status',error.response.status);
        // console.log('API Error header',error.response.headers);


        if (error.response.status == 401) {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject({
            data: error?.response?.data,
            status: error?.response?.status
        });
    } else if (error.request) {
        console.log('API Request Error', error.request);
        return Promise.reject({
            data: {
                message: "Network error occured"
            },
            status: 500
        });
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('API Error', error.message);
        return Promise.reject({
            data: {
                message: error.message
            },
            status: 500
        });
    }

});

export async function getRequest(URL, urlParam = {}) {
    return axiosClient.get(`/${URL}`,
        {
            params: urlParam
        }
    )
}

export async function postRequest(URL, payload) {
    return await axiosClient.post(`/${URL}`, payload).then(response => response);
}

export async function putRequest(URL, payload) {
    return await axiosClient.put(`/${URL}`, payload).then(response => response);
}

export async function deleteRequest(URL, urlParam) {
    return await axiosClient.delete(`/${URL}`, { data: urlParam }).then(response => response);
}

export async function postFormdata(URL, payload) {
    // const formData = new FormData();
    // console.log("frontfrontfrontfront",payload)
    // Object.keys(payload).forEach(key => {

    //     formData.append(key, payload[key]);
    // });
    return await axiosClient.post(`/${URL}`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${access_token}`
        }
    }).then(response => response);
}
