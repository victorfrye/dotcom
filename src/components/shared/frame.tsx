export default function Frame({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="d-flex flex-column mb-auto frame-bg">
            <div className="d-flex flex-column framed-bg text-light">
                {children}
            </div>
        </div>
    )
}
