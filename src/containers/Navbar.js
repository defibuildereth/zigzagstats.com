import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <>
            <h1>I are Navbar</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/fees">Fees</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;