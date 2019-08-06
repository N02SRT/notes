import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Notes extends Component {
    constructor () {
        super()
        this.state = {
            notes: []
        }
    }

    componentDidMount () {
        axios.get('/api/notes').then(response => {
            this.setState({
                notes: response.data
            })
        })
    }

    render () {
        const { notes } = this.state
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>All notes</div>
                            <div className='card-body'>
                                <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                                    <i className='fa fa-plus'></i> Create new note
                                </Link>
                                <ul className='list-group list-group-flush'>
                                    {notes.map(note => (
                                        <Link
                                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                                            to={`/${note.id}`}
                                            key={note.id}
                                        >
                                            {note.note}
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Notes