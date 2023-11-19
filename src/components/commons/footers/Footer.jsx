import React from 'react';
import style from './footer.module.css';

import instagramLogo from '../../../assets/instagramIcon.png';
import facebookLogo from '../../../assets/facebookIcon.png';
import vkontakteLogo from '../../../assets/vkontakteIcon.png';

import LinkSocialNetwork from '../links/LinkSocialNetwork';
//
function Footer() {
  return (
    <footer className={style.wrapper}>
      <div className={style.inner}>
        <div className={style.text}>
          <span>Наши социальные сети</span>
        </div>
        <div className={style.links}>
          <LinkSocialNetwork
            name={'instagram'}
            logo={instagramLogo}
            address={'#Instagram'}
          />
          <LinkSocialNetwork
            name={'facebook'}
            logo={facebookLogo}
            address={'#Facebook'}
          />
          <LinkSocialNetwork
            name={'vkontakte'}
            logo={vkontakteLogo}
            address={'#Vkontakte'}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
