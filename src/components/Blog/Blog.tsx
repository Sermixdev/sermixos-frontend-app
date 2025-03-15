import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import PostList from './PostList';
import CreatePost from './CreatePost';

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
  gap: 2rem;
  padding: 1rem;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 1rem;
`

const Tab = styled.button<{ $isActive: boolean }>`
  padding: 0.5rem 1rem;
  background: ${props => props.$isActive ? '#000080' : 'transparent'};
  color: ${props => props.$isActive ? 'white' : '#000080'};
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

const Blog: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');

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
        <TabsContainer>
          <Tab
            $isActive={activeTab === 'list'}
            onClick={() => setActiveTab('list')}
          >
            Ver Posts
          </Tab>
          <Tab
            $isActive={activeTab === 'create'}
            onClick={() => setActiveTab('create')}
          >
            Crear Post
          </Tab>
        </TabsContainer>

        {activeTab === 'list' ? <PostList /> : <CreatePost />}
      </BlogContent>
    </BlogContainer>
  );
};

export default Blog;