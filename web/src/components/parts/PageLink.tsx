import { FC } from 'react'
import Link from 'next/link';

interface PageLinkProps {
    href: string;
    text: string;
    textClass?: string;
}

const PageLink: FC<PageLinkProps> = ({ href, text, textClass }) => {
    return (
        <Link href={href}>
            <a className={`${textClass ? textClass : ''}`} >{text}</a>
        </Link>
    );
}
export default PageLink;