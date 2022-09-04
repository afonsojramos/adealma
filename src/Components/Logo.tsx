import { useTranslation } from 'next-i18next';

const Logo = () => {
  const { t } = useTranslation('common');
  return (
    <span
      className={`text-gray-900 inline-flex items-center tracking-[.15em] font-bold`}
    >
      {t('site_name')}
    </span>
  );
};

export { Logo };
