import React from 'react'
import PropTypes from 'prop-types'
import { Box, Link } from '@material-ui/core'
import PreviewImage from '../PreviewImage'

import './SourceBlock.scss'

const SourceBlock = props => {
    const { name, link } = props
    return (
        <Box className="sourceBox">
            <Link target="_blank" href={link} color="initial" underline="none">
                <PreviewImage imageLink="https://lh3.googleusercontent.com/vA4tG0v4aasE7oIvRIvTkOYTwom07DfqHdUPr6k7jmrDwy_qA_SonqZkw6KX0OXKAdk" />
                <Box className="title">{name}</Box>
            </Link>
        </Box>
    )
}

SourceBlock.propTypes = {
    name: PropTypes.string,
    link: PropTypes.string
}

export default SourceBlock
