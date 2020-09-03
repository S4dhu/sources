import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Paper, TextField, Typography, Link } from '@material-ui/core'
import api from 'api'
import { showSuccess } from 'helpers/pushups'
import { validateEmail } from 'helpers/validation'

import './RegisterForm.scss'

const RegisterForm = props => {
  const { handleChangeFormType } = props
  const [userValues, setUserValues] = useState({ username: '', password: '', email: '' })
  const [confirmationalPassword, setConfirmationalPassword] = useState('')
  const [registerFail, setRegisterFail] = useState({ state: false, message: null })
  const [incorrectPassword, setIncorrectPassword] = useState({ state: false, type: '' })

  const handleChange = (field, event) => {
    setUserValues({ ...userValues, [field]: event.target.value })
  }

  const handleChangeConfirmationalPassword = event => {
    setConfirmationalPassword(event.target.value)
  }

  const trySignUp = async () => {
    setRegisterFail({ state: false, type: null, message: null })
    setIncorrectPassword(false)
    if (userValues.password === confirmationalPassword) {
      if (userValues.password.length < 5) {
        setIncorrectPassword({ state: true, type: 'short' })
        setRegisterFail({ state: true, type: 'shortPassword', message: 'Password is too short. Minimum 5 characters' })
      } else if (userValues.username === '') {
        setRegisterFail({ state: true, type: 'username', message: 'Username can\'t be blank' })
      } else if (userValues.email === '') {
        setRegisterFail({ state: true, type: 'email', message: 'Email can\'t be blank' })
      } else if (!validateEmail(userValues.email)) {
        setRegisterFail({ state: true, type: 'email', message: 'Email is invalid' })
      } else {
        await api.signUp({ username: userValues.username, password: userValues.password, email: userValues.email })
        .then(() => {
          showSuccess(`User ${userValues.username} registered successfully`)
          handleChangeFormType('login')
        })
        .catch(err => setRegisterFail({ state: true, type: err.response.data.type, message: err.response.data.message }))
      }
    } else {
      setIncorrectPassword({ state: true, type: 'mismatch' })
    }
  }

  return (
    <Paper classes={{ root: "login_form" }}>
      <TextField error={registerFail.state && registerFail.type === 'username'} helperText={registerFail.type === 'username' && registerFail.message} label="Username" value={userValues.username} onChange={e => handleChange('username', e)} variant="outlined" />
      <TextField error={registerFail.state && registerFail.type === 'email'} helperText={registerFail.type === 'email' && registerFail.message} label="Email" value={userValues.email} onChange={e => handleChange('email', e)} variant="outlined" />
      <TextField error={incorrectPassword.state} helperText={registerFail.type === 'shortPassword' && registerFail.message} label="Password" value={userValues.password} onChange={e => handleChange('password', e)} variant="outlined" type="password" />
      <TextField error={incorrectPassword.state} helperText={incorrectPassword.type === 'mismatch' && "Password mismatch"} label="Confirm password" value={confirmationalPassword} onChange={e => handleChangeConfirmationalPassword(e)} variant="outlined" type="password" />
      <Box classes={{ root: "register_actionBar" }}>
      {/* {registerFail.message && <Typography classes={{ root: "register_failMessage" }}>{registerFail.message}</Typography>} */}
        <Button onClick={trySignUp} classes={{ root: "register_actionBar_button" }} variant="contained" color="primary">Create Account</Button>
        <Box classes={{ root: "register_actionBar_textAction" }}>
          <Typography>Already have an account?</Typography>
          <Link classes={{ root: "register_actionBar_textAction_link" }} onClick={() => handleChangeFormType('login')}>Sign In!</Link>
        </Box>
      </Box>
    </Paper>
  )
}

RegisterForm.propTypes = {
  handleChangeFormType: PropTypes.func,
}

export default RegisterForm
