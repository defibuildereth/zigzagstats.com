import React from 'react'
import { NavLink } from "react-router-dom";

const Navbar = () => {

    

    let activeStyle = "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white bg-zzGreen"
    let inactiveStyle = "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white bg-zzBlueBright" 

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <nav>
                        <ul
                            className="flex mb-0 list-none flex-nowrap w-7/8 pt-3 pb-4 flex-row"
                            role="tablist"
                        >
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <NavLink className={({ isActive }) =>
                                    isActive ? activeStyle : inactiveStyle
                                }
                                    to="/">Volume</NavLink>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <NavLink className={({ isActive }) =>
                                    isActive ? activeStyle : inactiveStyle
                                }
                                    to="/fees">Fees</NavLink>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <NavLink className={({ isActive }) =>
                                    isActive ? activeStyle : inactiveStyle
                                }
                                    to="/users">Users</NavLink>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <NavLink className={({ isActive }) =>
                                    isActive ? activeStyle : inactiveStyle
                                }
                                    to="/token">Token</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar;