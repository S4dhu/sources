import React, { useEffect, useState } from 'react'
import api from '../../api'

import './MainPage.scss';

const MainPage = () => {
    const [sources, setSources] = useState([])
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
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
            <div>
                Loading...
            </div>
        ) : (
            <div className="wrapper">{sources.map(s => {
                return <div key={s._id}>{s.name}</div>
            })}</div>
        )}
        </>
    )
}

export default MainPage
