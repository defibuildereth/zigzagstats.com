import React, { useState, useEffect } from 'react'
import ActiveUsers from '../components/ActiveUsers';
import DailyNewUsersChart from '../components/DailyNewUsersChart';

const UsersContainer = ({transactions, activeUsers}) => {

    return (
        <>
            <ActiveUsers activeUsers={activeUsers}></ActiveUsers>
            <DailyNewUsersChart transactions={transactions}></DailyNewUsersChart>
        </>
    )
}

export default UsersContainer
