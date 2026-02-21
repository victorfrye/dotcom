'use client';

import {
  Body2,
  Button,
  makeStyles,
  Subtitle1,
  Tag,
  TagGroup,
  Title1,
  tokens,
} from '@fluentui/react-components';
import {
  AppsColor,
  BuildingMultipleColor,
  CertificateColor,
  LibraryColor,
  OpenRegular,
  PuzzlePieceColor,
} from '@fluentui/react-icons';
import { cloneElement, type JSX, useCallback } from 'react';

import type Skill from '@/resume/skill';
import ResumeText from '@/resume/strings';
import useResume from '@/resume/use-resume';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    margin: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalXXXL}`,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    gap: tokens.spacingVerticalXS,
    alignItems: 'center',
  },
  titleMedia: {
    height: '44px',
    width: '44px',
  },
  titleText: {
    margin: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalNone}`,
  },
  image: {
    height: '44px',
    width: '44px',
    borderRadius: '4px',
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
  footer: {
    margin: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalNone}`,
  },
});

export default function Resume() {
  const styles = useStyles();
  const { certifications, education, experience, skills, portfolio } =
    useResume();

  const renderSectionTitle = useCallback(
    (title: string, media?: JSX.Element): JSX.Element => (
      <div className={styles.title}>
        {media && cloneElement(media, { className: styles.titleMedia })}
        <Title1 as="h2" className={styles.titleText}>
          {title}
        </Title1>
      </div>
    ),
    [styles],
  );

  const renderExperienceHistory = useCallback((): JSX.Element[] => {
    return experience
      .toSorted((a, b) =>
        (a.endDate ?? Date.now()) < (b.endDate ?? Date.now()) ? 1 : -1,
      )
      .map((job) => (
        <div key={job.title} className={styles.item}>
          <Subtitle1 as="h3" className={styles.titleText}>
            {`${job.title} | ${job.company.name}`}
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
        (a.endDate ?? Date.now()) < (b.endDate ?? Date.now()) ? 1 : -1,
      )
      .map((edu) => (
        <div key={edu.school.name} className={styles.item}>
          <Subtitle1 as="h3" className={styles.titleText}>
            {`${edu.degree} | ${edu.school.name}`}
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
    const skillsByCategory = skills.reduce<Record<string, Skill[]>>(
      (acc, skill) => {
        const category = skill.category || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
      },
      {},
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
      ),
    );
  }, [styles, skills]);

  const renderPortfolio = useCallback((): JSX.Element[] => {
    return portfolio
      .toSorted((a, b) => (a.startDate < b.startDate ? -1 : 1))
      .map((project) => (
        <div key={project.name} className={styles.item}>
          <Subtitle1 as="h3" className={styles.titleText}>
            {project.name}
          </Subtitle1>
          <Body2 className={styles.subtle}>{project.description}</Body2>
          {project.link && (
            <div className={styles.footer}>
              <Button
                icon={<OpenRegular />}
                as="a"
                size="small"
                href={project.link}
                target="_blank"
                rel="me noreferrer noopener"
                key={project.link}
              >
                {ResumeText.portfolio.open}
              </Button>
            </div>
          )}
        </div>
      ));
  }, [portfolio, styles]);

  return (
    <div className={styles.container}>
      <section id="experience" className={styles.section}>
        {renderSectionTitle(
          ResumeText.experience.title,
          <BuildingMultipleColor />,
        )}
        {renderExperienceHistory()}
      </section>

      <section id="education" className={styles.section}>
        {renderSectionTitle(ResumeText.education.title, <LibraryColor />)}
        {renderEducationHistory()}
      </section>

      <section id="certifications" className={styles.section}>
        {renderSectionTitle(
          ResumeText.certifications.title,
          <CertificateColor />,
        )}
        {renderCertifications()}
      </section>

      <section id="skills" className={styles.section}>
        {renderSectionTitle(ResumeText.skills.title, <PuzzlePieceColor />)}
        {renderSkills()}
      </section>

      <section id="portfolio" className={styles.section}>
        {renderSectionTitle(ResumeText.portfolio.title, <AppsColor />)}
        {renderPortfolio()}
      </section>
    </div>
  );
}
