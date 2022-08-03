import React from 'react'
import ActiveUsers from '../components/ActiveUsers';
import DailyNewUsersChart from '../components/DailyNewUsersChart';

const UsersContainer = ({transactions, activeUsers}) => {

    return (
        <>
            <h1>Users</h1>
            <ActiveUsers activeUsers={activeUsers}></ActiveUsers>
            <DailyNewUsersChart transactions={transactions}></DailyNewUsersChart>
        </>
    )
}

export default UsersContainer
