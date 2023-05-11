import axios from 'axios';

axios.defaults.withCredentials = true;

async function testWithCredentials() {
    const URL =
        'https://img.epian1.com/migrate/mp_user/1041/mp_article/288972176/cover_d17d23ac169d3c621bd2c7bd69361965?imageMogr2/auto-orient|imageInfo';
        
    const { data } = await axios.get(URL, {
        headers: {
            cookie: 'xxxx'
        }
    });
    console.log('data', data)
}

testWithCredentials()
