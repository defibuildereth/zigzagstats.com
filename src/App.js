import './App.css';
import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import axios from 'axios';

import Navbar from './containers/Navbar';
import FeeContainer from './containers/FeeContainer';
import UsersContainer from './containers/UsersContainer';
import VolumeContainer from './containers/VolumeContainer';
import TokenContainer from './containers/TokenContainer';
import Footer from './components/Footer';
import Seo from './components/Seo';

function App() {

  const [transactions, setTransactions] = useState("")
  const [fee, setFee] = useState("")
  // const [activeUsers, setActiveUsers] = useState("")
  const [volume, setVolume] = useState("")
  const [token, setToken] = useState("")

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/transactions/summary/123`)
      .then(res => res.json())
      .then(r => {
        setTransactions(r)
      })
    getFee()
      .then(r => {
        setFee(r)
      })
    // getActiveUsers(Date.now())
    //   .then(r => {
    //     setActiveUsers(r)
    //   })
    getVolume()
      .then(res => {
        setVolume(res)
      })
    getToken()
      .then(res => {
        setToken(res)
      })
  }, []);

  const getVolume = async function () {
    let vol;
    await fetch('https://api.coingecko.com/api/v3/exchanges/zigzag/volume_chart?days=30')
      .then(r => r.json())
      .then(res => {
        vol = res
      })
    return vol
  }

  const getToken = async function () {
    let token;
    await fetch('https://api.coingecko.com/api/v3/coins/zigzag-2/market_chart?vs_currency=usd&days=max')
      .then(r => r.json())
      .then(res => {
        token = res
      })
    return token
  }

  // const getActiveUsers = async function (timeStamp) {
  //   let hour = 3.6 * 10 ** 6
  //   let day = hour * 24
  //   let week = day * 7
  //   let month = day * 30
  //   let array = [hour, day, week, month]
  //   const promiseArray = array.map(item => {
  //     let url = `${process.env.REACT_APP_API}/addresses/time/${timeStamp - item}`
  //     return apiCall(url)
  //   })
  //   let activeUsers = await Promise.all(promiseArray)
  //   return activeUsers
  // }

  // async function apiCall(url) {
  //   let response = await fetch(url)
  //   let data = await response.json()
  //   return data
  // }

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
    {/* <Seo></Seo> */}
      <Router>
        <h1 id='mainTitle' className="text-3xl text-white font-bold flex justify-center ">ZigZagStats.com</h1>
        <Navbar />
        {fee && transactions && volume && token ? <>
          <Routes>
            <Route path="/fees">
              <Route index element={<FeeContainer fee={fee} transactions={transactions}></FeeContainer>} />
            </Route>
            <Route path="/users">
              <Route index element={<UsersContainer transactions={transactions} ></UsersContainer>} /> 
            </Route>
            <Route path="/token">
              <Route index element={<TokenContainer token={token}></TokenContainer>} />
            </Route>
            <Route exact path="/">
              <Route index element={<VolumeContainer volume={volume} transactions={transactions}></VolumeContainer>} />
            </Route>
          </Routes>
        </> : <p>loading...</p>}
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
