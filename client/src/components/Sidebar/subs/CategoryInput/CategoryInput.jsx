import React, { useState } from 'react'
import { Box, TextField } from '@material-ui/core'
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import './CategoryInput.scss'

const CategoryInput = ({ close, create }) => {
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState(false)

  const changeValue = e => {
    setInputValue(e.target.value)
  }

  const tryCreate = () => {
    if (inputValue.trim() === '') {
      setInputError(true)
      document.getElementById('categoryAddInput').focus()
    } else create(inputValue.trim())
  }

  return (
    <Box className="category-input-wrapper">
      <TextField autoFocus id="categoryAddInput" error={inputError} helperText={inputError && "Incorrect value"} onChange={e => changeValue(e)} className="category-input" />
      <CheckRoundedIcon onClick={tryCreate} className="category-add-icon category-add-icon_ok-gap" />
      <CloseRoundedIcon onClick={close} className="category-add-icon category-add-icon_cancel-gap" />
    </Box>
  )
}

export default CategoryInput
