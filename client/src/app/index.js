import React, { useEffect, Suspense } from 'react'
// import { MainPage, LoginPage } from '../pages'
// import { PushUps } from 'components'
import { CircularLoading } from 'components'
import { observer } from 'mobx-react';
import api from 'api'
import { getCookie } from 'helpers/cookies'

import '../style/style.scss'

const MainPage = React.lazy(() => import('../pages/MainPage/MainPage.jsx'));
const LoginPage = React.lazy(() => import('../pages/LoginPage/LoginPage.jsx'));
const PushUps = React.lazy(() => import('components/PushUps'));

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
        ? <Suspense fallback={<CircularLoading />}>
            <LoginPage store={store} />
          </Suspense>
        : <Suspense fallback={<CircularLoading />}>
            <MainPage store={store} />
          </Suspense>
      }
      <Suspense fallback={<CircularLoading />}>
        <PushUps />
      </Suspense>
    </>
  )
})

export default App