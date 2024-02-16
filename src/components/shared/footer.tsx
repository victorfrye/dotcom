'use client';

import { Text } from "@fluentui/react-components";

export default function Footer() {
    const _today: Date = new Date();

    return (
        <footer className="d-flex justify-content-end mt-auto p-3">
            <Text as="p" align="end" block>© Victor Frye {_today.getFullYear()}</Text>
        </footer>
    )
}
