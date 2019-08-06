import axios from 'axios'
import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class SingleNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            note: {},
            tasks: []
        }
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



    render() {
        const {note} = this.state

        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>Note ID# {note.id}
                                <span className='float-right'>
                                <button onClick={this.handleDeleteNote} className='btn btn-danger btn-sm'>
                                    <i className='fa fa-trash'></i> Delete</button></span><span className='float-right'>
                                <Link className='btn btn-primary btn-sm mb-3' to={`/${note.id}/edit`}>
                                    <i className='fa fa-edit'></i> Edit
                                </Link>
                            </span>
                            </div>
                            <div className='card-body'>
                                <p>{note.note}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleNote