import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';
import config from '~/config';
import { Icon } from '~/Icons';
import { languages } from '~/data';
import { linkItem1, linkItem2, linkItem3, linkItem4 } from './data';
import FooterLink from '~/components/FooterLink';
import LinkWrapper from '~/components/LinkWrapper';
import Language from './Language';

const cx = classNames.bind(styles);

function Footer() {
	return (
		<div className={cx('footer')}>
			<div className={cx('link')}>
				<LinkWrapper>
					<Link
						to={config.routes.Home[0]}
						style={{
							borderBottom: 'none',
							display: 'flex',
							width: '40%',
							height: '24%',
						}}
					>
						<span className={cx('logo-wrapper')}>
							<Icon.Logo />
						</span>
					</Link>
				</LinkWrapper>

				<LinkWrapper>
					<FooterLink data={linkItem1} />
				</LinkWrapper>

				<LinkWrapper>
					<FooterLink data={linkItem2} />
				</LinkWrapper>

				<LinkWrapper>
					<FooterLink data={linkItem3} />
				</LinkWrapper>

				<LinkWrapper>
					<FooterLink data={linkItem4} />
				</LinkWrapper>
			</div>
			<div className={cx('footer-other')}>
				<Language data={languages} />
				<span className={cx('copyright')}>© 2023 TikTok</span>
			</div>
		</div>
	);
}

export default Footer;
