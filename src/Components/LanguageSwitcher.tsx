import { Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const languages = ['EN', 'PT'];
  const router = useRouter();
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="font-light py-1">
        <span>{router.locale?.toLocaleUpperCase()}</span>
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
          <>
            {languages
              .filter(
                (language) => language !== router.locale?.toLocaleUpperCase()
              )
              .map((language) => {
                return (
                  <Menu.Item key={language}>
                    <a
                      href={`${
                        router.basePath
                      }/${language.toLocaleLowerCase()}/${router.pathname}`}
                      className={'block px-4 py-2 font-light text-gray-900'}
                    >
                      {language}
                    </a>
                  </Menu.Item>
                );
              })}
          </>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { LanguageSwitcher };
