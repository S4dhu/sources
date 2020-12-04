import React from 'react'
import cn from 'classnames'
import { Box } from '@material-ui/core'
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import { observer } from 'mobx-react';

import './Sidebar.scss'

const Sidebar = observer(({ store }) => {
  const { toggleSidebar, sidebarOpened } = store
  return (
    <Box className={cn('sidebar-wrapper', !sidebarOpened && 'sidebar-wrapper_closed')}>
      <KeyboardTabIcon onClick={toggleSidebar} className={cn('sidebar-icon', sidebarOpened && 'sidebar-icon_expanded')} />
    </Box>
  )
})

export default Sidebar
