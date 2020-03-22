/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from 'theme-ui';
import { navigateTo } from 'gatsby';

const Outline = ({
  children,
  isHovering = false,
  onMouseEnter,
  onMouseLeave,
  path
}) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={() => navigateTo(path)}
    sx={{
      cursor: 'pointer',
      backgroundColor: 'transparent',
      borderColor: isHovering ? 'secondary' : 'muted',
      opacity: isHovering ? 0.8 : 1,
      borderRadius: 'card',
      borderStyle: 'solid',
      borderWidth: 'card',
      marginBottom: '2rem',
      padding: '1rem'
    }}
  >
    {children}
  </div>
);

const Title = ({ title }) => <h2 sx={{ m: 0 }}>{title}</h2>;

const DateLabel = ({ date }) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <span
      sx={{
        color: 'text',
        fontSize: [1]
      }}
    >
      {new Date(date).toLocaleString('en-US', options)}
    </span>
  );
};

const SpeakingPostCard = ({ post }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Outline
      isHovering={isHovering}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      path={post.slug}
    >
      <Title title={post.title}></Title>
      <DateLabel date={post.date}></DateLabel>
      <p>{post.description}</p>
    </Outline>
  );
};

export default SpeakingPostCard;
