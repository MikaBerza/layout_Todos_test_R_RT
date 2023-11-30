import React from 'react';
import PropTypes from 'prop-types';
import style from './linkSocialNetwork.module.css';

const LinkSocialNetwork = ({ name, logo, address }) => {
  //
  LinkSocialNetwork.propTypes = {
    name: PropTypes.string,
    logo: PropTypes.string,
    address: PropTypes.string,
  };

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
