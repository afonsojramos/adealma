import { ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
  color: string;
  classnames?: string;
};

const Background = (props: IBackgroundProps) => (
  <div className={`min-h-screen ${props.color} ${props.classnames}`}>
    {props.children}
  </div>
);

export { Background };
