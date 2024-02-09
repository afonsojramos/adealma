import { useTranslation } from 'next-i18next';

export const Logo = () => {
  const { t } = useTranslation('common');
  return (
    <span
      className={
        'inline-flex items-center font-bold tracking-[.15em] text-primary-900'
      }
    >
      {t('site_name')}
    </span>
  );
};
