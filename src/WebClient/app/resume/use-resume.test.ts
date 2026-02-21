import { renderHook, waitFor } from '@testing-library/react';

import useResume from './use-resume';

describe('useResume', () => {
  it('initially sets loading to true then false after mount', async () => {
    const { result } = renderHook(() => useResume());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('populates experience array from resume.json', async () => {
    const { result } = renderHook(() => useResume());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.experience.length).toBeGreaterThan(0);
  });

  it('populates education array from resume.json', async () => {
    const { result } = renderHook(() => useResume());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.education.length).toBeGreaterThan(0);
  });

  it('populates skills array from resume.json', async () => {
    const { result } = renderHook(() => useResume());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.skills.length).toBeGreaterThan(0);
  });

  it('populates certifications from resume.json', async () => {
    const { result } = renderHook(() => useResume());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.certifications.length).toBeGreaterThan(0);
  });

  it('populates portfolio from resume.json', async () => {
    const { result } = renderHook(() => useResume());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.portfolio.length).toBeGreaterThan(0);
  });

  it('each experience has company as Entity with name property', async () => {
    const { result } = renderHook(() => useResume());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    for (const exp of result.current.experience) {
      expect(exp.company).toBeDefined();
      expect(typeof exp.company.name).toBe('string');
    }
  });

  it('dates are converted to Date objects', async () => {
    const { result } = renderHook(() => useResume());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const exp = result.current.experience[0];
    expect(exp.startDate).toBeInstanceOf(Date);

    const edu = result.current.education[0];
    expect(edu.startDate).toBeInstanceOf(Date);

    const cert = result.current.certifications[0];
    expect(cert.startDate).toBeInstanceOf(Date);

    const project = result.current.portfolio[0];
    expect(project.startDate).toBeInstanceOf(Date);
  });
});
