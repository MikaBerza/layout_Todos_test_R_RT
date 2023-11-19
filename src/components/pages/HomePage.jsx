import React from 'react';
import style from './homePage.module.css';

import Header from '../commons/headers/Header';
import Content from './content/Content';
import Footer from '../commons/footers/Footer';

function HomePage() {
  return (
    <>
      <div className={style.wrapper}>
        <Header title={'Todos'} />
        <Content />
        {/* <footer className='footers w1'>
          <div className='footers__container'>
            <div className='footers__text'>
              <span>Наши социальные сети</span>
            </div>
            <div className='footers__link'>
              <div className='footers__link-item'>
                <svg
                  className='footers__icon'
                  width='26'
                  height='26'
                  viewBox='0 0 26 26'
                >
                  <path
                    d='M14.6672 14C14.6672 12.7114 15.7116 11.6665 17.0003 11.6665C18.2889 11.6665 19.3339 12.7114 19.3339 14C19.3339 15.2886 18.2889 16.3335 17.0003 16.3335C15.7116 16.3335 14.6672 15.2886 14.6672 14ZM13.4057 14C13.4057 15.9852 15.015 17.5944 17.0003 17.5944C18.9856 17.5944 20.5949 15.9852 20.5949 14C20.5949 12.0148 18.9856 10.4056 17.0003 10.4056C15.015 10.4056 13.4057 12.0148 13.4057 14ZM19.8971 10.2631C19.8971 10.7267 20.2731 11.1033 20.7373 11.1033C21.201 11.1033 21.5776 10.7267 21.5776 10.2631C21.5776 9.79943 21.2016 9.42342 20.7373 9.42342C20.2731 9.42342 19.8971 9.79943 19.8971 10.2631ZM14.1719 19.6978C13.4894 19.6667 13.1185 19.5531 12.8719 19.4569C12.5451 19.3297 12.3121 19.1782 12.0667 18.9334C11.8219 18.6885 11.6698 18.4556 11.5431 18.1288C11.447 17.8822 11.3333 17.5113 11.3022 16.8288C11.2683 16.091 11.2615 15.8693 11.2615 14C11.2615 12.1307 11.2689 11.9096 11.3022 11.1712C11.3333 10.4887 11.4476 10.1183 11.5431 9.87124C11.6703 9.54443 11.8219 9.31147 12.0667 9.06607C12.3116 8.82124 12.5445 8.66914 12.8719 8.54249C13.1185 8.44636 13.4894 8.33271 14.1719 8.30162C14.9098 8.26769 15.1315 8.2609 17.0003 8.2609C18.8697 8.2609 19.0908 8.26826 19.8292 8.30162C20.5117 8.33271 20.8821 8.44693 21.1292 8.54249C21.456 8.66914 21.689 8.82124 21.9344 9.06607C22.1792 9.3109 22.3308 9.54443 22.458 9.87124C22.5541 10.1178 22.6678 10.4887 22.6989 11.1712C22.7328 11.9096 22.7396 12.1307 22.7396 14C22.7396 15.8687 22.7328 16.0904 22.6989 16.8288C22.6678 17.5113 22.5536 17.8822 22.458 18.1288C22.3308 18.4556 22.1792 18.6885 21.9344 18.9334C21.6896 19.1782 21.456 19.3297 21.1292 19.4569C20.8827 19.5531 20.5117 19.6667 19.8292 19.6978C19.0913 19.7317 18.8697 19.7385 17.0003 19.7385C15.1315 19.7385 14.9098 19.7317 14.1719 19.6978ZM14.1142 7.04241C13.369 7.07633 12.8601 7.19451 12.415 7.36753C11.9548 7.5462 11.5646 7.78595 11.175 8.17496C10.786 8.56397 10.5462 8.95412 10.3675 9.41494C10.1945 9.85994 10.0763 10.3688 10.0424 11.1141C10.0079 11.8604 10 12.099 10 14C10 15.901 10.0079 16.1396 10.0424 16.8859C10.0763 17.6312 10.1945 18.1401 10.3675 18.5851C10.5462 19.0453 10.7854 19.436 11.175 19.825C11.564 20.2141 11.9542 20.4532 12.415 20.6325C12.8606 20.8055 13.369 20.9237 14.1142 20.9576C14.8612 20.9915 15.0992 21 17.0003 21C18.9019 21 19.1399 20.9921 19.8863 20.9576C20.6316 20.9237 21.1405 20.8055 21.5855 20.6325C22.0458 20.4532 22.436 20.2141 22.8256 19.825C23.2146 19.436 23.4538 19.0453 23.633 18.5851C23.8061 18.1401 23.9248 17.6312 23.9582 16.8859C23.9921 16.139 24 15.901 24 14C24 12.099 23.9921 11.8604 23.9582 11.1141C23.9242 10.3688 23.8061 9.85994 23.633 9.41494C23.4538 8.95468 23.2146 8.56454 22.8256 8.17496C22.4365 7.78595 22.0458 7.5462 21.5861 7.36753C21.1405 7.19451 20.6316 7.07577 19.8869 7.04241C19.1405 7.00848 18.9019 7 17.0008 7C15.0992 7 14.8612 7.00792 14.1142 7.04241Z'
                    fill='#A6A6A6'
                  />
                </svg>
                <a className='footers__link-name' href='#Instagram'>
                  instagram
                </a>
              </div>

              <div className='footers__link-item'>
                <svg
                  className='footers__icon'
                  width='26'
                  height='26'
                  viewBox='0 0 26 26'
                >
                  <path
                    d='M20.9881 5H18.2711C16.6587 5 14.8653 5.67811 14.8653 8.01522C14.8732 8.82956 14.8653 9.60945 14.8653 10.4872H13V13.4553H14.923V22H18.4567V13.3989H20.789L21 10.4788H18.3958C18.3958 10.4788 18.4016 9.17988 18.3958 8.80265C18.3958 7.87908 19.3568 7.93197 19.4146 7.93197C19.8719 7.93197 20.7612 7.9333 20.9894 7.93197V5H20.9881Z'
                    fill='#A6A6A6'
                  />
                </svg>
                <a className='footers__link-name' href='#Facebook'>
                  facebook
                </a>
              </div>

              <div className='footers__link-item'>
                <svg
                  className='footers__icon'
                  width='26'
                  height='26'
                  viewBox='0 0 26 26'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M23.5395 10.8053C23.6802 10.3316 23.5395 10 22.883 10H20.6946C20.1318 10 19.8817 10.3 19.741 10.6316C19.741 10.6316 18.6312 13.3789 17.0524 15.1474C16.5366 15.6684 16.3177 15.8263 16.0363 15.8263C15.8957 15.8263 15.6924 15.6684 15.6924 15.1947V10.8053C15.6924 10.2368 15.5361 10 15.0672 10H11.6282C11.2843 10 11.0655 10.2684 11.0655 10.5053C11.0655 11.0421 11.8471 11.1684 11.9409 12.6526V15.9053C11.9409 16.6158 11.8158 16.7421 11.5344 16.7421C10.7998 16.7421 8.98648 13.9947 7.92353 10.8368C7.70469 10.2526 7.50148 10 6.93874 10H4.75032C4.12505 10 4 10.3 4 10.6316C4 11.2158 4.73469 14.1211 7.45459 17.9579C9.26785 20.5789 11.8158 22 14.1293 22C15.5205 22 15.6924 21.6842 15.6924 21.1474V19.1579C15.6924 18.5263 15.8175 18.4 16.2708 18.4C16.5991 18.4 17.1462 18.5579 18.4436 19.8211C19.9286 21.3211 20.1787 22 21.0072 22H23.1956C23.8209 22 24.1335 21.6842 23.9459 21.0684C23.7427 20.4526 23.0393 19.5526 22.1014 18.4789C21.5856 17.8632 20.8196 17.2158 20.6008 16.8842C20.2725 16.4579 20.3663 16.2684 20.6008 15.9053C20.6008 15.8895 23.2738 12.1 23.5395 10.8053Z'
                    fill='#A6A6A6'
                  />
                </svg>
                <a className='footers__link-name' href='#Vkontakte'>
                  vkontakte
                </a>
              </div>
            </div>
          </div>
        </footer> */}
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
