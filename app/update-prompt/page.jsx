"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Change to useRouter from next/router
import { useSearchParams } from "react-router-dom"; // Change to useSearchParams from react-router-dom

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const [promptId, setPromptId] = useState(null); // State to hold promptId
  const searchParams = useSearchParams();
  const promptIdParam = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Update promptId state when promptIdParam changes
    if (promptIdParam) {
      setPromptId(promptIdParam);
    }
  }, [promptIdParam]);

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return; // Exit if promptId is null

      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getPromptDetails();
  }, [promptId]); // Run effect when promptId changes

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
