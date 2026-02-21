import { useMDXComponents } from '../mdx-components';

describe('useMDXComponents', () => {
  it('returns all default component mappings', () => {
    const components = useMDXComponents({});

    expect(components.h2).toBeDefined();
    expect(components.h3).toBeDefined();
    expect(components.p).toBeDefined();
    expect(components.a).toBeDefined();
    expect(components.img).toBeDefined();
    expect(components.em).toBeDefined();
    expect(components.pre).toBeDefined();
    expect(components.code).toBeDefined();
    expect(components.ul).toBeDefined();
    expect(components.ol).toBeDefined();
    expect(components.li).toBeDefined();
    expect(components.blockquote).toBeDefined();
    expect(components.table).toBeDefined();
    expect(components.tr).toBeDefined();
    expect(components.th).toBeDefined();
    expect(components.td).toBeDefined();
  });

  it('merges custom components with defaults', () => {
    const Custom = () => <div>custom</div>;
    const components = useMDXComponents({ strong: Custom });

    expect(components.strong).toBe(Custom);
    expect(components.h2).toBeDefined();
    expect(components.p).toBeDefined();
  });

  it('custom components override defaults', () => {
    const CustomH2 = () => <h2>custom h2</h2>;
    const components = useMDXComponents({ h2: CustomH2 });

    expect(components.h2).toBe(CustomH2);
  });
});
