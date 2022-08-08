import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const languages = ['EN', 'PT', 'FR'];
  const router = useRouter();
  return (
    <div className="flex focus:outline-none">
      {languages.map((language) => {
        return (
          <span key={language} className="w-1/3">
            <a
              href={`${router.basePath}/${language.toLocaleLowerCase()}${
                router.asPath
              }`}
              className={`px-4 py-2 w-full text-sm hover:font-bold ${
                router.locale?.toLocaleUpperCase() === language
                  ? 'font-bold text-gray-900'
                  : 'text-gray-700'
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
