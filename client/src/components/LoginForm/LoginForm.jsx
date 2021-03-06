import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Paper, TextField, Button, Typography, Link } from '@material-ui/core'
import api from 'api'
import { getCookie, setCookie } from 'helpers/cookies'
import { observer } from 'mobx-react';

import './LoginForm.scss'

const LoginForm = observer((props) => {
  const { handleChangeFormType } = props
  const { setUser } = props.store
  const [userValues, setUserValues] = useState({ username: '', password: '' })
  const [loginFail, setLoginFail] = useState({ state: false, message: null })

  const handleChange = (field, event) => {
    setUserValues({ ...userValues, [field]: event.target.value })
  }

  const tryLogin = async () => {
    if (userValues.username === '') {
      setLoginFail({ state: true, type: 'username', message: 'Username can\'t be blank' })
    } else if (userValues.password === '') {
      setLoginFail({ state: true, type: 'password', message: 'Password can\'t be blank' })
    } else {
      await api.signIn({ username: userValues.username, password: userValues.password })
      .then(res => setCookie('token', res.data.token))
      .then(() => {
        api.getUser(getCookie('token'))
        .then(userData => setUser({ username: userData.data.username, email: userData.data.email, token: getCookie('token') }))
      })
      .catch((err) => setLoginFail({ state: true, type: 'both', message: err.response.data.message }))
    }
  }
  
  return (
    <Paper classes={{ root: "login_form" }}>
      {loginFail.type === 'both' && loginFail.message && <Typography classes={{ root: "login_failMessage" }}>{loginFail.message}</Typography>}
      <TextField error={loginFail.state && (loginFail.type === 'username' || loginFail.type === 'both')} helperText={loginFail.type === 'username' && loginFail.message} label="Username" value={userValues.username} onChange={e => handleChange('username', e)} variant="outlined" />
      <TextField error={loginFail.state && (loginFail.type === 'password' || loginFail.type === 'both')} helperText={loginFail.type === 'password' && loginFail.message} label="Password" value={userValues.password} onChange={e => handleChange('password', e)} variant="outlined" type="password" />
      <Box classes={{ root: "login_actionBar" }}>
        <Button onClick={tryLogin} classes={{ root: "login_actionBar_button" }} variant="contained" color="primary">Sign In</Button>
        <Box classes={{ root: "login_actionBar_textAction" }}>
          <Typography>Don't have an account?</Typography>
          <Link classes={{ root: "login_actionBar_textAction_link" }} onClick={() => handleChangeFormType('register')}>Sign Up!</Link>
        </Box>
      </Box>
    </Paper>
  )
})

LoginForm.propTypes = {
  handleChangeFormType: PropTypes.func,
}

export default LoginForm
