// import "./../../App.scss"

// import { Chart } from "react-google-charts";
// import { useState } from "react"
// import { io } from "socket.io-client"
// import { retriveData, save } from "../../utils/localStorage"
// import { useEffect } from "react"
// import { MainUrl } from "../../../variables"


// export const Graph = () => {
//     const [data, setData] = useState(retriveData("userPmdata"))
//     useEffect(() => {
//         const socket = io(MainUrl)
//         socket.on("connect", () => console.log(socket.id))
//         socket.on("dataSet", (data) => {
//             console.log(data);
//             // compute data and restore back to the localStorage
//         })
//     }, [])
//     return (

//         <>
//             <div className="buy">
//                 <div style={{textAlign:"center", fontWeight:"bold", paddingTop:"1rem"}}> Real time Graphs</div>
//             </div>


//         </>
//     )
// }



import React from "react";
import { Chart } from "react-google-charts";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { io } from "socket.io-client"
import { retriveData, save } from "../../utils/localStorage"
import { MainUrl } from "../../../variables"





export const Graph = () => {
    const [datas, setData] = useState(retriveData("userPmdata"))
    const [vbs, setVbs] = useState(null)
    const [ready, setReady] = useState(false)
    let { id } = useParams()
    useEffect(() => {
        const socket = io(MainUrl)
        socket.on("connect", () => console.log(socket.id))
        socket.on("dataSet", (datass) => {
            save("userPmdata", datass.reverse())
            let vb = [["Year", "Reading"]]
            const createData = () => {
                datass.forEach(element => {
                    vb.push([element.createdAt.slice(11, 16), parseInt(element[h])])
                })
            }
            createData()
            setVbs(vb)
        })
    }, [])



    const ts = () => {
        if (id == 1) {
            return "temp"
        }
        if (id == 2) {
            return "spo"
        }
        if (id == 3) {
            return "bpm"
        }
    }
    let h = ts()

    useEffect(()=> {
        let vb = [["Year", "Reading"],]
        const createData = () => {
            datas.forEach(element => {
                vb.push([element.createdAt.slice(11, 16), parseInt(element[h])])
            })
        }
        createData()
        setVbs(vb)
        setReady(true)
    }, [])

    const options = {
        title: h,
        curveType: "function",
        legend: { position: "bottom" },
    };
    return (
        <>
        {
            ready &&   <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={vbs}
            options={options}
        />
        }
        
        </>
       
    );
}
