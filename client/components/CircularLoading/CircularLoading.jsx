import React from 'react'
import { CircularProgress } from '@material-ui/core'
import './CircularLoading.scss'

const CircularLoading = () => {
    return (
        <CircularProgress className="loader" size={76} />
    )
}

export default CircularLoading