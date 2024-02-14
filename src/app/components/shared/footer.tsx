export default function Footer() {
    const _today: Date = new Date();

    return (
        <footer className="d-flex justify-content-end mt-auto p-3">
            © Victor Frye {_today.getFullYear()}
        </footer>
    )
}
