import { useLocation } from "react-router-dom";

export default function NotFound() {
    const { pathname } = useLocation();
    return (
        <div>Cannot GET {pathname}</div>
    );
}