import TableStructure from "../../Components/Table/Table";
import { UserContext } from "../../Reducers/userReducer";
import "./DashBoard.style.css";
import { useContext } from "react";

export default function Dashboard() {

    let user = useContext(UserContext)
    console.log("user recieved at dashboard", user)
    let power = user.priviliges.join(", ")
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
                    <TableStructure/>
                </div>
            </div>
        </div>
    )
}