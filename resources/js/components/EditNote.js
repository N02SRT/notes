import axios from 'axios'
import React, {Component} from 'react'

class EditNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            note: [],
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleEditNote = this.handleEditNote.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleDeleteNote = this.handleDeleteNote.bind(this)
    }

    componentDidMount() {
        const noteId = this.props.match.params.id

        axios.get(`/api/notes/${noteId}`).then(response => {
            this.setState({
                note: response.data
            })
        })
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleEditNote(event) {
        event.preventDefault()

        const {history} = this.props
        const noteId = this.props.match.params.id
        const note = {
            note: this.state.note
        }
        console.log(noteId)
        axios.post('/api/notes/' + noteId + '/edit', note)
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

    hasErrorFor(field) {
        return !!this.state.errors[field]
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
              <strong>{this.state.errors[field][0]}</strong>
            </span>
            )
        }
    }

    handleDeleteNote() {
        const {history} = this.props

        const note = {
            note: this.state.note
        }

        axios.get('/api/notes/' + note.note.id + '/delete', note).then(response => {
            // redirect to the homepage
            history.push('/')
        })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    render() {
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Edit note
                                <span className='float-right'>
                            <button onClick={this.handleDeleteNote} className='btn btn-danger btn-sm'>
                                <i className='fa fa-trash'></i> Delete</button>
                            </span>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={this.handleEditNote}>
                                    <div className='form-group'>
                                        <label htmlFor='note'>Note</label>
                                        <textarea
                                            id='note'
                                            className={`form-control ${this.hasErrorFor('note') ? 'is-invalid' : ''}`}
                                            name='note'
                                            rows='10'
                                            value={this.state.note.note}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('note')}
                                    </div>
                                    <button className='btn btn-primary btn-sm'><i className='fa fa-edit'></i> Edit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditNote