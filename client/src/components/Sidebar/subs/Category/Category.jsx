import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit';
import { deleteCategoryById, updateSourceById, getSourcesByUser, updateCategoryById } from 'api'
import { observer } from 'mobx-react';
import CategoryInput from '../CategoryInput'

import './Category.scss'

const Category = observer(({ store, categoryId, name, count, onClick, withoutActions }) => {
  const { setRefetchHash, user } = store
  const [isEditMode, setEditMode] = useState(null)
  
  
  const enableEditMode = event => {
    event.stopPropagation()
    setEditMode(true)
  }

  const disableEditMode = () => {
    setEditMode(false)
  }

  const deleteCategory = async event => {
    event.stopPropagation()
    await deleteCategoryById(categoryId)
    .then(async () => await getSourcesByUser(user.username, name)
      .then(sources => sources.data.data.forEach(async s => await updateSourceById(s._id, { ...s, category: 'none' })))
    )
    .then(() => setRefetchHash(`${categoryId}_category_delete`))
    .catch(err => console.error(err))
  }

  const updateCategory = async value => {
    const prevName = name
    await updateCategoryById(categoryId, { name: value })
      .then(async () => await getSourcesByUser(user.username, prevName)
        .then(sources => sources.data.data.forEach(async s => await updateSourceById(s._id, { ...s, category: value })))
      )
      .then(() => setRefetchHash(`${categoryId}_${value}_category_edit`))
      .then(() => setEditMode(false))
      .catch(err => console.error(err))
  }
  
  return (
    <>
    {!isEditMode ? 
      <Box onClick={onClick} className="category-wrapper">
        <Box className="category-name">{name}</Box>
        <Box className="category-count">{count}</Box>
        {!withoutActions && <Box className="category-actions">
          <EditIcon onClick={enableEditMode} classes={{ root: 'category-action-icon' }} />
          <DeleteForeverIcon onClick={deleteCategory} classes={{ root: 'category-action-icon' }} />
        </Box>}
      </Box>
    : <CategoryInput create={updateCategory} close={disableEditMode} />}
    </>
  )
})

export default Category
