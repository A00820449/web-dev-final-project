import { useRef, useState } from 'react';
import './UploadForm.css'

export default function UploadForm(props) {

    const todoTitle = useRef();

    function handler(e) {
        e.preventDefault();
        todoTitle.current.val = '';
        props.submitCallback({title: todoTitle.current.value, description: "TODO"});
    }

    return (
        <form action="/" method="post" onSubmit={handler}>
            <h2>Write your note here</h2>
            <div className='form-group'>
                <label htmlFor="form-title">Title:</label>{' '}
                <input className='form-control' type="text" ref={todoTitle} id="form-title" />
            </div>

            <div className='form-group'>
                <label htmlFor='form-description'>Description:</label>{' '}
                <textarea className='form-control' id='form-description'></textarea>
            </div>

            <div className='form-group'>
                <input type="submit" value="Submit" />
            </div>
        </form>
    );
}