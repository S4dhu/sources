import React from 'react'
import PropTypes from 'prop-types'
import { Box, InputBase } from '@material-ui/core'

import './SearchInput.scss'

const SearchInput = props => {
    const { handleChange } = props;
    return (
        <Box className="input_wrapper">
            <InputBase onChange={e => handleChange(e.target.value)} classes={{ root: 'input '}} placeholder="Search..." />
        </Box>
    )
}

SearchInput.propTypes = {
    handleChange: PropTypes.any,
}

export default SearchInput
