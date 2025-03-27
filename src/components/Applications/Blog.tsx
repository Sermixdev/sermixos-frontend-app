import React from 'react';
import { Helmet } from 'react-helmet-async';
import PostList from '../Blog/PostList';
import styled from 'styled-components';

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const BlogHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #dfdfdf;
`;

const BlogTitle = styled.h1`
  font-size: 24px;
  margin: 0;
  color: #000080;
`;

const BlogDescription = styled.p`
  margin: 5px 0 0 0;
  color: #666;
`;

const Blog: React.FC = () => {
  return (
    <BlogContainer>
      <Helmet>
        <title>Blog - RetroOS</title>
        <meta name="description" content="Artículos sobre IA, datos y automatización" />
      </Helmet>
      
      <BlogHeader>
        <BlogTitle>Blog</BlogTitle>
        <BlogDescription>Artículos sobre IA, datos y automatización</BlogDescription>
      </BlogHeader>

      <PostList />
    </BlogContainer>
  );
};

export default Blog;