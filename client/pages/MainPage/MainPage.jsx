import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { CircularLoading, SourceItems, FlexModal, SourceAddForm } from '../../components'
import api from '../../api'

import  './MainPage.scss';

const MainPage = ({ modal, refetchHash }) => {
    const [sources, setSources] = useState([])
    const [isLoading, setLoading] = useState(false)
    console.log(modal)
    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            await api.getAllSources().then(sources => {
                setSources(sources.data.data)
                setLoading(false)
            })
        }
        fetchData()
    }, [refetchHash])
    return (
        <>
        {isLoading ? (
            <CircularLoading />
        ) : (
            <>
                <SourceItems sources={sources} />
                <FlexModal modal={modal}>
                    <SourceAddForm />
                </FlexModal>
            </>
        )}
        </>
    )
}

const mapStateToProps = state => ({
    modal: state.modal,
    refetchHash: state.refetchHash
})

export default connect(mapStateToProps)(MainPage)
