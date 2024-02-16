'use client';

import ProfileAvatar from "./avatar";

export default function Header() {
    return (
        <header id="header" className="d-flex align-items-center">
            <ProfileAvatar />

            <div className="d-flex flex-column p-3 gap-1">
                <h1 className="text-primary"><strong>&#91;Victor Frye&#93;</strong></h1>
                <em>Your friendly neighborhood developer</em>
            </div>
        </header>
    )
}
