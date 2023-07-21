import { NavLink, Outlet } from "react-router-dom"
import "./../App.scss"
import { useState } from "react"
import settingIcon from "../assets/set3.png"
import { save } from "../utils/localStorage"
import { useMediaQuery } from "./../Hooks/mediaQuery"
import { retriveData } from "../utils/localStorage"
import {  Navigate } from "react-router-dom"
export const DashBoard = () => {
    let screenSize = useMediaQuery()
    const [logouts, setLogout] = useState(false)
    const logoutFun = () => {
        save("userPm", null)
        save("userPmdata", null)
        setLogout(true)
    }
    return (
        <>
          {logouts && (
          <Navigate to="/"replace={true} />
        )}
            {screenSize.width > 630 ? <div className="bgDash"><h1>Ops...</h1><h1>App is designed for Mobile phone</h1></div> : <div className="dashStyles"><div className="header "><div className="AppName"><span style={{ fontSize: "2rem", fontWeight: "bold", fontStyle: "italic", }}>
                <NavLink to={`/auth/${retriveData("userPm")?._id}`} style={{ textDecoration: "none", color: "rgb(58, 58, 58)" }}>P-monitor</NavLink> </span></div><div><img className="responsiveIcon" src={settingIcon} alt="simpleicon" onClick={(e) => logoutFun()}></img></div></div><Outlet /></div>}
        </>
    )
}
