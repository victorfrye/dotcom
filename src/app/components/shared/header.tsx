import ProfileAvatar from "@dotcom/components/shared/avatar";

export default function Header() {
    return (
        <header id="header" className="d-flex align-items-center">
            <ProfileAvatar />

            <div className="d-flex flex-column p-3 gap-1">
                <h1 className="text-primary"><strong>&#91;Victor Frye&#93;</strong></h1>
                <span>
                    Your friendly neighborhood technologist
                </span>
            </div>
        </header>
    )
}
