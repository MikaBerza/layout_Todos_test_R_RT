import React from 'react';
import style from './linkSocialNetwork.module.css';

const LinkSocialNetwork = ({ name, logo, address }) => {
  return (
    <div className={style.item}>
      <img className={style.logotype} src={logo} alt='logo' />
      <a className={style.name} href={address}>
        {name}
      </a>
    </div>
  );
};

LinkSocialNetwork.displayName = 'LinkSocialNetwork';
export default LinkSocialNetwork;
