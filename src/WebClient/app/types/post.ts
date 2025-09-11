export default interface Post {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: Date;
  lastModified: Date;
  readingDuration: string;
  image: string;
  draft: boolean;
  tags: string[];
  categories: string[];
  content: string;
}
