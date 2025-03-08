import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { createPost } from '../../store/slices/postsSlice';
import { Loader } from 'lucide-react';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #c0c0c0;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #c0c0c0;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #000080;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  padding: 0.5rem;
  background: #ffe6e6;
  border: 1px solid #ffb3b3;
  border-radius: 4px;
`;

const CreatePost: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.posts);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      return;
    }

    await dispatch(createPost({ title, content }));
    
    // Limpiar el formulario si la creación fue exitosa
    if (!error) {
      setTitle('');
      setContent('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Input
        type="text"
        placeholder="Título del post"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      
      <TextArea
        placeholder="Contenido del post"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      
      <Button type="submit" disabled={loading}>
        {loading && <Loader className="animate-spin" size={16} />}
        {loading ? 'Cargando...' : 'Crear Post'}
      </Button>
    </Form>
  );
};

export default CreatePost