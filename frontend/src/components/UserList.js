import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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
            {users && users.map(user => (
                <div onClick={() => navigate(`/user/${user._id}`)}>
                    {user.name} - {user.free} Free posts - {user.premium} Premium posts
                </div>
            ))}
        </div>
    )
}

export default UserList