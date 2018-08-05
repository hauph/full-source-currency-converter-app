export var Main_Function = {
    
    convertCurrency: function(input, convertValue){
        return (input * convertValue)
    }

    ,secondFetch: function(convertURL) {
        //const convertValueURL = 'http://localhost:3000/get_convert_value';
        const convertValueURL = 'https://hauph-cc-app.herokuapp.com/get_convert_value';

        return fetch(convertValueURL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: convertURL
        }).then( responseConvertValue => {
            return responseConvertValue.json()
        }).then(dataConvertValue => {
            //console.log(dataConvertValue)
            return dataConvertValue;
        })  
        .catch(err => {
            console.log(err);
        })
    }

    ,getconvertURL: function(){
        let dateObj = {startDate:"", endDate: ""}

        let endDate     = new Date()
        let endYear     = endDate.getFullYear(), 
            endMonth    = endDate.getMonth() + 1, 
            endDay      = endDate.getDate(), 
            endTime     = endDate.getTime();

        let fullEndDateString = `${endYear}-${endMonth}-${endDay}`;
        dateObj.endDate = fullEndDateString;


        let past8days       = 8 * 24 * 60 * 60 * 1000;
        let startDate       =  new Date((endTime-past8days));
        let startDate_Year  = startDate.getFullYear(), 
            startDate_Month = startDate.getMonth() + 1, 
            startDate_Date  = startDate.getDate();

        let fullStartDateString = `${startDate_Year}-${startDate_Month}-${startDate_Date}`;
        dateObj.startDate = fullStartDateString;

        return dateObj;
    } 

    ,highChartJs: function (data,fromTo){
        const Highcharts = require('highcharts');
        const _xAxis = data.keys,
             _yAxis = data.values,
            _fromTo = fromTo;
    
        Highcharts.chart('highlight-chart', {
            chart: {
                type: 'line'
            },
            xAxis: {
                categories: _xAxis,
                title: {
                    text: "Date"
                }
            },
            yAxis: {
                title: {
                    text: "Exchange Rate"
                }
            },
            series: [{
                name: _fromTo,
                data: _yAxis
            }]
        })
    }
}
