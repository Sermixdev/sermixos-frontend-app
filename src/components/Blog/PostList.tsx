import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState, AppDispatch } from '../../store';
import { fetchPosts, fetchPostById, clearError, clearCurrentPost } from '../../store/slices/postsSlice';
import { Loader, ArrowLeft, Calendar } from 'lucide-react';

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PostCard = styled.div`
  background: white;
  border: 2px solid #808080;
  border-radius: 0;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, 4px 4px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, 6px 6px 12px rgba(0, 0, 0, 0.25);
  }
`;

const PostThumbnail = styled.div<{ $imageUrl?: string }>`
  height: 180px;
  background-image: ${props => props.$imageUrl ? `url(${props.$imageUrl})` : 'url(/images/default-post.jpg)'};
  background-size: cover;
  background-position: center;
  background-color: #f0f0f0;
  border-bottom: 1px solid #808080;
`;

const PostInfo = styled.div`
  padding: 1.2rem;
  background: linear-gradient(to bottom, #e0e0e0, #f0f0f0);
`;

const PostTitle = styled.h2`
  color: #000080;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: bold;
  text-shadow: 0.5px 0.5px 0 #ffffff;
`;

const PostDate = styled.div`
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PostDescription = styled.div`
  color: #333;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.9rem;
  background-color: white;
  padding: 0.8rem;
  border: 1px solid #c0c0c0;
  box-shadow: inset 1px 1px 0 #dfdfdf;
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

// Detailed Post View Components
const DetailedPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: white;
  border: 2px solid #808080;
  border-radius: 0;
  padding: 1.5rem;
  box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, 4px 4px 10px rgba(0, 0, 0, 0.2);
`;

const DetailedPostHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #000080;
`;

const DetailedPostTitle = styled.h1`
  color: #000080;
  font-size: 1.75rem;
  line-height: 1.3;
  text-shadow: 1px 1px 0 #ffffff;
`;

const DetailedPostDate = styled.div`
  color: #666;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const DetailedPostImage = styled.div<{ $imageUrl?: string }>`
  height: 350px;
  background-image: ${props => props.$imageUrl ? `url(${props.$imageUrl})` : 'url(/images/default-post.jpg)'};
  background-size: cover;
  background-position: center;
  border: 1px solid #808080;
  box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080;
`;

const DetailedPostContent = styled.div`
  color: #333;
  line-height: 1.7;
  font-size: 1rem;
  white-space: pre-wrap;
  background-color: #f9f9f9;
  padding: 1.5rem;
  border: 1px solid #c0c0c0;
  box-shadow: inset 1px 1px 0 #dfdfdf;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #c0c0c0;
  border: 2px solid #808080;
  color: #000080;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080;
  
  &:hover {
    background: #d0d0d0;
  }
  
  &:active {
    box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff;
  }
`;

// Helper function to generate a description from content
const generateDescription = (content: string, maxLength: number = 150): string => {
  if (!content) return '';
  
  // Remove any HTML tags if present
  const plainText = content.replace(/<[^>]*>/g, '');
  
  if (plainText.length <= maxLength) return plainText;
  
  // Find the last space before maxLength
  const lastSpace = plainText.substring(0, maxLength).lastIndexOf(' ');
  return lastSpace > 0 
    ? plainText.substring(0, lastSpace) + '...' 
    : plainText.substring(0, maxLength) + '...';
};

const PostList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, currentPost, loading, error } = useSelector((state: RootState) => state.posts);
  const [showTimeout, setShowTimeout] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchPosts());
    return () => {
      dispatch(clearError());
      dispatch(clearCurrentPost());
    };
  }, [dispatch]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (loading && posts.length === 0) {
      timeoutId = setTimeout(() => {
        setShowTimeout(true);
      }, 10000);
    } else {
      setShowTimeout(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading, posts.length]);

  // Debug log for currentPost
  useEffect(() => {
    console.log('Current post state:', currentPost);
  }, [currentPost]);

  const handlePostClick = (postId: number) => {
    console.log('Post clicked:', postId);
    setSelectedPostId(postId);
    dispatch(fetchPostById(postId.toString()));
  };

  const handleBackClick = () => {
    setSelectedPostId(null);
    dispatch(clearCurrentPost());
  };

  if (loading && posts.length === 0) {
    return (
      <LoadingContainer>
        {showTimeout ? (
          <ErrorMessage>Error al cargar los posts. Por favor, intenta de nuevo más tarde.</ErrorMessage>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Loader className="animate-spin" size={24} />
            <span>Cargando...</span>
          </div>
        )}
      </LoadingContainer>
    );
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!posts || posts.length === 0) {
    return <ErrorMessage>No hay posts disponibles</ErrorMessage>;
  }

  // If a post is selected and loaded, show the detailed view
  if (selectedPostId && currentPost) {
    console.log('Rendering detailed view for post:', currentPost);
    return (
      <div>
        <BackButton onClick={handleBackClick}>
          <ArrowLeft size={16} />
          Volver a la lista
        </BackButton>
        
        <DetailedPostContainer>
          <DetailedPostHeader>
            <DetailedPostTitle>{currentPost.title}</DetailedPostTitle>
            <DetailedPostDate>
              <Calendar size={14} />
              {new Date(currentPost.created_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </DetailedPostDate>
          </DetailedPostHeader>
          
          <DetailedPostImage $imageUrl={currentPost.image_url} />
          
          <DetailedPostContent>{currentPost.content}</DetailedPostContent>
        </DetailedPostContainer>
      </div>
    );
  }

  // Otherwise, show the post list
  return (
    <PostListContainer>
      <PostGrid>
        {[...posts].sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ).map(post => (
          <PostCard key={post.id} onClick={() => handlePostClick(post.id)}>
            <PostThumbnail $imageUrl={post.image_url} />
            <PostInfo>
              <PostTitle>{post.title}</PostTitle>
              <PostDate>
                <Calendar size={14} />
                {new Date(post.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </PostDate>
              <PostDescription>
                {post.description || generateDescription(post.content)}
              </PostDescription>
            </PostInfo>
          </PostCard>
        ))}
      </PostGrid>
    </PostListContainer>
  );
};

export default PostList;