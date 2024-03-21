'use client'
import Form from '@components/Form'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreatePrompt = () => {
      const router = useRouter();
    const { data: session } = useSession();
 const [Issubmitting, setIsSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag:''
    })
    

    const CreatePrompt = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const response = await fetch("/api/prompt/new", {
          method: "POST",
          body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user.id,
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
          type="Create"
          post={post}
          setPost={setPost}
          submitting={Issubmitting}
          handleSubmit={CreatePrompt}
      />
  )
}

export default CreatePrompt
