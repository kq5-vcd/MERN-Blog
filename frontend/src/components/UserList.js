import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Paper,
    tableCellClasses, 
}from "@mui/material";

import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

function UserList() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const sendRequest = async () => {
        const res = await axios
          .get(`http://localhost:2022/api/user/users`)
          .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };

    useEffect(() => {
        sendRequest().then((data) => setUsers(data.userList));
    }, [])
    
    console.log(users);

    return (
        <div>
        <Paper sx={{
            width: "50%",
            margin: "auto",
        }}>
            <TableContainer component={Paper}sx={{ mt: 5}}>
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">User</StyledTableCell>
                        <StyledTableCell align="center">Free Posts</StyledTableCell>
                        <StyledTableCell align="center">Premium Posts</StyledTableCell>
                    </TableRow>
                </TableHead>
                {users && users.map(user => (
                    <TableBody>
                        <StyledTableRow key={user.name}>
                            <StyledTableCell component="th" scope="row" align='center'
                                            onClick={() => navigate(`/user/${user._id}`)}
                            sx={{
                                color: '#0051ff',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}>
                                    {user.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{user.free}</StyledTableCell>
                            <StyledTableCell align="center">{user.premium}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                ))}
            </Table>
            </TableContainer>
        </Paper>
            
        </div>
    )
}

export default UserList