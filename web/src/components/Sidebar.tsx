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
				<div className='fixed z-20 h-screen pt-24 overflow-y-scroll bg-green-500 w-60 md:w-1/3 lg:w-80'>
					<SearchBox />
					<CollapsibleMenu trigger='人物から探す'>
						{columnData.map((column) => (
							<Collapsible trigger={`・${column.column}`}>
								{column.name.map((name) => (
									<Link href={`/quote/author/${name.name}`} key={name.id}>
										<p
											className='pt-1 mb-1 text-sm font-semibold transition duration-500 transform cursor-pointer hover:text-green-500 lg:text-base'
											onClick={() => setOpen(false)}
										>
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
										<p
											className='pt-1 mb-1 text-sm font-semibold transition duration-500 transform cursor-pointer lg:text-base hover:text-green-500'
											onClick={() => setOpen(false)}
										>
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
								<p
									className='pt-1 mb-1 text-sm transition duration-500 transform cursor-pointer lg:text-base hover:text-green-500'
									onClick={() => setOpen(false)}
								>
									{category.name}
								</p>
							</Link>
						))}
					</CollapsibleMenu>
					<FaChevronCircleLeft
						onClick={() => setOpen(false)}
						className='fixed text-4xl text-black cursor-pointer left-64 sm:left-80 lg:left-96 top-2/4 hover:animate-bounce'
						data-testid='sidebar-button-open'
					/>
				</div>
			) : (
				<FaChevronCircleRight
					onClick={() => setOpen(true)}
					className='fixed z-10 text-4xl text-black cursor-pointer top-1/2 left-1 md:left-5 hover:animate-bounce'
					data-testid='sidebar-button-close'
				/>
			)}
		</>
	);
};
export default Sidebar;
