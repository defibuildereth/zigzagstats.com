import React from 'react'
import TokenChart from '../components/TokenChart';

const TokenContainer = ({token}) => {

    return (
    <>
        <h2>Token</h2>
        <TokenChart token={token}></TokenChart>
    </>
    )
}

export default TokenContainer;