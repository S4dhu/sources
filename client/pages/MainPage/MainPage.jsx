import React, { useEffect, useState } from 'react'
import { CircularLoading, SourceItems, FlexModal, SourceAddForm, SourceEditForm, Footer, PushUps } from '../../components'
import api from '../../api'
import { observer } from 'mobx-react';

import  './MainPage.scss';

const MainPage = observer(({ store }) => {
    const { modal, refetchHash } = store
    const [sources, setSources] = useState([])
    const [isLoading, setLoading] = useState(false)
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
                <SourceItems sources={sources} store={store} />
                <FlexModal store={store} opened={modal}>
                    {modal && modal.type === 'add' && <SourceAddForm store={store} />}
                    {modal && modal.type === 'edit' && <SourceEditForm store={store} />}
                </FlexModal>
                {/* <PushUps /> */}
                <Footer />
            </>
        )}
        </>
    )
})

export default MainPage
