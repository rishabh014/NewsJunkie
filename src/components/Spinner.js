import React, { Component } from 'react'
import loading from './Spinner-1s-200px.gif'

const Spinner = () => {

    return (
        <div className='text-center'>
            <img src={loading} alt="loading" />
        </div>

    )
}

export default Spinner