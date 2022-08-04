import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from "../store";
import { useNavigate, useParams } from "react-router-dom"

function OAuth() {
    const navigate = useNavigate()
    const{ id } = useParams()
    const dispath = useDispatch()

    useEffect(() => {
        localStorage.setItem("userId", id)
        dispath(authActions.login())

        navigate("/blogs")
    }, [])

    return (
        <div>Loading...</div>
    )
}

export default OAuth