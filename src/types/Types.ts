


export interface Post {
  node: {
    
  author: {
    bio: string;
    id: string;
    name: string;
    photo: {
      url: string;
    };
  };
  categories: Category[];
  createdAt: string; // ISO 8601 date-time format
  excerpt: string;
  featuredImage: {
    url: string;
  };
  slug: string;
  title: string;
  }
}

interface Category {
  name: string;
  slug: string;
}

export interface PostCardProps {
  node: Post;
}


export type PostData = {
  author: {
    bio: string;
    id: string;
    name: string;
    photo: {
      url: string;
    };
  };
  createdAt: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: {
    url: string;
  };
  categories: {
    name: string;
    slug: string;
  }[];
  content: {
    raw: string;
  };
};


export interface Comment {
  name: string;
  comment: string;
  createdAt: string;
}