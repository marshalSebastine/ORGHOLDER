import * as React from 'react';
import Table from '@mui/joy/Table';


export default function TableStructure({users, type}) {
  return (
    <Table sx={{color: "white", width: "90%", height: "110px"}} size='md'>
      <caption style={{fontSize: "14px", color: "white"}}>{`${type} Table.`}</caption>
      <thead>
        <tr>
          <th style={{ width: '40%' }}>Mail Id</th>
          <th>fullName</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {users.map((row) => (
            
          <tr key={row._id}>
            <td>{row.mailId}</td>
            <td>{row.fullName}</td>
            <td>{row.password}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
