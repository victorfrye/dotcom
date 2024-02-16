'use client';

import { Avatar, Persona, Text } from "@fluentui/react-components";
import ProfileAvatar from "./avatar";

export default function Header() {
    return (
        <header id="header" className="d-flex align-items-center py-3">
            <Persona
                avatar={{
                    image: { src: "/images/profile.png", alt: "a profile picture of Victor Frye" },
                    color: "neutral",
                    name: "Victor Frye",
                    active: "active",
                    activeAppearance: "ring-shadow",
                    size: 72
                }}
                name="Victor Frye"
                primaryText={<Text as="h1" weight="bold" wrap={false} className="text-primary">&#91;Victor Frye&#93;</Text>}
                secondaryText={<Text as="p" block/>}
                tertiaryText={<Text as="em" >Your friendly neighborhood developer</Text>}
                size="huge"
            />
        </header>
    )
}
