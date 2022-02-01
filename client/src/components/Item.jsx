import "./Item.css"

export default function Item(props) {

    function removeThis() {
        props.removeCallback(props.item._id);
    }

    return (
        <li className="card list-group-item">
            <h3>{props.item.title}</h3>
            {(props.item.description !== "" && 
            <><hr /><i>{props.item.description}</i></>)}
            <button className="btn btn-danger" onClick={removeThis}>x</button>
        </li>
    );
}