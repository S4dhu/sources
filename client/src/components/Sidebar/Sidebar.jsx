import React, { useState } from 'react'
import cn from 'classnames'
import { Paper } from '@material-ui/core'
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import { observer } from 'mobx-react';
import Category from './subs/Category'
import CategoryInput from './subs/CategoryInput'
import { showError } from 'helpers/pushups'
import api from 'api'

import './Sidebar.scss'

const Sidebar = observer(({ store, allCount, unsortedCount, categories, categoryCount, getSourcesByCategory }) => {
  const { toggleSidebar, sidebarOpened, user, setRefetchHash } = store
  const [newCreation, setNewCreation] = useState(false)

  const cancelCreation = () => {
    setNewCreation(false)
  }

  const createCategory = async value => {
    await api.insertCategory({ name: value, user: user.username })
      .then(res => setRefetchHash(`${res.data.id}_category_add`))
      .then(() => setNewCreation(false))
      .catch(err => showError('Failed creation'))
  }

  const getCountOfCategory = name => {
    const filtered = categoryCount.filter(c => c.name === name)
    if (filtered[0]) return filtered[0].count
    else return 0
  }

  return (
    <Paper elevation={3} square className={cn('sidebar-wrapper', !sidebarOpened && 'sidebar-wrapper_closed')}>
      <KeyboardTabIcon onClick={toggleSidebar} className={cn('sidebar-icon', sidebarOpened && 'sidebar-icon_expanded')} />
      <p className="sidebar-title">Collections</p>
      <Category store={store} withoutActions onClick={() => getSourcesByCategory('all')} name="All" count={allCount} />
      <Category store={store} withoutActions onClick={() => getSourcesByCategory('none')} name="Unsorted" count={unsortedCount} />
      <hr />
      {categories.map((category, index) => <Category store={store} categoryId={category._id} key={`category-${index}`} onClick={() => getSourcesByCategory(category.name)} name={category.name} count={getCountOfCategory(category.name)} />)}
      {newCreation && <CategoryInput create={createCategory} close={cancelCreation} />}
      <Category store={store} withoutActions name="New collection..." onClick={() => setNewCreation(true)} />
    </Paper>
  )
})

export default Sidebar
