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

const DailyNewUsersChart = ({ transactions }) => {

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

    let txs = transactions;

    const getDailyNewUsers = function (txs) {
        let array = []

        let ordered = txs.summary.sort(function (a, b) {
            return (a.date - b.date);
        });

        for (let i = 0; i < ordered.length; i++) {
            array.push({x: new Date(ordered[i].date), y:ordered[i].dailyNewUsers})
        }
        return array
    }

    let dailyNewUsers = getDailyNewUsers(txs)

    const dailyNewUsersData = {
        datasets: [{
            type: 'bar',
            label: 'Daily New Users',
            data: dailyNewUsers,
            backgroundColor: '#6debdc',
        }
        ],
    };

    const dailyNewUsersOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                color: '#FFFFFF',
                labels: {
                    color: '#FFFFFF'
                }
            },
            title: {
                display: true,
                text: 'ZigZag Daily New Users',
                color: '#FFFFFF'
            },
        },
        scales: {
            yAxes:{
                grid: {
                    drawBorder: true,
                    color: '#FFFFFF',
                },
                ticks:{
                    beginAtZero: true,
                    color: 'white',
                }
            },
            xAxes: {
                type: 'time',
                time: {
                    unit: 'day'
                },
                grid: {
                    drawBorder: true,
                    color: '#FFFFFF',
                },
                ticks:{
                    beginAtZero: true,
                    color: 'white',
                }
            },
        }
    };

    return (
        <>
            {dailyNewUsers ? <Chart id='myId' data={dailyNewUsersData} options={dailyNewUsersOptions}></Chart> : null}
        </>
    )
}

export default DailyNewUsersChart