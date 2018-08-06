const http = require('http');
const request = require('request');
const express = require('express');
const app = express();
const route = express.Router();
// const bodyParser = require('body-parser');

// route.use(bodyParser.urlencoded({extended: true}));
// route.use(bodyParser.json());

const currencyAPI = 'https://free.currencyconverterapi.com/api/v6/currencies';
const port = 3000;

route.get('/favicon.ico', (req, res) => res.status(204));

route.use("/", (req, res, next)=>{
    next();
})

route.get('/', (req,res)=>{
    request(currencyAPI, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var arrayCurrency = [];
            var arrayCurrencyName = []
            var dataCurrency = JSON.parse(body)
            arrayCurrency = Object.values(dataCurrency.results)

            for (var i = 0; i<arrayCurrency.length; i++){
                var currencyObj = {name: '', id:''};
                currencyObj.name = arrayCurrency[i].currencyName;
                currencyObj.id = arrayCurrency[i].id;
                arrayCurrencyName.push(currencyObj)
            }
            arrayCurrencyName.sort(function(a, b) {
                var nameA = a.id;
                var nameB = b.id;
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                // names must be equal
                return 0;
            });
        }
        result = JSON.stringify(arrayCurrencyName);
        res.setHeader('Access-Control-Allow-Origin', '*');    
        res.write(result);
        res.end();
    })
})

route.use('/get_convert_value', (req, res, next)=>{
    next()
})

route.post('/get_convert_value', (req, res)=>{
    var body = '';
    req.on('data', (chunk)=>{ body += chunk })
    req.on('end', () =>{
        if (typeof body != 'undefined' && body != ''){
            const convertValueURL = body;
            var arrayValueReturn = [];

            request(convertValueURL, function (error, response, _body) {
                if (!error && response.statusCode == 200) {
                    const dataValue     = JSON.parse(_body);
                    console.log(dataValue)
                    const arrayValue    = Object.values(dataValue);
                    let convertValue1   = {val: ''};
                    let convertValue2   = {val: ''};
                    let dataForChart    = {keys: [], values: []}

                    const strValue_1 = JSON.stringify(arrayValue[0]);
                    const strValue_2 = JSON.stringify(arrayValue[1]);

                    const objValue_1 = JSON.parse(strValue_1);
                    const objValue_2 = JSON.parse(strValue_2);

                    const arrayValue_1  = Object.values(objValue_1);
                    convertValue1.val   = arrayValue_1[arrayValue_1.length - 1];
                    arrayValueReturn.push(convertValue1);
                    
                    const arrayValue_2  = Object.values(objValue_2);
                    convertValue2.val   = arrayValue_2[arrayValue_2.length - 1];
                    arrayValueReturn.push(convertValue2);
                    
                    dataForChart.keys   = Object.keys(objValue_1);
                    dataForChart.values = arrayValue_1;
                    arrayValueReturn.push(dataForChart);

                    result = JSON.stringify(arrayValueReturn);
                    //console.log(result)
                    res.setHeader('Access-Control-Allow-Origin', '*'); 
                    res.write(result);
                    res.end();
                }
            })
        }
    })
})

app.use("/", route);

const service = http.createServer(app)
service.listen(process.env.PORT || port)
