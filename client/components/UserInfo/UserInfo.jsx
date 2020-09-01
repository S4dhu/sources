import React from 'react'
import { Box, Typography } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { observer } from 'mobx-react';
import { deleteCookie } from '../../helpers/cookies'

import  './UserInfo.scss';

const UserInfo = observer(({ store }) => {
  const { user, setUser } = store
  const logout = () => {
    deleteCookie('token')
    setUser(null)
  }
  return (
    <Box className="userInfo_wrapper">
      <Typography variant="h6">{user.username}</Typography>
      <ExitToAppIcon className="userInfo_exitIcon" onClick={logout}/>
    </Box>
  )
})

export default UserInfo
