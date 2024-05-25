import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'

const Dashboard = () => {

    const navigate = useNavigate()

    const verifyIdentity = () => {

        const name = Cookie.get('name')

        if (name !== "T43_5UD03Rs") {
            navigate('/')
        }
    }

    useEffect(() => {

        verifyIdentity()

    }, [])

    return (
        <div>
            DashBoard
        </div>
    )
}

export default Dashboard
