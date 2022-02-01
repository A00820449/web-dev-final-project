export default function Item(props) {
    return (
        <li className="list-group-item">
            <h3>{props.item.title}</h3>
            {(props.item.description !== "" && 
            <><hr /><i>{props.item.description}</i></>)}
        </li>
    );
}