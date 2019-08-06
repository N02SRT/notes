import axios from 'axios'
import React, { Component } from 'react'

class NewNote extends Component {
    constructor (props) {
        super(props)
        this.state = {
            note: '',
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewNote = this.handleCreateNewNote.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateNewNote (event) {
        event.preventDefault()

        const { history } = this.props

        const note = {
            note: this.state.note
        }

        axios.post('/api/notes', note)
            .then(response => {
                // redirect to the homepage
                history.push('/')
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
              <strong>{this.state.errors[field][0]}</strong>
            </span>
            )
        }
    }

    render () {
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Create new note</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleCreateNewNote}>
                                    <div className='form-group'>
                                        <label htmlFor='note'>Note</label>
                                        <textarea
                                            id='note'
                                            className={`form-control ${this.hasErrorFor('note') ? 'is-invalid' : ''}`}
                                            name='note'
                                            rows='10'
                                            value={this.state.note}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('note')}
                                    </div>
                                    <button className='btn btn-primary btn-sm'><i className='fa fa-check'></i> Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewNote