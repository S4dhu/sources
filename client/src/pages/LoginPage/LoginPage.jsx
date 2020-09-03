import React, { useState } from 'react'
import { LoginForm, RegisterForm, Footer } from 'components'
import { observer } from 'mobx-react';

const LoginPage = observer(({ store }) => {
    const [formType, setFormType] = useState('login')
    const handleChangeFormType = type => {
        setFormType(type)
    }
    return (
        <>
            {formType === 'login'
                ? <LoginForm store={store} handleChangeFormType={handleChangeFormType} />
                : <RegisterForm handleChangeFormType={handleChangeFormType} />
            }
            <Footer />
        </>
    )
})

export default LoginPage
