import Link from 'next/link';
import { useState, VFC } from 'react';
import Collapsible from 'react-collapsible';

import { categoryData } from '../data/categoryData';
import { columnData } from '../data/columnData';
import { regionData } from '../data/regionData';
import CollapsibleMenu from './parts/CollapsibleMenu';
import SearchBox from './parts/SearchBox';

import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

interface SidebarProps {}

const Sidebar: VFC<SidebarProps> = ({}) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			{open ? (
				<div className='fixed z-10 w-1/5 h-screen pt-24 overflow-y-scroll bg-green-500'>
					<SearchBox />
					<CollapsibleMenu trigger='人物から探す'>
						{columnData.map((column) => (
							<Collapsible key={column.id} trigger={`・${column.column}`}>
								{column.name.map((name) => (
									<Link href={`/quote/author/${name.name}`} key={name.id}>
										<p className='pt-1 mb-1 text-sm font-semibold transition duration-500 transform cursor-pointer hover:text-green-500 lg:text-base'>
											{name.name}
										</p>
									</Link>
								))}
							</Collapsible>
						))}
					</CollapsibleMenu>
					<CollapsibleMenu trigger='国別で探す'>
						{regionData.map((region) => (
							<Collapsible key={region.id} trigger={`・${region.region}`}>
								{region.name.map((name) => (
									<Link href={`/quote/country/${name.name}`} key={name.id}>
										<p className='pt-1 mb-1 text-sm font-semibold transition duration-500 transform cursor-pointer lg:text-base hover:text-green-500'>
											{name.name}
										</p>
									</Link>
								))}
							</Collapsible>
						))}
					</CollapsibleMenu>
					<CollapsibleMenu trigger='カテゴリーで探す'>
						{categoryData.map((category) => (
							<Link href={`/quote/category/${category.name}`} key={category.id}>
								<p className='pt-1 mb-1 text-sm transition duration-500 transform cursor-pointer lg:text-base hover:text-green-500'>
									{category.name}
								</p>
							</Link>
						))}
					</CollapsibleMenu>
					<FaChevronCircleLeft
						onClick={() => setOpen(false)}
						className='fixed text-4xl text-green-500 cursor-pointer left-48 top-2/4 hover:animate-bounce'
					/>
				</div>
			) : (
				<FaChevronCircleRight
					onClick={() => setOpen(true)}
					className='fixed z-10 text-4xl text-green-500 cursor-pointer top-2/4 left-5 hover:animate-bounce'
				/>
			)}
		</>
	);
};
export default Sidebar;
