import { FC } from 'react';
import Collapsible from 'react-collapsible';

interface CollapsibleMenuProps {
	trigger: string;
}

const CollapsibleMenu: FC<CollapsibleMenuProps> = ({ trigger, children }) => {
	return (
		<Collapsible
			trigger={trigger}
			className='p-1 mx-2 my-5 bg-white rounded-lg cursor-pointer'
			openedClassName='mx-2 my-5 p-1 bg-white rounded-lg cursor-pointer'
		>
			{children}
		</Collapsible>
	);
};
export default CollapsibleMenu;
