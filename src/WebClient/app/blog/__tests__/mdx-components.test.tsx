import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../test-utils';
import {
  MdxA,
  MdxBlockquote,
  MdxCode,
  MdxEm,
  MdxH2,
  MdxH3,
  MdxImg,
  MdxLi,
  MdxOl,
  MdxP,
  MdxPre,
  MdxTable,
  MdxTd,
  MdxTh,
  MdxTr,
  MdxUl,
} from '../mdx-components';

describe('MdxH2', () => {
  it('renders with text content', () => {
    renderWithProviders(<MdxH2>Heading 2</MdxH2>);
    expect(screen.getByText('Heading 2')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(<MdxH2 className="custom">Heading 2</MdxH2>);
    expect(screen.getByText('Heading 2')).toHaveClass('custom');
  });
});

describe('MdxH3', () => {
  it('renders with text content', () => {
    renderWithProviders(<MdxH3>Heading 3</MdxH3>);
    expect(screen.getByText('Heading 3')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(<MdxH3 className="custom">Heading 3</MdxH3>);
    expect(screen.getByText('Heading 3')).toHaveClass('custom');
  });
});

describe('MdxP', () => {
  it('renders with text content', () => {
    renderWithProviders(<MdxP>Paragraph text</MdxP>);
    expect(screen.getByText('Paragraph text')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(<MdxP className="custom">Paragraph text</MdxP>);
    expect(screen.getByText('Paragraph text')).toHaveClass('custom');
  });
});

describe('MdxA', () => {
  it('renders with text content', () => {
    renderWithProviders(<MdxA href="https://example.com">Link text</MdxA>);
    expect(screen.getByText('Link text')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(
      <MdxA href="https://example.com" className="custom">
        Link text
      </MdxA>,
    );
    expect(screen.getByText('Link text')).toHaveClass('custom');
  });

  it('renders with href', () => {
    renderWithProviders(<MdxA href="https://example.com">Link text</MdxA>);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });
});

describe('MdxImg', () => {
  it('renders with text content', () => {
    renderWithProviders(<MdxImg src="test.png" alt="Test image" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(
      <MdxImg src="test.png" alt="Test image" className="custom" />,
    );
    expect(screen.getByRole('img')).toHaveClass('custom');
  });

  it('renders with src and alt', () => {
    renderWithProviders(<MdxImg src="test.png" alt="Test image" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test.png');
    expect(img).toHaveAttribute('alt', 'Test image');
  });
});

describe('MdxEm', () => {
  it('renders with text content', () => {
    renderWithProviders(<MdxEm>Emphasis text</MdxEm>);
    expect(screen.getByText('Emphasis text')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(<MdxEm className="custom">Emphasis text</MdxEm>);
    const el = screen.getByText('Emphasis text');
    expect(el.tagName.toLowerCase()).toBe('em');
  });
});

describe('MdxPre', () => {
  it('renders with text content', () => {
    renderWithProviders(<MdxPre>Preformatted text</MdxPre>);
    expect(screen.getByText('Preformatted text')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(<MdxPre className="custom">Preformatted text</MdxPre>);
    expect(screen.getByText('Preformatted text')).toHaveClass('custom');
  });
});

describe('MdxCode', () => {
  it('renders with text content', () => {
    renderWithProviders(<MdxCode>Code text</MdxCode>);
    expect(screen.getByText('Code text')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(<MdxCode className="custom">Code text</MdxCode>);
    expect(screen.getByText('Code text')).toHaveClass('custom');
  });
});

describe('MdxUl', () => {
  it('renders with text content', () => {
    renderWithProviders(
      <MdxUl>
        <li>Item</li>
      </MdxUl>,
    );
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(
      <MdxUl className="custom">
        <li>Item</li>
      </MdxUl>,
    );
    expect(screen.getByRole('list')).toHaveClass('custom');
  });
});

describe('MdxOl', () => {
  it('renders with text content', () => {
    renderWithProviders(
      <MdxOl>
        <li>Item</li>
      </MdxOl>,
    );
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(
      <MdxOl className="custom">
        <li>Item</li>
      </MdxOl>,
    );
    expect(screen.getByRole('list')).toHaveClass('custom');
  });
});

describe('MdxLi', () => {
  it('renders with text content', () => {
    renderWithProviders(
      <ul>
        <MdxLi>List item</MdxLi>
      </ul>,
    );
    expect(screen.getByText('List item')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(
      <ul>
        <MdxLi className="custom">List item</MdxLi>
      </ul>,
    );
    expect(screen.getByText('List item')).toHaveClass('custom');
  });
});

describe('MdxBlockquote', () => {
  it('renders with text content', () => {
    renderWithProviders(<MdxBlockquote>Quote text</MdxBlockquote>);
    expect(screen.getByText('Quote text')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(
      <MdxBlockquote className="custom">Quote text</MdxBlockquote>,
    );
    expect(screen.getByText('Quote text')).toHaveClass('custom');
  });
});

describe('MdxTable', () => {
  it('renders with text content', () => {
    renderWithProviders(
      <MdxTable>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </MdxTable>,
    );
    expect(screen.getByText('Cell')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(
      <MdxTable className="custom">
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </MdxTable>,
    );
    expect(screen.getByRole('table')).toHaveClass('custom');
  });
});

describe('MdxTr', () => {
  it('renders with text content', () => {
    renderWithProviders(
      <table>
        <tbody>
          <MdxTr>
            <td>Cell</td>
          </MdxTr>
        </tbody>
      </table>,
    );
    expect(screen.getByText('Cell')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(
      <table>
        <tbody>
          <MdxTr className="custom">
            <td>Cell</td>
          </MdxTr>
        </tbody>
      </table>,
    );
    expect(screen.getByRole('row')).toHaveClass('custom');
  });
});

describe('MdxTh', () => {
  it('renders with text content', () => {
    renderWithProviders(
      <table>
        <thead>
          <tr>
            <MdxTh>Header</MdxTh>
          </tr>
        </thead>
      </table>,
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(
      <table>
        <thead>
          <tr>
            <MdxTh className="custom">Header</MdxTh>
          </tr>
        </thead>
      </table>,
    );
    expect(screen.getByText('Header')).toHaveClass('custom');
  });
});

describe('MdxTd', () => {
  it('renders with text content', () => {
    renderWithProviders(
      <table>
        <tbody>
          <tr>
            <MdxTd>Cell data</MdxTd>
          </tr>
        </tbody>
      </table>,
    );
    expect(screen.getByText('Cell data')).toBeInTheDocument();
  });

  it('passes className prop through', () => {
    renderWithProviders(
      <table>
        <tbody>
          <tr>
            <MdxTd className="custom">Cell data</MdxTd>
          </tr>
        </tbody>
      </table>,
    );
    expect(screen.getByText('Cell data')).toHaveClass('custom');
  });
});
