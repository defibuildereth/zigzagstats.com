import React, { useState, useEffect } from 'react'
import { Chart } from 'react-chartjs-2';
import "chartjs-adapter-moment";
import axios from 'axios';

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

const OverviewContainer = () => {

    const [transactions, setTransactions] = useState([])
    const [fee, setFee] = useState([])
    const [activeUsers, setActiveUsers] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/transactions/`)
            .then(res => res.json())
            .then(r => {
                setTransactions(r)
            })
        getFee()
            .then(r => {
                setFee(r)
            })
        getActiveUsers(Date.now())
            .then(r => {
                setActiveUsers(r)
            })

    }, []);

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

    const getActiveUsers = async function (timeStamp) {
        let hour = 3.6 * 10 ** 6
        let day = hour * 24
        let week = day * 7
        let month = day * 30
        let array = [hour, day, week, month]
        const promiseArray = array.map(item => {
            let url = `${process.env.REACT_APP_API}/addresses/time/${timeStamp - item}`
            return apiCallLengthOnly(url)
        })
        let allUsersUrl = `${process.env.REACT_APP_API}/addresses/`
        promiseArray.push(apiCallLengthOnly(allUsersUrl))
        let activeUsers = await promiseAll(promiseArray)
        return activeUsers
    }

    async function apiCallLengthOnly(url) {
        let response = await fetch(url)
        let data = await response.json()
        // console.log(data.length)
        return data.length
    }

    async function promiseAll(promises, errors) {
        return Promise.all(promises.map(p => {
            return p.catch(e => {
                errors.push(e.response);
                return null;
            })
        }))
    }

    const getFee = async function () {
        let fee;
        let payload = {
            "txType": "Transfer",
            "address": "0xf33A2D61DD09541A8C9897D7236aDcCCC14Cf769",
            "tokenLike": 2
        }
        await axios
            .post(`https://api.zksync.io/api/v0.2/fee`, payload)
            .then(res => {
                fee = (res.data.result.totalFee * 10 ** -6)
            })
            .catch(err => {
                console.log(err);
            });

        return fee
    }

    const makeDailyTxsValues = function (transactionsArray) {
        let array = []

        for (let i = 0; i < transactionsArray.length; i++) {
            const date = Date.parse(transactionsArray[i].date.split('-').join(' '))
            const number = transactionsArray[i].feeArray.length
            array.push({ x: date, y: number })
        }
        return array
    }

    const makeDailyTxsCumulative = function (transactionsArray) {
        let array = []
        let cumulative = 0;

        for (let i = 0; i < transactionsArray.length; i++) {
            const date = Date.parse(transactionsArray[i].date.split('-').join(' '))
            const number = transactionsArray[i].feeArray.length + cumulative;
            cumulative = cumulative + number
            array.push({ x: date, y: number })
        }
        return array
    }

    const dailyTransactions = makeDailyTxsValues(transactions)
    const cumulativeTransactions = makeDailyTxsCumulative(transactions)

    const dailyTxsData = {
        datasets: [{
            type: 'bar',
            label: 'Daily Transactions',
            data: dailyTransactions,
            backgroundColor: 'rgba(235, 99, 132, 0.8)',

        }, {
            type: 'line',
            label: 'Cumulative',
            data: cumulativeTransactions,
            backgroundColor: 'blue',
        }],
    };

    const dailyTxsOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'ZigZag Daily Transactions',
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
            {activeUsers ? <><p>Active Users</p>
                <p>Hourly: {activeUsers[0]}</p>
                <p>Daily: {activeUsers[1]}</p>
                <p>Weekly: {activeUsers[2]}</p>
                <p>Monthly: {activeUsers[3]}</p>
                <p>Total: {activeUsers[4]}</p>
            </> : null}
            <br></br>
            {fee ? <p>Current Fee: {fee.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p> : null}
            {transactions ? <Chart options={dailyTxsOptions} data={dailyTxsData} /> : <p>Loading</p>}
        </>
    )
}
export default OverviewContainer