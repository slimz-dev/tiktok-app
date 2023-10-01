import { Link } from 'react-router-dom';
import TyppyWrapper from '~/layouts/component/TyppyWrapper';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchList.module.scss';
import Img from '~/components/Img';

const cx = classNames.bind(styles);

function SearchList({ data }) {
	return (
		<div className={cx('typpy-wrapper')}>
			<TyppyWrapper>
				<span className={cx('account-search')}>Account</span>
				<div className={cx('account-container')}>
					{data.map((user) => {
						let path = `/@${user.nickname}`;
						return (
							<Link className={cx('account-slot')} key={user.id} to={path}>
								<Img src={user.avatar} alt="" />
								<div className={cx('info')}>
									<span className={cx('info-name')}>
										<h4>{user.full_name}</h4>
										<span
											className={cx('check', {
												none: !user.tick,
											})}
										>
											<FontAwesomeIcon
												icon={faCheckCircle}
												className={cx('check')}
											/>
										</span>
									</span>
									<span className={cx('info-username')}>{user.nickname}</span>
								</div>
							</Link>
						);
					})}
				</div>
			</TyppyWrapper>
		</div>
	);
}

export default SearchList;
