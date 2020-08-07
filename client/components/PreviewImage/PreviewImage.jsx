import React from 'react'
import PropTypes from 'prop-types'

import './PreviewImage.scss'

const PreviewImage = props => {
    const { imageLink } = props
    return (
        <img className="imageBox" src={imageLink} alt="Sources.io" />
    )
}

PreviewImage.propTypes = {
    imageLink: PropTypes.string
}

export default PreviewImage
