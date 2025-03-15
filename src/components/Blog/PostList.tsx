import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { fetchPosts, clearError } from '../../store/slices/postsSlice';
import { Loader } from 'lucide-react';
import { useState } from 'react';

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const PaginationButton = styled.button<{ $isActive?: boolean }>`
  padding: 0.5rem 1rem;
  background: ${props => props.$isActive ? '#000080' : '#c0c0c0'};
  color: ${props => props.$isActive ? 'white' : 'black'};
  border: none;
  cursor: pointer;
  box-shadow: inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active {
    box-shadow: inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff;
  }
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

const PostList: React.FC = () => {
  const dispatch = useDispatch();
  const { posts, loading, error, pagination } = useSelector((state: RootState) => state.posts);
  const [showTimeout, setShowTimeout] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts({ page: 1, limit: 10 }));
    return () => {
      dispatch(clearError());
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

  const handlePageChange = (page: number) => {
    dispatch(fetchPosts({ page, limit: pagination.itemsPerPage }));
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
  return (
    <PostListContainer>
      {posts.map(post => (
        <PostCard key={post.id}>
          <PostTitle>{post.title}</PostTitle>
          <PostDate>{new Date(post.created_at).toLocaleDateString()}</PostDate>
          <PostContent>{post.content}</PostContent>
        </PostCard>
      ))}

      <Pagination>
        <PaginationButton
          disabled={pagination.currentPage === 1}
          onClick={() => handlePageChange(pagination.currentPage - 1)}
        >
          Anterior
        </PaginationButton>
        
        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
          <PaginationButton
            key={page}
            $isActive={page === pagination.currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PaginationButton>
        ))}

        <PaginationButton
          disabled={pagination.currentPage === pagination.totalPages}
          onClick={() => handlePageChange(pagination.currentPage + 1)}
        >
          Siguiente
        </PaginationButton>
      </Pagination>
    </PostListContainer>
  );
};

export default PostList