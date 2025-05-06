interface Post {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: Date;
  preview: string;
  draft: boolean;
  tags: string[];
  categories: string[];
  content: string;
}

export default Post;
export type { Post };
