import React from 'react';
import styled from 'styled-components';
import * as LucideIcons from 'lucide-react';

interface DesktopIconProps {
  id: string;
  title: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
}

interface IconContainerProps {
  $isSelected: boolean;
}

const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 90px;
  cursor: pointer;
  background-color: ${(props) => (props.$isSelected ? 'rgba(0, 0, 255, 0.3)' : 'transparent')};
  border: ${(props) => (props.$isSelected ? '1px dotted white' : 'none')};
  padding: 5px;
  border-radius: 2px;
  transition: background-color 0.1s;

  &:hover {
    background-color: ${(props) => (props.$isSelected ? 'rgba(0, 0, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)')};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 5px;
  color: white;
`;

const IconTitle = styled.div`
  color: white;
  font-size: 12px;
  text-align: center;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-width: 100%;
`;

const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  title,
  icon,
  isSelected,
  onClick,
  onDoubleClick,
}) => {
  // Dynamically get the icon component from lucide-react
  const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] || LucideIcons.File;

  return (
    <IconContainer
      $isSelected={isSelected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className="desktop-icon"
    >
      <IconWrapper>
        <IconComponent size={32} />
      </IconWrapper>
      <IconTitle>{title}</IconTitle>
    </IconContainer>
  );
};

export default DesktopIcon;