'use client';

import { makeStyles, Spinner } from '@fluentui/react-components';

const useStyles = makeStyles({
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
});

export default function Loading() {
  const styles = useStyles();

  return (
    <Spinner
      label={'Loading...'}
      size="extra-large"
      className={styles.spinner}
    />
  );
}
