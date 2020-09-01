import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Paper, TextField } from '@material-ui/core'
import api from '../../api'
import { showSuccess } from '../../helpers/pushups'

import './RegisterForm.scss'

const RegisterForm = props => {
    const { handleChangeFormType } = props
    const [userValues, setUserValues] = useState({ username: '', password: '', email: '' })
    const handleChange = (field, event) => {
        setUserValues({ ...userValues, [field]: event.target.value })
    }

    const trySignUp = async () => {
        await api.signUp({ username: userValues.username, password: userValues.password, email: userValues.email })
        .then(() => {
            showSuccess(`User ${userValues.username} registered successfully`)
            handleChangeFormType('login')
        })
        .catch(err => console.error(err))
    }

    return (
        <Paper classes={{ root: "login_form" }}>
            <TextField label="Username" value={userValues.username} onChange={e => handleChange('username', e)} variant="outlined" />
            <TextField label="Password" value={userValues.password} onChange={e => handleChange('password', e)} variant="outlined" type="password" />
            <TextField label="Email" value={userValues.email} onChange={e => handleChange('email', e)} variant="outlined" />
            <Box classes={{ root: "register_actionBar" }}>
                <Button onClick={trySignUp} classes={{ root: "register_actionBar_button" }} variant="contained" color="primary">Create Account</Button>
                <Button onClick={() => handleChangeFormType('login')} classes={{ root: "register_actionBar_button" }} variant="contained" color="secondary">Sign In</Button>
            </Box>
        </Paper>
    )
}

RegisterForm.propTypes = {
    handleChangeFormType: PropTypes.func,
}

export default RegisterForm
