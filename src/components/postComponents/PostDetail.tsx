import moment from "moment";
import Image from "next/image";
import React from "react";

type Post = {
  post: {
    author: {
      bio: string;
      id: string;
      name: string;
      photo: { url: string };
    };
    categories: { name: string; slug: string }[];
    content: {
      raw: {
        children: ContentBlock[];
      };
    };
    createdAt: string;
    excerpt: string;
    featuredImage: { url: string };
    slug: string;
    title: string;
  };
};

type ContentBlock = {
  type: string;
  children?: ContentBlock[];
  text?: string;
  bold?: boolean;
  underline?: boolean; 
  src?: string; 
  height?: number; 
  width?: number; 
};

const PostDetail = (post: Post) => {
  const getContentFragment: (
    index: number,
    text: string | React.ReactFragment[],
    obj?: ContentBlock,
    type?: string
  ) => React.ReactNode = (index, text, obj, type) =>{
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText?.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <Image
            key={index}
            alt={obj?.title}
            height={obj?.height}
            width={obj?.width}
            src={obj?.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6 ">
        <Image
          src={post.post.featuredImage.url}
          alt={post.post.title}
          className="object-top h-full w-full rounded-t-lg"
          width={200}
          height={200}
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="flex items-center  mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <Image
              alt={post.post.author?.name}
              height={60}
              width={60}
              className="align-middle rounded-full"
              src={post.post.author?.photo?.url}
            />
            <p className="inline align-middle text-gray-700 ml-2 text-lg">
              {post.post.author?.name}
            </p>
          </div>
          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{moment(post.post.createdAt).format("MMM DD, YYYY")}</span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.post.title}</h1>
        {post.post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))
          return getContentFragment(index, children, typeObj, typeObj.type)
        })}
      </div>
    </div>
  );
};

export default PostDetail;
