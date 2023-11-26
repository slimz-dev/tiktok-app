import { useContext, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons';
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames/bind';

import { PageContext } from '../../context/PageContext';
import styles from './Video.module.scss';
import Img from '~/components/Img';

const cx = classNames.bind(styles);
function Video({ arrayList }) {
	let runTime = 0;
	const vidRef = useRef([]);
	const vid = useContext(PageContext);
	function handleNext() {
		setTimeout(() => {
			vid.page.setPage((prev) => prev + 1);
		}, 1000);
	}
	function handleAutoPlay(inView, entry) {
		const currentVideo = entry.target.firstChild.id;
		if (inView) {
			if (runTime > 0) {
				vidRef.current[currentVideo].muted = false;
			}
			vidRef.current[currentVideo].play();
			runTime++;
		} else {
			vidRef.current[currentVideo].pause();
			vidRef.current[currentVideo].muted = true;
		}
	}

	return (
		<InfiniteScroll
			dataLength={arrayList.length}
			next={handleNext}
			style={{ overflow: 'hidden' }}
			hasMore={true}
			loader={
				<div className={cx('loading')}>
					<div></div>
					<div></div>
				</div>
			}
			endMessage={
				<p style={{ textAlign: 'center' }}>
					<b>Yay! You have seen it all</b>
				</p>
			}
		>
			{arrayList.map((item) => (
				<InView
					key={item.id}
					onChange={(inView, entry) => handleAutoPlay(inView, entry)}
					threshold={0.7}
				>
					<div className={cx('container')} id={item.id}>
						<div className={cx('header')}>
							<span className={cx('avatar')}>
								<Img src={item.user.avatar} alt="avatar" />
							</span>
							<div className={cx('description')}>
								<div className={cx('name')}>
									<div className={cx('tiktok_id')}>{item.user.nickname}</div>
									<div
										className={cx('username')}
									>{`${item.user.first_name} ${item.user.last_name}`}</div>
								</div>
								<div className={cx('title')}>{item.description}</div>
								{item.music && (
									<div className={cx('music')}>
										<FontAwesomeIcon icon={faSoundcloud} />
										<span>{item.music}</span>
									</div>
								)}
							</div>
							<button className={cx('follow-button')}>Follow</button>
						</div>
						<div className={cx('content')}>
							<div className={cx('video')}>
								<video
									controls
									loop
									muted
									ref={(element) => (vidRef.current[item.id] = element)}
								>
									<source src={item.file_url} type="video/mp4" />
								</video>
							</div>
							<div className={cx('video-button')}>
								<div className={cx('button')}>
									<FontAwesomeIcon icon={faHeart} className={cx('icon')} />
									<span className={cx('number')}>{item.likes_count}</span>
								</div>
								<div className={cx('button')}>
									<FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
									<span className={cx('number')}>{item.comments_count}</span>
								</div>
								<div className={cx('button')}>
									<FontAwesomeIcon icon={faShare} className={cx('icon')} />
									<span className={cx('number')}>{item.shares_count}</span>
								</div>
							</div>
						</div>
					</div>
				</InView>
			))}
		</InfiniteScroll>
	);
}

export default Video;
