import { FC, MouseEventHandler } from 'react';
import Link from 'next/link';

interface PageLinkProps {
	href: string;
	text: string;
	textClass?: string;
	onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const PageLink: FC<PageLinkProps> = ({ href, text, textClass, onClick }) => {
	return (
		<Link href={href}>
			<a className={`${textClass ? textClass : ''}`} onClick={onClick}>
				{text}
			</a>
		</Link>
	);
};
export default PageLink;
