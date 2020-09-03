import React, { useEffect } from 'react'
import { MainPage, LoginPage } from '../pages'
import { PushUps } from 'components'
import { observer } from 'mobx-react';
import api from 'api'
import { getCookie } from 'helpers/cookies'

import '../style/style.scss'

const App = observer(({ store }) => {
  const { user, setUser } = store
  const token = getCookie('token')
  useEffect(() => {
    if (token) {
      async function user() {
        await api.getUser(token)
        .then(res => setUser({ username: res.data.username, email: res.data.email, token }))
        .catch(err => console.error(err))
      }
      user()
    } else {
      setUser(null)
    }
  }, [setUser, token])
  return (
    <>
      {user === null 
        ? <LoginPage store={store} />
        : <MainPage store={store} />
      }
      <PushUps />
    </>
  )
})

export default App