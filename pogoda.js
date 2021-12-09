const http = require('http');
//const myAPIkey =  '11f17b77167be6ab91629e3f1639a983'
const myAPIkey =  process.env.myAPIkey;

const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const fs = require('fs')
const path = require('path')
const  readline = require('readline')
const input = readline.createInterface(process.stdin , process.stdout)

const argv1 = yargs(hideBin(process.argv))
    .option('city', {
        alias: 'c'
    }).argv


console.log(myAPIkey)

const url=  `http://api.weatherstack.com/current?access_key=${myAPIkey}&query=${argv1.c}`
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

