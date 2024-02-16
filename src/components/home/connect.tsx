import { Image, Link, Text } from "@fluentui/react-components";
import React from "react";

interface ISocial {
    href: string;
    image: JSX.Element;
}

export default function Connect() {
    const socialDetails: ISocial[] = [
        {
            href: "https://threads.net/@thevictorfryeadventure",
            image: <Image src="/images/threads.svg" alt="Threads" height={20} width={20} />
        },
        {
            href: "https://linkedin.com/in/victorfrye",
            image: <Image src="/images/linkedin.svg" alt="LinkedIn" height={20} width={20} />
        },
        {
            href: "https://github.com/victorfrye",
            image: <Image src="/images/github.svg" alt="GitHub" height={20} width={20} />
        },
        {
            href: "mailto:victorfrye@outlook.com",
            image: <Image src="/images/envelope.svg" alt="Email Me" height={20} width={20} />
        }
    ];

    const renderSocialButtons = (): JSX.Element[] => {
        return socialDetails.map((social, index) =>
            <Link as="a" href={social.href} target="_blank" rel="noreferrer noopener" className="btn-link btn-social" key={index} slot="button">
                {social.image}
            </Link>
        );
    }

    return (
        <section id="connect" className="d-flex flex-column flex-wrap">
            <Text as="h2" className="text-primary pt-4 pb-3">_Connect</Text>

            <div className="d-flex flex-row flex-nowrap gap-3 p-0 pt-1 pb-3">
                {renderSocialButtons()}
            </div>
        </section>
    )
}
