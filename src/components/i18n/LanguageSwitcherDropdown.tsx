import { Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';

const LanguageSwitcherDropdown = () => {
  const languages = ['EN', 'PT', 'FR'];
  const router = useRouter();
  return (
    <Menu as="div" className="relative text-left">
      <div>
        <Menu.Button className="navbar flex rounded-md px-4 py-2 items-center font-medium">
          <span className="w-5">{router.locale?.toLocaleUpperCase()}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="mt-0.5 -mr-1 ml-2 h-5 w-5"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-4 mt-2 w-16 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {languages.map((language) => {
              return (
                <Menu.Item key={language}>
                  <a
                    href={`${router.basePath}/${language.toLocaleLowerCase()}/${
                      router.pathname
                    }`}
                    className={`block px-4 py-2 text-sm hover:bg-gray-200 ${
                      router.locale?.toLocaleUpperCase() === language
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700'
                    }`}
                  >
                    {language}
                  </a>
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { LanguageSwitcherDropdown };
