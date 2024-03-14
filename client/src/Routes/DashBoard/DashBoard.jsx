import TableStructure from "../../Components/Table/Table";
import { UserContext } from "../../Reducers/userReducer";
import {getAllUsersOfOrg} from "../../utils/request.utils"
import "./DashBoard.style.css";
import { useContext, useEffect, useState } from "react";

export default function Dashboard() {

    const [userList, setUserList] = useState([]);
    let user = useContext(UserContext)
    console.log("user recieved at dashboard", user)
    let power = user.priviliges.join(", ")
    useEffect(() => {
        if(user.priviliges.includes("readAllUsers")){
            console.log("start fetch for all users of org")
            getAllUsersOfOrg().then(res => {
                if(res.status === 200){
                    console.log("all users fetch success")
                    res.json().then( res => {
                        console.log("all users list recieved", res.users)
                        setUserList(res.users);
                    })
    
                }
            })
        }
    }, []);

  

    return(
        <div className="dashboardwrapper">
            <div className="sidebar">
                <h3>{`Welcome to ${user.organisationName}`}</h3>
                <p>{user.fullName}</p>
                <p>{`Your role is ${user.role}`}</p>
                <p>Your privileges are</p>
                <p>{power}</p>
            </div>
            <div className="board">
                <div className="tablewrapper">
                   {(userList.length !== 0) && <TableStructure users={userList} type={"All Users"}/>}
                </div>
            </div>
        </div>
    )
}