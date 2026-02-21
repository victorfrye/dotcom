export interface PostMetadata {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  date: string;
  lastModified?: string;
  image: string;
  draft?: boolean;
  tags: string[];
  categories?: string[];
}

export default interface Post
  extends Omit<PostMetadata, 'date' | 'lastModified'> {
  date: Date;
  lastModified?: Date;
  readingDuration: string;
}
