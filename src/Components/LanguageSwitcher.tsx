import { Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const languages = ['EN', 'PT'];
  const { locale, pathname, query } = useRouter();
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="font-light py-1 tracking-[0.25em]">
        <span>{locale?.toLocaleUpperCase()}</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top absolute -left-4 top-5 w-16 ring-opacity-5 focus:outline-none">
          {languages
            .filter((language) => language !== locale?.toLocaleUpperCase())
            .map((language) => {
              return (
                <Menu.Item key={language}>
                  <Link
                    href={{
                      pathname,
                      query: { slug: query.slug },
                    }}
                    locale={language.toLocaleLowerCase()}
                    className="block px-4 py-2 font-light text-primary-900 tracking-[0.25em]"
                  >
                    {language}
                  </Link>
                </Menu.Item>
              );
            })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { LanguageSwitcher };
