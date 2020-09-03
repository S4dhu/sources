import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SourceBlock from '../SourceBlock'
import SourceAdd from '../SourceAdd'
import SearchInput from '../SearchInput'
import { Box } from '@material-ui/core'

import './SourceItems.scss'

const SourceItems = props => {
    const { sources, store } = props;
    const [sourceList, setSourceList] = useState([]);
    useEffect(() => {
        setSourceList(sources)
    }, [sources])

    const handleChangeInput = (value) => {
        setSourceList(sources.filter(s => s.name.toLowerCase().includes(value.toLowerCase())))
    }

    return (
        <>
            <SearchInput handleChange={handleChangeInput} />
            <Box className="wrapper">
                <SourceAdd store={store} />
                {sourceList.map(s => <SourceBlock key={s._id} source={s} store={store} />)}
            </Box>
        </>
    )
}

SourceItems.propTypes = {
    sources: PropTypes.instanceOf(Array),
    store: PropTypes.any,
}

export default SourceItems
