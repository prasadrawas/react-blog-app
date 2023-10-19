import React, { useRef, useState, useEffect } from "react";
import {
  BlogEditor,
  FormInput,
  ImageInput,
  Loading,
  SecondaryButton,
} from "../index";
import { useForm } from "react-hook-form";

import { useSelector } from "react-redux";
import postService from "../../appwrite/post-service";
import { useNavigate } from "react-router-dom";
import routes from "../../config/routes";

function CreateBlog({ id }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const editorRef = useRef(null);
  const user = useSelector((state) => state.user);
  const [postLoading, setPostLoading] = useState(id ? true : false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  let image;

  const submitBlog = (data) => {
    setLoading(true);
    if (post) {
      updateBlog(data);
    } else {
      createBlog(data);
    }
  };

  const updateBlog = async (data) => {
    let imageResponse;
    if (image) {
      imageResponse = await postService.uploadFile(image);
    }

    postService
      .updatePost(post.$id, {
        title: data.title,
        featuredImage: imageResponse ? imageResponse.$id: post.featuredImage,
        content: editorRef.current.getContent(),
        status: "active",
      })
      .then((res) => {
        if (res) {
          console.log("Post updated successfully");
          navigate(routes.home);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createBlog = (data) => {
    postService
      .uploadFile(image)
      .then((response) => {
        console.log("featuredImage: " + JSON.stringify(response));
        if (response) {
          postService
            .createPost({
              title: data.title,
              featuredImage: response["$id"],
              content: editorRef.current.getContent(),
              userId: user["$id"],
              status: "active",
            })
            .then((response) => {
              if (response) {
                console.log("Post created successfully");
                navigate(routes.home);
              }
            })
            .catch((error) => {})
            .finally(() => {
              setLoading(false);
            });
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      postService
        .getPost(id)
        .then((data) => {
          if (data) {
            setPost(data);
          } else {
            setError("Post not found");
          }
        })
        .catch((e) => {
          setError(e);
        })
        .finally(() => {
          setPostLoading(false);
        });
    }
  }, []);

  if (postLoading) {
    return (
      <div className="mt-32 w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!postLoading && error) {
    return (
      <div className="mt-32 w-full flex items-center justify-center">
        <p className="text-slate-800 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <section
      className="w-full flex justify-center"
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-easing="ease-in-out"
    >
      <form
        onSubmit={handleSubmit(submitBlog)}
        className="flex flex-col items-center justify-center w-[90%] lg:w-[60%] my-10"
      >
        <h1 className="font-semibold text-2xl mb-10">Create a Blog</h1>

        <FormInput
          label={"Title"}
          placeholder={"Your blog title . . . "}
          type="text"
          name={"title"}
          defaultValue={post && post.title}
          register={register}
          // pattern={firstNameRegex}
          error={errors.title?.message}
          className={"w-full"}
        />

        <ImageInput
          label={"Featured image"}
          control={control}
          defaultImage={
            post && postService.getFilePreview({ fileId: post.featuredImage })
          }
          error={errors.image?.message}
          onImageChange={(file) => (image = file)}
          className={"mt-6"}
        />

        <BlogEditor
          editorRef={editorRef}
          label={"Blog content"}
          initialValue={post && post.content}
        />

        <div className="my-10 pt-10 w-[70%]">
          <SecondaryButton
            title={"Create & Publish Blog"}
            type="submit"
            loading={loading}
            className={"w-full p-4"}
          />
        </div>
      </form>
    </section>
  );
}

export default CreateBlog;
