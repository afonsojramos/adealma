import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const languages = ['EN', 'PT'];
  const router = useRouter();
  return (
    <div className="flex focus:outline-none">
      {languages.map((language) => {
        return (
          <span key={language} className="text-right pl-3">
            <a
              href={`${router.basePath}/${language.toLocaleLowerCase()}${
                router.asPath
              }`}
              className={`text-sm hover:font-bold ${
                router.locale?.toLocaleUpperCase() === language
                  ? 'font-normal text-gray-900'
                  : 'font-thin text-gray-700'
              }`}
            >
              {language}
            </a>
          </span>
        );
      })}
    </div>
  );
};

export { LanguageSwitcher };
