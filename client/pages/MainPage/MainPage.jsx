import React, { useEffect, useState } from 'react'
import { CircularLoading, SourceItems, FlexModal, SourceAddForm, SourceEditForm, Footer, UserInfo } from '../../components'
import api from '../../api'
import { observer } from 'mobx-react';

import  './MainPage.scss';

const MainPage = observer(({ store }) => {
  const { modal, refetchHash, setSources, sources, user } = store
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      await api.getSourcesByUser(user.username).then(sources => {
        setSources(sources.data.data)
        setLoading(false)
      })
    }
    fetchData()
  }, [refetchHash, setSources, user.username])

  return (
    <>
      {isLoading ? (
        <CircularLoading />
      ) : (
        <>
          <UserInfo store={store} />
          <SourceItems sources={sources} store={store} />
          <FlexModal store={store} opened={modal}>
            {modal && modal.type === 'add' && <SourceAddForm store={store} />}
            {modal && modal.type === 'edit' && <SourceEditForm store={store} />}
          </FlexModal>
          <Footer />
        </>
      )}
    </>
  )
})

export default MainPage
