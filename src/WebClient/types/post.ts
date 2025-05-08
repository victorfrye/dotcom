export default interface Post {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: Date;
  modified: Date;
  duration: string;
  preview: string;
  draft: boolean;
  tags: string[];
  categories: string[];
  html: string;
}
