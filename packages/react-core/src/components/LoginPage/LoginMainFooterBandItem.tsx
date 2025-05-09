import styles from '@patternfly/react-styles/css/components/Login/login';
import { css } from '@patternfly/react-styles';

export interface LoginMainFooterBandItemProps extends React.HTMLProps<HTMLParagraphElement> {
  /** Content rendered inside the footer link item */
  children?: React.ReactNode;
  /** Additional classes added to the footer link item  */
  className?: string;
}

export const LoginMainFooterBandItem: React.FunctionComponent<LoginMainFooterBandItemProps> = ({
  children = null,
  className = '',
  ...props
}: LoginMainFooterBandItemProps) => (
  <p className={css(`${styles.loginMainFooterBand}-item`, className)} {...props}>
    {children}
  </p>
);
LoginMainFooterBandItem.displayName = 'LoginMainFooterBandItem';
