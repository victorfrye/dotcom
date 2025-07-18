'use client';

import { Button, makeStyles, tokens } from '@fluentui/react-components';
import { Cookies32Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    right: tokens.spacingHorizontalL,
    bottom: tokens.spacingVerticalL,
    zIndex: 1000,
  },
});

interface CookieButtonProps {
  onClick: () => void;
}

export default function CookieButton({ onClick }: CookieButtonProps) {
  const styles = useStyles();

  return (
    <Button
      icon={<Cookies32Regular />}
      as="button"
      shape="circular"
      appearance="outline"
      size="large"
      className={styles.fab}
      onClick={onClick}
    />
  );
}
