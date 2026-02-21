import ResumeText from './strings';

describe('ResumeText', () => {
  it('has a title', () => {
    expect(ResumeText.title).toBe('Resume');
  });

  it('has experience title', () => {
    expect(ResumeText.experience.title).toBe('Experience');
  });

  it('has education title', () => {
    expect(ResumeText.education.title).toBe('Education');
  });

  it('has skills title', () => {
    expect(ResumeText.skills.title).toBe('Skills');
  });

  it('has certifications title', () => {
    expect(ResumeText.certifications.title).toBe('Certifications');
  });

  it('has portfolio title and open text', () => {
    expect(ResumeText.portfolio.title).toBe('Portfolio');
    expect(ResumeText.portfolio.open).toBe('Open project');
  });
});
