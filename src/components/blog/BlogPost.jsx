import React from "react";
import postService from "../../appwrite/post-service";
import parse from "html-react-parser";

function BlogPost({ post }) {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <h1
        className="font-semibold text-3xl"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-easing="ease-in-out"
      >
        {post.title}
      </h1>

      <img
        src={postService.getFilePreview({ fileId: post.featuredImage })}
        alt=""
        className="w-full my-8 rounded-md"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-easing="ease-in-out"
      />

      <div
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-easing="ease-in-out"
      >
        {parse(post.content)}
      </div>
    </div>
  );
}

export default BlogPost;
