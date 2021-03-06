import React from 'react'
import PropTypes from 'prop-types'
import SourceBlock from '../SourceBlock'
import SourceAdd from '../SourceAdd'
import { Box } from '@material-ui/core'

import './SourceItems.scss'

const SourceItems = props => {
    const { sources, store } = props;

    return (
        <Box className="wrapper">
            <SourceAdd store={store} />
            {sources.map(s => <SourceBlock key={s._id} source={s} store={store} />)}
        </Box>
    )
}

SourceItems.propTypes = {
    sources: PropTypes.instanceOf(Array),
    store: PropTypes.any,
}

export default SourceItems
