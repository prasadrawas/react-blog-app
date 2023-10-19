import React from "react";
import Like from "./Like";
import postService from "../../appwrite/post-service";
import { useNavigate } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import routes from "../../config/routes";
import { removeHtmlTags } from "../../utils/utils";

function BlogCard({
  blog,
  onClick,
  showLikeButton = false,
  showEditButton = false,
}) {
  const navigate = useNavigate();

  const description = blog.content.substring(
    0,
    blog.content.length <= 100 ? blog.content.length - 1 : 100
  );

  const onEditPost = (e) => {
    e.stopPropagation();
    navigate(routes.editBlog + `/${blog.$id}`);
  };

  return (
    <div
      className="w-full rounded-xl shadow-md cursor-pointer"
      onClick={onClick}
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-easing="ease-in-out"
     
    >
      <div className="relative w-full h-60">
        <img
          src={postService.getFilePreview({ fileId: blog.featuredImage })}
          alt=""
          className="w-full h-60 rounded-xl absolute z-0"
        />
      </div>

      <div className="py-2 px-2">
        <div className="flex items-start justify-between">
          <h2 className="my-3 font-semibold">{blog.title}</h2>
          {showLikeButton && <Like />}
          {showEditButton && (
            <TbEdit
              className="mx-3 text-xl text-slate-800"
              onClick={onEditPost}
            />
          )}
        </div>
        <p className="my-3 font-light text-xs text-slate-700">
          {removeHtmlTags(description)}
        </p>
      </div>
    </div>
  );
}

export default BlogCard;
