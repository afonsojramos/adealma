import { useTranslation } from 'next-i18next';

const FooterCopyright = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <div className="footer-copyright">
        © Copyright {new Date().getFullYear()} {t('title')}.
      </div>
    </>
  );
};

export { FooterCopyright };
