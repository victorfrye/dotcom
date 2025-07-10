'use client';

import { JSX, cloneElement, useCallback } from 'react';

import {
  Body2,
  Subtitle1,
  Tag,
  TagGroup,
  Title1,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  BuildingMultipleColor,
  CertificateColor,
  LaptopColor,
  LibraryColor,
} from '@fluentui/react-icons';

import useResume from '@dotcom/resume/use-resume';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    gap: tokens.spacingVerticalXS,
    alignItems: 'center',
  },
  titleText: {
    margin: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalNone}`,
  },
  titleMedia: {
    height: '44px',
    width: '44px',
  },
  image: {
    height: '44px',
    width: '44px',
    borderRadius: '4px',
  },
  header: {
    display: 'flex',
    color: tokens.colorBrandForeground2,
    margin: `${tokens.spacingVerticalNone} auto ${tokens.spacingVerticalNone} ${tokens.spacingHorizontalNone}`,
  },
  bold: {
    fontWeight: 'bold',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    margin: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalXXXL}`,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
  },
  list: {
    listStyleType: 'disc',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    marginBlock: tokens.spacingVerticalXS,
    paddingInlineStart: tokens.spacingHorizontalXXL,
  },
  subtle: {
    color: tokens.colorNeutralForeground2,
  },
  skills: {
    flexWrap: 'wrap',
    gap: tokens.spacingVerticalS,
  },
});

export default function Resume() {
  const styles = useStyles();
  const { certifications, education, experience, skills } = useResume();

  const renderSectionTitle = useCallback(
    (title: string, media?: JSX.Element): JSX.Element => (
      <div className={styles.title}>
        {media && cloneElement(media, { className: styles.titleMedia })}
        <Title1 as="h2" className={styles.titleText}>
          {title}
        </Title1>
      </div>
    ),
    [styles]
  );

  const renderExperienceHistory = useCallback((): JSX.Element[] => {
    return experience
      .toSorted((a, b) =>
        (a.endDate ?? Date.now()) < (b.endDate ?? Date.now()) ? 1 : -1
      )
      .map((job) => (
        <div key={job.title} className={styles.item}>
          <Subtitle1 as="h3" className={styles.titleText}>
            {job.title + ' | ' + job.company.name}
          </Subtitle1>
          <Body2 className={styles.subtle}>
            {job.startDate.toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
            {job.endDate
              ? ` - ${job.endDate.toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}`
              : ' - Present'}
          </Body2>
          <Body2 className={styles.subtle}>
            <ul className={styles.list}>
              {job.accomplishments.map((accomplishment) => (
                <li key={accomplishment}>{accomplishment}</li>
              ))}
            </ul>
          </Body2>
        </div>
      ));
  }, [experience, styles]);

  const renderEducationHistory = useCallback((): JSX.Element[] => {
    return education
      .toSorted((a, b) =>
        (a.endDate ?? Date.now()) < (b.endDate ?? Date.now()) ? 1 : -1
      )
      .map((edu) => (
        <div key={edu.school.name} className={styles.item}>
          <Subtitle1 as="h3" className={styles.titleText}>
            {edu.degree + ' | ' + edu.school.name}
          </Subtitle1>
          <Body2 className={styles.subtle}>
            {edu.endDate
              ? `Graduated ${edu.endDate.toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}`
              : 'Currently enrolled'}
          </Body2>
        </div>
      ));
  }, [education, styles]);

  const renderCertifications = useCallback((): JSX.Element[] => {
    return certifications
      .toSorted((a, b) => (a.startDate > b.startDate ? -1 : 1))
      .map((certification) => (
        <div key={certification.name} className={styles.item}>
          <Subtitle1 as="h3" className={styles.titleText}>
            {certification.name}
          </Subtitle1>
          <Body2 className={styles.subtle}>
            {'Issued ' +
              certification.startDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              }) +
              ' by ' +
              certification.issuer.name}
          </Body2>
        </div>
      ));
  }, [certifications, styles]);

  const renderSkills = useCallback((): JSX.Element[] => {
    const skillsByCategory = skills.reduce<Record<string, typeof skills>>(
      (acc, skill) => {
        const category = skill.category || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
      },
      {}
    );

    return Object.entries(skillsByCategory).map(
      ([category, categorySkills]) => (
        <div key={category} className={styles.item}>
          <Subtitle1 as="h3" className={styles.titleText}>
            {category}
          </Subtitle1>
          <TagGroup className={styles.skills}>
            {categorySkills.map((skill) => (
              <Tag size="small" shape="circular" key={skill.name}>
                {skill.name}
              </Tag>
            ))}
          </TagGroup>
        </div>
      )
    );
  }, [styles, skills]);

  return (
    <div className={styles.container}>
      <section id="experience" className={styles.section}>
        {renderSectionTitle('Experience', <BuildingMultipleColor />)}
        {renderExperienceHistory()}
      </section>

      <section id="education" className={styles.section}>
        {renderSectionTitle('Education', <LibraryColor />)}
        {renderEducationHistory()}
      </section>

      <section id="certifications" className={styles.section}>
        {renderSectionTitle('Certifications', <CertificateColor />)}
        {renderCertifications()}
      </section>

      <section id="skills" className={styles.section}>
        {renderSectionTitle('Skills', <LaptopColor />)}
        {renderSkills()}
      </section>
    </div>
  );
}
