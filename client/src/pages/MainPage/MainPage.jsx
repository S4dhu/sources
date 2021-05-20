import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { CircularLoading, SourceItems, FlexModal, SourceAddForm, SourceEditForm, Footer, Sidebar, Header } from 'components'
import { Box } from '@material-ui/core'
import api from 'api'
import { observer } from 'mobx-react';
import { getCount } from 'helpers/categoryCounter'

import  './MainPage.scss';

const MainPage = observer(({ store }) => {
  const { modal, refetchHash, setSources, sources, user, sidebarOpened, selectedCategory, categories, setCategories } = store
  const [isLoading, setLoading] = useState(false)
  const [sourceList, setSourceList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([])
  const [allSourcesCount, setAllSourcesCount] = useState(0)
  const [unsortedSourcesCount, setUnsortedSourcesCount] = useState(0)
  const [categoryCount, setCategoryCount] = useState([])

  useEffect(() => {
    async function fetchCategories() {
      await api.getCategoriesByUser(user.username).then(categories => {
        setCategories(categories.data.data)
      })
    }

    fetchCategories()
  }, [refetchHash, setCategories, user.username])

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      await api.getSourcesByUser(user.username, selectedCategory).then(async sources => {
        setCategoryCount(getCount(sources.data.data))
        setSources(sources.data.data)
        setLoading(false)

        async function fetchCategories() {
          await api.getCategoriesByUser(user.username).then(categories => {
            const modifiedCategories = categories.data.data.map(c => ({ ...c, count: sources.data.data.filter(s => s.category === c.name).length }))
            setCategories(modifiedCategories)
          })
        }
    
        fetchCategories()
      })
    }
    async function getCountOfSources() {
      await api.getSourcesByUser(user.username, 'all').then(sources => {
        setAllSourcesCount(sources.data.data.length)
        setUnsortedSourcesCount(sources.data.data.filter(s => s.category === 'none').length)
      })
    }

    getCountOfSources()
    fetchData()
  }, [refetchHash, setSources, setCategories, user.username, selectedCategory])

  const getSourcesByCategory = async category => {
    setLoading(true)
    await api.getSourcesByUser(user.username, category).then(sources => {
      setSources(sources.data.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    setSourceList(sources)
  }, [sources])

  useEffect(() => {
    setCategoriesList(categories)
  }, [categories])

  const handleChangeInput = (value) => {
      setSourceList(sources.filter(s => s.name.toLowerCase().includes(value.toLowerCase())))
  }

  return (
    <>
      <Sidebar getSourcesByCategory={getSourcesByCategory} categoryCount={categoryCount} categories={categoriesList} allCount={allSourcesCount} unsortedCount={unsortedSourcesCount} store={store} />
      <Box className={cn(sidebarOpened && 'sidebarGap')}>
        <Header store={store} handleChange={handleChangeInput} />
        {isLoading ? (
          <CircularLoading />
        ) : (
          <>
            <SourceItems sources={sourceList} store={store} />
            <FlexModal store={store} opened={modal}>
              {modal && modal.type === 'add' && <SourceAddForm categories={categoriesList} store={store} />}
              {modal && modal.type === 'edit' && <SourceEditForm categories={categoriesList} store={store} />}
            </FlexModal>
          </>
        )}
        <Footer />
      </Box>
    </>
  )
})

export default MainPage
