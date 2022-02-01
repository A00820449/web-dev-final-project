export default function Item(props) {
    return (
        <li className="list-group-item">
            {props.item.title}
        </li>
    );
}