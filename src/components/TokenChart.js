import React from 'react'
import { Chart } from 'react-chartjs-2';
import "chartjs-adapter-moment";

import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    CategoryScale,
} from 'chart.js';

const TokenChart = ({token}) => {

    ChartJS.register(
        TimeScale,
        LinearScale,
        BarElement,
        PointElement,
        LineElement,
        CategoryScale,
        Title,
        Tooltip,
        Legend
    );

    const makeTokenPriceInfo = function (obj) {
        let prices = Object.values(obj)[0]
        let marketCaps = Object.values(obj)[1]
        let volumes = Object.values(obj)[2]
        let priceArray = []
        for (let i = 0; i < prices.length; i++) {
            let date = prices[i][0]
            let value = prices[i][1]
            priceArray.push({ x: date, y: value })
        }
        let volumeArray = []
        for (let i = 0; i < volumes.length; i++) {
            let date = volumes[i][0]
            let value = volumes[i][1]
            volumeArray.push({ x: date, y: value })
        }
        return ({ priceArray: priceArray, volumeArray: volumeArray });
    }

    let tokenChart = makeTokenPriceInfo(token)

    const tokenChartData = {
        datasets: [
            {
                type: 'line',
                label: 'Token Price',
                yAxisID: 'A',
                data: tokenChart.priceArray,
                backgroundColor: 'rgba(235, 99, 132, 0.8)',
            },
        ],
    };

    const tokenChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'ZigZag Token Price ($usd)',
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            },
        }
    };

    return (
        <>
            <Chart options={tokenChartOptions} data={tokenChartData}></Chart>
        </>
    )
}

export default TokenChart;

