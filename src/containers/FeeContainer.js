import React from 'react'
import FeeChart from '../components/FeeChart';
import Fee from '../components/Fee';

const FeeContainer = ({ fee, transactions }) => {

    return (
        <>
            <h1>Fees</h1>
            <Fee fee={fee}></Fee>
            <FeeChart transactions={transactions}></FeeChart>
        </>
    )
}

export default FeeContainer
