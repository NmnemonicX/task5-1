const http = require('http');

const myAPIkey =  process.env.myAPIkey;
const city = process.env.city;


// const yargs = require('yargs/yargs')
// const {hideBin} = require('yargs/helpers')


// const argv1 = yargs(hideBin(process.argv))
//     .option('city', {
//         alias: 'c'
//     }).argv


// console.log(myAPIkey)
// console.log(city)

//const url=  `http://api.weatherstack.com/current?access_key=${myAPIkey}&query=${argv1.c}`
const url=  `http://api.weatherstack.com/current?access_key=${myAPIkey}&query=${city}`

console.log(url)


const req =http.get(url, (res) => {
    const statusCode = res.statusCode;
    if (statusCode !== 200) {
        console.error(`Status Code: ${statusCode}`);
        return;
    }
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        let parsedData = JSON.parse(rawData);
        console.log('Погода в городе ' +parsedData.location.name +' равняется : '+parsedData.current.temperature);
        process.exit(0)
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});

