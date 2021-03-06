import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';
import { useIntl } from 'react-intl';

import { Link } from 'react-router-dom';

import { DataProvider } from '../../contexts/DataContext';

export default function ThirdSection({ pages }) {
  const { formatMessage, locale } = useIntl();
  const { settings } = React.useContext(DataProvider);
  return (
    <div
      className={`pt-4 px-8 pb-2 bg-first-nav-light text-main-text  flex items-center justify-between  `}
    >
      <div className="flex items-center ">
        <Link to={`/${locale}/`}>
          {settings && (
            <img
              src={settings?.store_logo}
              alt="MRG-logo"
              style={{ height: '44px' }}
            />
          )}
        </Link>
        <div className="flex items-center flex-col mx-2 text-sm justify-center">
          <h1 className=" font-semibold mb-1 text-center">
            &copy; 2021 MRG . {formatMessage({ id: 'footer-all-rights' })}
          </h1>
          <div className="text-center">
            {formatMessage({ id: 'developed-by' })}
            <a className="font-bold mx-1 " href="https://mamacgroup.com">
              MAMAC GROUP
            </a>
          </div>
        </div>
      </div>

      {pages && (
        <div className="flex text-sm justify-evenly">
          {pages.map(page => {
            return (
              page.type === 'page' && (
                <Link
                  key={page.id}
                  to={`/${locale}/site/${page.page?.slug}`}
                  className="mr-4"
                >
                  {page.translation[locale].name}
                </Link>
              )
            );
          })}
        </div>
      )}
      {settings && (
        <div className="flex justify-evenly">
          <a
            rel="noopener noreferrer"
            href={`${settings?.sm_facebook}`}
            target="_blank"
            className="mr-4"
          >
            <FaFacebook className=" text-blue-600 h-25p w-25p" />
          </a>
          <a
            rel="noopener noreferrer"
            href={`${settings?.sm_twitter}`}
            target="_blank"
            className="mr-4"
          >
            <FaTwitter className=" text-blue-400 h-25p w-25p" />
          </a>
          <a
            rel="noopener noreferrer"
            href={`${settings?.sm_instagram}`}
            target="_blank"
            className="mr-4"
          >
            <FaInstagram className="h-25p w-25p text-red-400" />
          </a>
          <a
            rel="noopener noreferrer"
            href={`${settings?.sm_linkedin}`}
            target="_blank"
            className="mr-4"
          >
            <FaLinkedin className="h-25p w-25p text-blue-600" />
          </a>
          <a
            rel="noopener noreferrer"
            href={`${settings?.sm_whatsapp}`}
            target="_blank"
            className="mr-4"
          >
            <FaWhatsapp className="h-25p w-25p text-green-600" />
          </a>
        </div>
      )}
    </div>
  );
}
