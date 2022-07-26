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
        let array = []
        let cumulative = 0;

        for (let i = 0; i < info.length; i++) {
            const number = info[i].y + cumulative;
            array.push({ x: info[i].x, y: number })
            cumulative = number

        }
        return array
    }

    const cumulativeTransactions = makeDailyNewUsersCumulative(dailyNewUsers)

    const dailyNewUsersData = {
        datasets: [{
            type: 'bar',
            label: 'Daily New Users',
            data: dailyNewUsers,
            backgroundColor: 'rgba(235, 99, 132, 0.8)',

        },
        {
            type: 'line',
            label: 'Cumulative',
            data: cumulativeTransactions,
            backgroundColor: 'blue',
        }
        ],
    };

    const dailyNewUsersOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'ZigZag Daily New Users',
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            }
        }
    };

    return (
        <>
            {dailyNewUsers ? <Chart id='myId' data={dailyNewUsersData} options={dailyNewUsersOptions}></Chart> : null}
        </>
    )
}

export default DailyNewUsersChart