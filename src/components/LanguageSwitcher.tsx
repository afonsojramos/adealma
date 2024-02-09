import { Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LangEN, LangPT } from './Icons';

const LanguageImage = ({ locale }: { locale?: string }) => {
  const langClass = 'h-5 w-5 sm:h-6 sm:w-6 xl:w-7 xl:h-7';

  if (locale === 'PT') return <LangPT className={langClass} />;
  return <LangEN className={langClass} />;
};

export const LanguageSwitcher = () => {
  const languages = ['EN', 'PT'];
  const { locale, pathname, query } = useRouter();
  return (
    <Menu as='div' className='relative flex'>
      <Menu.Button aria-label='switch language'>
        <LanguageImage locale={locale?.toLocaleUpperCase()} />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute -left-4 top-5 w-16 origin-top ring-opacity-5 focus:outline-none'>
          {languages
            .filter((language) => language !== locale?.toLocaleUpperCase())
            .map((language) => (
              <Menu.Item key={language}>
                <Link
                  href={{
                    pathname,
                    query: { slug: query.slug },
                  }}
                  locale={language.toLocaleLowerCase()}
                  className='block px-4 py-2'
                >
                  <LanguageImage locale={language} />
                </Link>
              </Menu.Item>
            ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
