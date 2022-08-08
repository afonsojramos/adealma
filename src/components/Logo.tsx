import { useTranslation } from 'next-i18next';
import Image from 'next/image';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const size = props.xl ? '44' : '32';
  const fontStyle = props.xl
    ? 'font-semibold text-3xl'
    : 'font-semibold text-xl';
  const { t } = useTranslation('common');

  return (
    <span className={`text-gray-900 inline-flex items-center ${fontStyle}`}>
      <Image
        src="/assets/icons/black.png"
        alt="logo"
        width={size}
        height={size}
      ></Image>

      <span className="pt-1">{t('site_name')}</span>
    </span>
  );
};

export { Logo };
