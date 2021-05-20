import React from 'react'
import { Box } from '@material-ui/core'
// import SearchInput from '../SearchInput'
// import UserInfo from '../UserInfo'
import { UserInfo, SearchInput } from '../'

import './Header.scss'

const Header = ({ store, handleChange }) => {
  return (
    <Box className="header-wrapper">
      <SearchInput handleChange={handleChange} />
      <UserInfo store={store} />
    </Box>
  )
}

export default Header
