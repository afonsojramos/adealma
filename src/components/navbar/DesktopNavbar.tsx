import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const DestopNavbar = () => {
  const { t } = useTranslation('common');
  return (
    <ul className="menu menu-horizontal p-0">
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/resume">
          <a>
            {t('title_resume')}
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </a>
        </Link>
        <ul className="p-2 shadow bg-base-100 rounded-box">
          <li>
            <Link href="/resume#education">
              <a>Education</a>
            </Link>
          </li>
          <li>
            <Link href="/resume#experience">
              <a>Experience</a>
            </Link>
          </li>
          <li>
            <Link href="/resume#skills">
              <a>Skills</a>
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <Link href="/projects">
          <a>{t('title_projects')}</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>{t('title_about')}</a>
        </Link>
      </li>
    </ul>
  );
};

export { DestopNavbar };
