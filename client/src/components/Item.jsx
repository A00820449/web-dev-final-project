import { TrashIcon } from '@primer/octicons-react'
import "./Item.css"

export default function Item(props) {

    function removeThis() {
        props.removeCallback(props.item._id);
    }

    return (
        <li className="card list-group-item">
            <h3>{props.item.title}</h3>
            
            {props.item.description !== "" && 
            <div><hr /><i>{props.item.description}</i></div>}
            
            <div>
                <button className="btn btn-danger" onClick={removeThis}><TrashIcon /></button>
            </div>
        </li>
    );
}