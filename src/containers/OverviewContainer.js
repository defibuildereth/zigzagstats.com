import React, { useState, useEffect } from 'react'
import axios from 'axios';
import DailyTransactionsChart from '../components/DailyTransactionsChart';
import Fee from '../components/Fee';
import ActiveUsers from '../components/ActiveUsers';
import DailyNewUsersChart from '../components/DailyNewUsersChart';



const OverviewContainer = () => {

    const [transactions, setTransactions] = useState("")
    const [fee, setFee] = useState("")
    const [activeUsers, setActiveUsers] = useState("")

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

    return (
        <>
            {activeUsers && fee && transactions ? <>
                <ActiveUsers activeUsers={activeUsers}></ActiveUsers>
                <Fee fee={fee}></Fee>
                <DailyTransactionsChart transactions={transactions}></DailyTransactionsChart>
                <DailyNewUsersChart transactions={transactions}></DailyNewUsersChart>
            </> : <p>loading...</p>}
            
        </>
    )
}
export default OverviewContainer