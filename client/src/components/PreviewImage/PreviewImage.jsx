import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'

import './PreviewImage.scss'

const PreviewImage = props => {
    const { imageLink } = props
    return (
        <Box className="imageContainer">
            <img className="imageBox" src={imageLink} alt="Sources.io" />
        </Box>
    )
}

PreviewImage.propTypes = {
    imageLink: PropTypes.string
}

export default PreviewImage
