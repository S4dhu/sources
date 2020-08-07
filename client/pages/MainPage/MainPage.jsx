import React, { useEffect, useState } from 'react'
import { CircularLoading, SourceItems, SourceAddModal } from '../../components'
import api from '../../api'
import { store } from '../../redux/redux-store'

import  './MainPage.scss';

const MainPage = () => {
    const [sources, setSources] = useState([])
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        console.log(store.getState())
        setLoading(true)
        async function fetchData() {
            await api.getAllSources().then(sources => {
                setSources(sources.data.data)
                setLoading(false)
            })
        }
        fetchData()
    }, [])
    return (
        <>
        {isLoading ? (
            <CircularLoading />
        ) : (
            <>
                <SourceItems sources={sources} />
                <SourceAddModal isOpen={true} />
            </>
        )}
        </>
    )
}

export default MainPage
