import React from 'react';
import useSpeakingPosts from '../hooks/use-speaking-posts';
import SpeakingPostCard from './speaking-post-card';

const SpeakingPostCards = () => {
  const speakingPosts = useSpeakingPosts();

  return (
    <>
      {speakingPosts.map((post) => (
        <SpeakingPostCard key={post.title} post={post}></SpeakingPostCard>
      ))}
    </>
  );
};

export default SpeakingPostCards;
