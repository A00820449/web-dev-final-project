import Item from "./Item";

export default function ItemList(props) {
    
    return (
        <ul className="list-group">
            {props.items.map((item,index)=><Item key={index} item={item}/>)}
        </ul>
    );
}