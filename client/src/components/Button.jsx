
export default function Button(props) {
    return (
        <div className={props.cancelState ? 'btn btn-danger' : 'btn btn-primary'} onClick={props.onClick}>
            {props.children}
        </div>
    );
}