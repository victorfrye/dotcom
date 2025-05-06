import { cloneElement } from 'react';

import {
  Body1,
  Button,
  Card,
  CardHeader,
  Subtitle2,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { OpenRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    color: tokens.colorBrandForeground2,
    margin: `${tokens.spacingVerticalNone} auto ${tokens.spacingVerticalNone} ${tokens.spacingHorizontalNone}`,
  },
  image: {
    color: tokens.colorBrandForeground2,
    height: '44px',
    width: '44px',
    borderRadius: '4px',
  },
});

interface ResumeCardProps {
  headerIcon: JSX.Element;
  headerTitle: string;
  headerSubtitle: string;
  content?: JSX.Element;
  actionUrl?: string;
  orientation?: 'horizontal' | 'vertical';
}

export default function ResumeCard({
  headerIcon,
  headerTitle,
  headerSubtitle,
  content,
  actionUrl,
  orientation = 'vertical',
}: Readonly<ResumeCardProps>) {
  const styles = useStyles();

  return (
    <Card
      orientation={orientation}
      appearance="filled-alternative"
      size="small"
    >
      <CardHeader
        image={cloneElement(headerIcon, { className: styles.image })}
        header={
          <Subtitle2 as="h4" className={styles.header}>
            {headerTitle}
          </Subtitle2>
        }
        description={<Body1 as="em">{headerSubtitle}</Body1>}
        action={
          actionUrl && actionUrl !== '' ? (
            <Button
              as="a"
              icon={<OpenRegular />}
              appearance="subtle"
              size="small"
              href={actionUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Open link in new tab"
            />
          ) : null
        }
      />
      {content ?? null}
    </Card>
  );
}
