import "./../../App.scss"
import { Link } from "react-router-dom"
import dashIcon from "./../../assets/log.png"

import { io } from "socket.io-client"
// import {} from "s"
import { useState } from "react"
import { retriveData, save } from "../../utils/localStorage"
import { useEffect } from "react"
import { MainUrl } from "../../../variables"
export default function Dash() {

    const [user, setUser] = useState(retriveData("userPm"))
    const [data, setData] = useState(null)
    const [dataReady, setDataReady] = useState(false)

    // console.log(user)

    useEffect(() => {
        const socket = io(MainUrl)
        socket.on("connect", () => console.log(socket.id))
        socket.on("dataSet", (datass) => {
            save("userPmdata", datass.reverse())
            setData(datass.reverse())
        })
    }, [])




    useEffect(() => {
        const dataF = async () => {
            const res = await fetch(MainUrl + "/data/data/6")
            const body = await res.json()
            if (body.success && body.body) {
                let h = body.body.reverse()
                setData(h)
                save("userPmdata", h)
                setDataReady(true)
            }
        }
        try {
            dataF()
        } catch (error) {
            console.log(error.message);
        }
    }, [])

    return (<>

        <div className="column">
            {dataReady &&
                <div>
                    <Link to="temp/1" className="link">
                        <div className="circle gh">
                            <div className="textSs">
                                Temp: <span>{data[data.length - 1]?.temp}</span>
                            </div>
                        </div>
                    </Link>
                    <Link to="spo/2" className="link">
                        <div className="circle gh">
                            <div className="textSs">
                                <div>Spo: <span>{data[data.length - 1]?.spo}</span></div>
                            </div>
                        </div>
                    </Link>
                    <Link to="bpmss/3" className="link">
                        <div className="circle gh">
                            <div className="textSs">
                                Bpm: <span>{data[data.length - 1]?.bpm} </span>
                            </div>
                        </div>
                    </Link>
                </div>
            }

        </div>

        {/* { dataReady &&
        <div>

        <div style={{marginTop:"1rem"}}></div>
        <div className="dashIcon">
            <img src={dashIcon} alt="dashboardIcon" />
        </div>
   <div style={{textAlign:"center", paddingTop:"1.2rem", fontSize:"1.3rem", fontWeight: "bold"}}>
    Real time Monitoring
   </div>
        <div className="padTop"></div>
        <div className="container  row">
            <div className="padAll  col s5">
                <div className="flexrow">
                    <div className="capT">
                        <div className="centerT">Tmp: <span>{data?.temp}</span></div>
                    </div>
                </div>
            </div>
            <div className="padAll offset-s2 col s5">
                <div className="flexrow">
                    <div className="capT">
                    <div className="centerT">Spo: <span>{data?.spo}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div style={{paddingTop:"1.2rem"}}></div>
        <div className="container  row">
            <div className="padAll  col s5">
                <div className="flexrow">
                    <div className="capT">
                        <div className="centerT">BPM: <span>{data?.bpm}</span></div>
                    </div>
                </div>
            </div>
            <Link to="graphs">

            <div className="padAll offset-s2 col s5" >
                <div className="flexrow">
                    <div className="capT">
                        <div className="centerT">Graphs</div>
                    </div>
                </div>
            </div>
            </Link>

        </div> 
            
        </div>
        } */}
        <div className="padTop"></div>
        <div className="wrap">
            <span>@p-monitor-2023</span>
        </div>
    </>)
}