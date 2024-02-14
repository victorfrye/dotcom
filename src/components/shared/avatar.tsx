import { Avatar } from "@fluentui/react-components";

export default function ProfileAvatar(): JSX.Element {
    return (
        <Avatar
            image={{ src: "/images/profile.png", alt: "a profile picture of Victor Frye" }}
            color="neutral"
            name="Victor Frye"
            active="active"
            activeAppearance="ring-shadow"
            size={72}
        />
    )
}
