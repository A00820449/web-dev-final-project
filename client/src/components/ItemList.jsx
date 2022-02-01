import Item from "./Item";
import './ItemList.css'

export default function ItemList(props) {
    
    return (
        <ul className="list-group ItemList">
            {props.items.map((item)=><Item key={item._id} item={item}/>)}
        </ul>
    );
}