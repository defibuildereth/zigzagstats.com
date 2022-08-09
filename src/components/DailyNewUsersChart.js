import React, { useState, useEffect } from 'react'
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

    const [dailyNewUsers, setDailyNewUsers] = useState("")

    useEffect(() => {
        makeDailyNewUsersInfo()
    }, [])

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

    async function getDailyNewUsers(txs) {
        let dailyNewUsers = []
        let url = `${process.env.REACT_APP_API}/addresses/`
        let addresses = await fetch(url)
        let response = await addresses.json()
        for (let i = 0; i < txs.length; i++) {
            const date = Date.parse(txs[i].date.split('-').join(' '))
            dailyNewUsers.push({ x: date, y: 0 })
        }
        for (let i = 0; i < response.length; i++) {
            let rawTimeStamp = (Math.min(...response[i].timeStamps))
            let date = new Date(rawTimeStamp)
            date.setHours(0, 0, 0, 0)
            let timeStamp = (date.getTime())
            for (let j = 0; j < dailyNewUsers.length; j++) {
                if (timeStamp == dailyNewUsers[j].x) {
                    dailyNewUsers[j].y = dailyNewUsers[j].y + 1
                }
            }
        }
        return (dailyNewUsers)
    }

    async function makeDailyNewUsersInfo() {
        let info = await getDailyNewUsers(txs)
        setDailyNewUsers(info)
    }

    const makeDailyNewUsersCumulative = function (info) {
        function compare(a, b) {
            if (a.x < b.x) {
                return -1;
            }
            if (a.x > b.x) {
                return 1;
            }
            return 0;
        }
        let array = []
        let cumulative = 0;

        if (info.length > 0) {
            let orderedInfo = info.sort(compare)
            for (let i = 0; i < orderedInfo.length; i++) {
                const number = orderedInfo[i].y + cumulative;
                array.push({ x: orderedInfo[i].x, y: number })
                cumulative = number
            }
        }



        return array
    }

    const cumulativeTransactions = makeDailyNewUsersCumulative(dailyNewUsers)

    const dailyNewUsersData = {
        datasets: [{
            type: 'bar',
            label: 'Daily New Users',
            data: dailyNewUsers,
            backgroundColor: '#6debdc',

        },
        {
            type: 'line',
            label: 'Cumulative',
            data: cumulativeTransactions,
            backgroundColor: '#55a9e8',
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