import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { emptyRecycleBin, restoreFile, deleteFile } from '../../store/slices/recycleBinSlice';
import { Trash2, Image, Presentation as FilePresentation, FileArchive, File, RefreshCw } from 'lucide-react';

const RecycleBinContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

const RecycleBinHeader = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RecycleBinTitle = styled.h1`
  font-size: 24px;
  margin: 0;
  color: #000080;
`;

const RecycleBinDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0 0 0;
`;

const RecycleBinActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #c0c0c0;
  border: none;
  box-shadow: inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff;
  cursor: pointer;
  font-size: 12px;

  &:active {
    box-shadow: inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  color: #666;
`;

const EmptyIcon = styled.div`
  color: #000080;
  margin-bottom: 20px;
`;

const EmptyText = styled.p`
  font-size: 16px;
  text-align: center;
  margin: 0;
`;

const FilesList = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #dfdfdf;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const FileIcon = styled.div`
  margin-right: 15px;
  color: #000080;
`;

const FileInfo = styled.div`
  flex: 1;
`;

const FileName = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const FileDetails = styled.div`
  font-size: 12px;
  color: #666;
`;

const FileActions = styled.div`
  display: flex;
  gap: 10px;
`;

const FileActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #000080;
  }
`;

const RecycleBin: React.FC = () => {
  const dispatch = useDispatch();
  const { files } = useSelector((state: RootState) => state.recycleBin);

  const handleEmptyBin = () => {
    dispatch(emptyRecycleBin());
  };

  const handleRestoreFile = (id: string) => {
    dispatch(restoreFile(id));
  };

  const handleDeleteFile = (id: string) => {
    dispatch(deleteFile(id));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <Image size={24} />;
    } else if (type.includes('presentation')) {
      return <FilePresentation size={24} />;
    } else if (type.includes('zip')) {
      return <FileArchive size={24} />;
    } else {
      return <File size={24} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <RecycleBinContainer>
      <RecycleBinHeader>
        <div>
          <RecycleBinTitle>Papelera de Reciclaje</RecycleBinTitle>
          <RecycleBinDescription>
            {files.length} {files.length === 1 ? 'elemento' : 'elementos'}
          </RecycleBinDescription>
        </div>
        <RecycleBinActions>
          {files.length > 0 && (
            <ActionButton onClick={handleEmptyBin}>
              <Trash2 size={12} style={{ marginRight: '5px' }} />
              Vaciar Papelera
            </ActionButton>
          )}
        </RecycleBinActions>
      </RecycleBinHeader>

      {files.length === 0 ? (
        <EmptyState>
          <EmptyIcon>
            <Trash2 size={64} />
          </EmptyIcon>
          <EmptyText>La Papelera está vacía</EmptyText>
        </EmptyState>
      ) : (
        <FilesList>
          {files.map((file) => (
            <FileItem key={file.id}>
              <FileIcon>{getFileIcon(file.type)}</FileIcon>
              <FileInfo>
                <FileName>{file.name}</FileName>
                <FileDetails>
                  {file.size} • Eliminado el {formatDate(file.deletedDate)}
                </FileDetails>
                <FileDetails>Ubicación original: {file.originalLocation}</FileDetails>
              </FileInfo>
              <FileActions>
                <FileActionButton onClick={() => handleRestoreFile(file.id)} title="Restaurar">
                  <RefreshCw size={16} />
                </FileActionButton>
                <FileActionButton onClick={() => handleDeleteFile(file.id)} title="Eliminar permanentemente">
                  <Trash2 size={16} />
                </FileActionButton>
              </FileActions>
            </FileItem>
          ))}
        </FilesList>
      )}
    </RecycleBinContainer>
  );
};

export default RecycleBin;