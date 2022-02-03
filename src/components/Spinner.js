import React, { Component } from 'react'
import loading from './spinner.gif'

export class Spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img className='my-3' src={loading} alt="loading"/>
            </div>
        )
    }
}

export default Spinner
