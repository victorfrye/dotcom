import AboutText from '../text';

describe('AboutText', () => {
  it('has a hello card with title and text', () => {
    expect(AboutText.card.hello.title).toBe('Hello from Grand Rapids!');
    expect(AboutText.card.hello.text).toBeDefined();
    expect(AboutText.card.hello.action).toBe('Contact me');
  });

  it('has a career card with a function for text', () => {
    expect(AboutText.card.career.title).toBe('Developer by day');
    expect(typeof AboutText.card.career.text).toBe('function');
    expect(AboutText.card.career.action).toBe('View resume');
  });

  it('has a community card', () => {
    expect(AboutText.card.community.title).toBe('Champion for community');
    expect(AboutText.card.community.action).toBe('Read blog');
  });

  it('has a hobbies card without action', () => {
    expect(AboutText.card.hobbies.title).toBe('Gamer by night');
    expect(AboutText.card.hobbies.text).toBeDefined();
  });

  it('has a family card without action', () => {
    expect(AboutText.card.family.title).toBe('Supported by family');
    expect(AboutText.card.family.text).toBeDefined();
  });
});
