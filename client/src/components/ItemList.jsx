import Item from "./Item";
import './ItemList.css'

export default function ItemList(props) {
    
    return (
        <ul className="list-group ItemList">
            {props.items.map((item,index)=><Item key={index} item={item}/>)}
        </ul>
    );
}