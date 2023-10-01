import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { search } from '~/services/searchService';
import { useDebounce } from '~/hooks';
import styles from './HeaderSearch.module.scss';
import SearchList from '~/layouts/component/Header/HeaderSearch/SearchList';
const cx = classNames.bind(styles);

function HeaderSearch() {
	const [input, setInput] = useState('');
	const [isFocus, setIsFocus] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [searchResult, setSearchResult] = useState([]);

	const searchContainerRef = useRef();
	const inputRef = useRef();
	let lastInput = useDebounce(input, 800);
	useEffect(() => {
		if (!!lastInput) {
			const fetchApi = async () => {
				setIsLoading(true);
				const result = await search(lastInput);
				setSearchResult(result.data);
				setIsLoading(false);
			};
			fetchApi();
		}
	}, [lastInput]);

	function handleChange(value) {
		let inputValue = value;

		//Set min width khi type
		searchContainerRef.current.style.minWidth = '293px';

		if (inputValue[0] !== ' ') {
			setInput(value);
		}
		if (!inputValue) {
			searchContainerRef.current.style.minWidth = '';
			setSearchResult([]);
		}
	}
	return (
		<Tippy
			interactive
			visible={isFocus && searchResult.length > 0}
			render={(attrs) => <SearchList data={searchResult} />}
			onClickOutside={() => {
				setIsFocus(false);
			}}
			data-theme="dark"
		>
			<div className={cx('header-search')} ref={searchContainerRef}>
				<input
					ref={inputRef}
					className={cx('header-search-bar')}
					placeholder="Tìm kiếm"
					spellCheck={false}
					value={input}
					onChange={(e) => {
						handleChange(e.target.value);
					}}
					onFocus={() => {
						setIsFocus(true);
					}}
				/>
				<button
					onClick={() => {
						setInput('');
						setSearchResult([]);
						searchContainerRef.current.style.minWidth = '';
						inputRef.current.focus();
					}}
				>
					<FontAwesomeIcon
						icon={isLoading ? faSpinner : faCircleXmark}
						className={cx(
							'load-or-clear',
							'fa-lg',
							{
								none: !input,
							},
							{
								spinner: isLoading,
							}
						)}
						style={{
							color: 'gray',
						}}
					/>
				</button>
				<span className={cx('separator')}></span>
				<button
					onMouseDown={(e) => {
						e.preventDefault();
					}}
				>
					<FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-icon')} />
				</button>
			</div>
		</Tippy>
	);
}

export default HeaderSearch;
