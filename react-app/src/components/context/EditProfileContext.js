import React, { createContext, useState, useContext } from 'react'

export const EditProfileContext = createContext()

export const EditProfileProvider = (props) => {

    const [modalOpen, setModalOpen] = useState(false)

    return (
        <EditProfileContext.Provider value={{ modalOpen, setModalOpen }}>
            {props.children}
        </EditProfileContext.Provider>
    )
}

export const useEditProfile = () => {
    return useContext(EditProfileContext)
}
