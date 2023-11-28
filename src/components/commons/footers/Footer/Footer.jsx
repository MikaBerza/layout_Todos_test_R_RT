import React from 'react';

import instagramLogo from '../../../../assets/images/instagramIcon.png';
import facebookLogo from '../../../../assets/images/facebookIcon.png';
import vkontakteLogo from '../../../../assets/images/vkontakteIcon.png';

import LinkSocialNetwork from '../../links/LinkSocialNetwork/LinkSocialNetwork';
import style from './footer.module.css';

const Footer = () => {
  return (
    <footer className={style.wrapper}>
      <div className={style.inner}>
        <div className={style.text}>
          <span>Наши социальные сети</span>
        </div>
        <div className={style.socials}>
          <LinkSocialNetwork
            name='instagram'
            logo={instagramLogo}
            address='#Instagram'
          />
          <LinkSocialNetwork
            name='facebook'
            logo={facebookLogo}
            address='#Facebook'
          />
          <LinkSocialNetwork
            name='vkontakte'
            logo={vkontakteLogo}
            address='#Vkontakte'
          />
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
export default Footer;
