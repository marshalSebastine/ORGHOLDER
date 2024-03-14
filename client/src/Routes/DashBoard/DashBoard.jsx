import TableStructure from "../../Components/Table/Table";
import { UserContext } from "../../Reducers/userReducer";
import Typography from '@mui/material/Typography';
import {getAllUsersOfOrg} from "../../utils/request.utils"
import "./DashBoard.style.css";
import { useContext, useEffect, useState } from "react";

export default function Dashboard() {

    const [userList, setUserList] = useState([]);
    let user = useContext(UserContext)
    let power = user.priviliges.join(", ")
    useEffect(() => {
        if(user.priviliges.includes("readAllUsers")){
            getAllUsersOfOrg().then(res => {
                if(res.status === 200){
                    res.json().then( res => {
                        setUserList(res.users);
                    })
    
                }
            })
        }
    }, []);
  

    return(
        <div className="dashboardwrapper">
            <div className="sidebar">
                <Typography variant="h3">{`Welcome to ${user.organisationName}`}</Typography>
                <Typography variant="h3">{user.fullName}</Typography>
                <Typography variant="h4">{`Your role is ${user.role}`}</Typography>
                <Typography variant="h5">{`Your previleges are`}</Typography>
                <Typography variant="h5">{power}</Typography>
            </div>
            <div className="board">
                <div className="tablewrapper">
                   {(userList.length !== 0) && <TableStructure users={userList}/>}
                </div>
            </div>
        </div>
    )
}