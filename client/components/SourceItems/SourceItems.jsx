import React from 'react'
import PropTypes from 'prop-types'
import SourceBlock from '../SourceBlock'
import SourceAddContainer from '../../redux/containers/SourceAddContainer'
import { Box } from '@material-ui/core'

import './SourceItems.scss'

const SourceItems = props => {
    const { sources } = props;
    return (
        <Box className="wrapper">
            {sources.map(s => <SourceBlock key={s._id} link={s.link} name={s.name} />)}
            <SourceAddContainer />
        </Box>
    )
}

SourceItems.propTypes = {
    sources: PropTypes.instanceOf(Array)
}

export default SourceItems
