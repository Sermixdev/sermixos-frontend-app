import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import PostList from './PostList';
import CreatePost from './CreatePost';
import { FileText, PenSquare } from 'lucide-react';

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f0f0f0;
`;

const BlogHeader = styled.div`
  padding: 20px;
  border-bottom: 2px solid #000080;
  background: linear-gradient(to right, #000080, #1084d0);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const BlogTitle = styled.h1`
  font-size: 28px;
  margin: 0;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const BlogDescription = styled.p`
  margin: 8px 0 0 0;
  color: #e0e0e0;
  font-size: 16px;
`;

const BlogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
  flex: 1;
  overflow: auto;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
`;

const Tab = styled.button<{ $isActive: boolean }>`
  padding: 0.6rem 1.2rem;
  background: ${props => props.$isActive ? '#000080' : '#c0c0c0'};
  color: ${props => props.$isActive ? 'white' : '#000080'};
  border: 2px solid ${props => props.$isActive ? '#000080' : '#808080'};
  border-radius: 0;
  cursor: pointer;
  font-size: 1rem;
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: ${props => props.$isActive ? 'inset 0 0 0 1px #ffffff' : 'inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080'};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.$isActive ? '#000080' : '#d0d0d0'};
  }
  
  &:active {
    box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff;
  }
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
            <FileText size={16} />
            Ver Posts
          </Tab>
          <Tab
            $isActive={activeTab === 'create'}
            onClick={() => setActiveTab('create')}
          >
            <PenSquare size={16} />
            Crear Post
          </Tab>
        </TabsContainer>

        {activeTab === 'list' ? <PostList /> : <CreatePost />}
      </BlogContent>
    </BlogContainer>
  );
};

export default Blog;