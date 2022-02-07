import "./LoadScreen.css"
import { SyncIcon } from "@primer/octicons-react";

export default function LoadScreen() {
    return (
        <div className="LoadScreen">
            <SyncIcon size={64} fill="#ffffff" className="wheel" />
        </div>
    );
}