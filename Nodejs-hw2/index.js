const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/posts').then(resp => {
    console.log(resp);
});