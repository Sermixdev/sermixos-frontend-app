import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchPosts } from '../../store/slices/postsSlice';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';

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

const BlogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
`;

const PostCard = styled.div`
  padding: 1rem;
  background: white;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
`;

const PostTitle = styled.h2`
  color: #000080;
  margin-bottom: 0.5rem;
`;

const PostDate = styled.div`
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const PostContent = styled.div`
  color: #333;
  line-height: 1.5;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  padding: 1rem;
  text-align: center;
  background: #ffe6e6;
  border: 1px solid #ffb3b3;
  border-radius: 4px;
`;

const Blog: React.FC = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <LoadingContainer>
        <Loader className="animate-spin" size={24} />
        <span style={{ marginLeft: '10px' }}>Cargando...</span>
      </LoadingContainer>
    );
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

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

      <BlogContent>
        {posts.map(post => (
          <PostCard key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <PostDate>{new Date(post.created_at).toLocaleDateString()}</PostDate>
            <PostContent>{post.content}</PostContent>
          </PostCard>
        ))}
      </BlogContent>
    </BlogContainer>
  );
};

export default Blog;