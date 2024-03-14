import * as React from 'react';
import Table from '@mui/joy/Table';


export default function TableStructure({users}) {
  return (
    <Table sx={{color: "white", width: "90%", height: "110px"}} size='md'>
      <caption style={{fontSize: "24px", color: "white"}}>{`All Users in the Organization.`}</caption>
      <thead>
        <tr>
          <th style={{ width: '40%' , fontSize: "18px"}}>Mail Id</th>
          <th style={{fontSize: "18px"}}>fullName</th>
          <th style={{fontSize: "18px"}}>Role</th>
          <th style={{fontSize: "18px"}}>Password</th>
        </tr>
      </thead>
      <tbody>
        {users.map((row) => (
            
          <tr key={row._id}>
            <td>{row.mailId}</td>
            <td>{row.fullName}</td>
            <td>{row.role}</td>
            <td>{row.password}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
