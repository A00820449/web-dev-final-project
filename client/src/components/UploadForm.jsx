import { useRef } from 'react';
import './UploadForm.css'
import { ItemData } from '../global.classes';

export default function UploadForm(props) {

    const todoTitle = useRef(HTMLInputElement);
    const todoDesc = useRef(HTMLTextAreaElement);

    function handler(e) {
        e.preventDefault();
        const newTitle = todoTitle.current.value.trim();
        const newDescription = todoDesc.current.value.trim();

        if (newTitle === "") {return;}

        const newItem =  new ItemData({title: newTitle, description: newDescription});
        props.submitCallback(newItem);
        todoTitle.current.value = '';
        todoDesc.current.value = '';
    }

    return (
        <form action="/" method="post" onSubmit={handler} className='UploadForm card'>
            <h2>Write your note here</h2>
            <div className='form-group'>
                <label htmlFor="form-title">Title:</label>
                <input className='form-control' type="text" ref={todoTitle} id="form-title" />
            </div>

            <div className='form-group'>
                <label htmlFor='form-description'>Description:</label>
                <textarea className='form-control' id='form-description' ref={todoDesc}></textarea>
            </div>

            <div className='form-group'>
                <input className='btn btn-primary' type="submit" value="Submit" />
            </div>
        </form>
    );
}