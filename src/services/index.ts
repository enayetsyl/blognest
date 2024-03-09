import { request, gql } from "graphql-request";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string

interface Author {
  bio: string;
  id: string;
  name: string;
  photo: { url: string };
}

interface Category {
  name: string;
  slug: string;
}

interface FeaturedImage {
  url: string;
}

interface PostEdge {
  cursor: string;
  node: {
    author: Author;
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: FeaturedImage;
    categories: Category[];
  };
}

interface PostsConnection {
  edges: PostEdge[];
}


interface Post {
  author: Author;
  createdAt: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: FeaturedImage;
  categories: Category[];
  content: { raw: string }; // Assuming content field exists
}

interface RecentPost {
  title: string;
  featuredImage: FeaturedImage;
  createdAt: string;
  slug: string;
}

interface SimilarPosts {
  title: string;
  featuredImage: FeaturedImage;
  createdAt: string;
  slug: string
}

interface CategoryPost {
  author: Author;
  createdAt: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: FeaturedImage;
  categories: Category[];
}

interface Comment {
  name: string;
  createdAt: string;
  comment: string;
}


const getPosts = async () : Promise<PostEdge[]> => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result  = await request(graphqlAPI, query);
  // return result;
  return result.postsConnection.edges;
};

export default getPosts;

export const getPostDetails = async (slug : string) : Promise<Post | null> => {
  console.log('slug at index', slug)
  const query = gql`
    query GetPostDetails($slug: String) {
      post(where: { slug: $slug }) {
        author {
          bio
          id
          name
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content{
          raw
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, {slug});
  // return result;
  return result.post || null;
};



export const getRecentPosts = async () : Promise<RecentPost[]> => {
  const query = gql`
  query GetPostDetails(){
    posts(
      orderBy: createdAt_ASC
      last:3
      ){
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
  }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts;
};



export const getSimilarPosts = async  (categories: string[], slug: string): Promise<SimilarPosts[]> => {
  const query = `
  query GetPostDetails($slug: String!, $categories: [String!]){
    posts(
      where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
      last: 3
    ){ 
      title
        featuredImage{
          url
        }
        createdAt
        slug
    }
  }
  `;
  const result = await request(graphqlAPI, query, {categories, slug});
  return result.posts;
};

export const getCategories = async () : Promise<Category[]> => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.categories;
};


export const getCategoryPost = async ( slug : string ) : Promise<CategoryPost> => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

interface CommentObj {
  name: string;
  email: string;
  comment: string;
  slug: string;
}

Type 'string' is not assignable to type 'number'.ts(2322)
index.d.ts(3523, 9): The expected type comes from property 'rows' which is declared here on type 'DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>'
(property) TextareaHTMLAttributes<HTMLTextAreaElement>.rows?: number | undefined




export const getComments = async (slug: string) : Promise<Comment[]> => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: {post: {slug: $slug}}) {
        name
        createdAt
        comment
      }
    }
  `;
  const result = await request(graphqlAPI, query, {slug});
  return result.comments;
};

interface FeaturedPost {
  author: Author;
  featuredImage: FeaturedImage;
  title: string;
  slug: string;
  createdAt: string;
}

export const getFeaturedPosts = async (): Promise<FeaturedPost[]> => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};
