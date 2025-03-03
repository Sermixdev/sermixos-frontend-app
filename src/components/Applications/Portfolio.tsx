import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { fetchProjects, fetchProjectById, clearCurrentProject } from '../../store/slices/projectsSlice';
import { Helmet } from 'react-helmet-async';
import * as LucideIcons from 'lucide-react';

const PortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const PortfolioHeader = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 15px;
`;

const PortfolioTitle = styled.h1`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #000080;
`;

const PortfolioDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  overflow-y: auto;
  padding-right: 10px;
`;

const ProjectCard = styled.div`
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const ProjectImage = styled.div<{ $imageUrl: string }>`
  height: 150px;
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-position: center;
`;

const ProjectInfo = styled.div`
  padding: 15px;
`;

const ProjectTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 10px 0;
  color: #000080;
`;

const ProjectDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 10px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
`;

const TechTag = styled.span`
  font-size: 11px;
  background-color: #e0e0e0;
  padding: 2px 6px;
  border-radius: 10px;
  color: #666;
`;

const ProjectDetail = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

const ProjectDetailHeader = styled.div`
  margin-bottom: 20px;
`;

const ProjectDetailTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #000080;
`;

const ProjectDetailImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
`;

const ProjectDetailDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  background-color: #000080;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0000b0;
  }
`;

const ProjectDate = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #c0c0c0;
  border: none;
  box-shadow: inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff;
  cursor: pointer;
  margin-bottom: 15px;
  font-size: 12px;

  &:active {
    box-shadow: inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
`;

const Portfolio: React.FC = () => {
  const dispatch = useDispatch();
  const { projects, currentProject, loading } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
    return () => {
      dispatch(clearCurrentProject());
    };
  }, [dispatch]);

  const handleProjectClick = (id: string) => {
    dispatch(fetchProjectById(id));
  };

  const handleBackClick = () => {
    dispatch(clearCurrentProject());
  };

  if (loading && projects.length === 0) {
    return (
      <LoadingIndicator>
        <LucideIcons.Loader size={24} className="animate-spin" />
        <span style={{ marginLeft: '10px' }}>Loading...</span>
      </LoadingIndicator>
    );
  }

  return (
    <PortfolioContainer>
      <Helmet>
        <title>Portafolio - RetroOS</title>
        <meta name="description" content="Muestra de proyectos destacados" />
      </Helmet>
      
      <PortfolioHeader>
        <PortfolioTitle>Portafolio</PortfolioTitle>
        <PortfolioDescription>Muestra de proyectos destacados</PortfolioDescription>
      </PortfolioHeader>

      {currentProject ? (
        <ProjectDetail>
          <BackButton onClick={handleBackClick}>
            <LucideIcons.ArrowLeft size={12} style={{ marginRight: '5px' }} />
            Volver a proyectos
          </BackButton>
          <ProjectDetailHeader>
            <ProjectDetailTitle>{currentProject.title}</ProjectDetailTitle>
            <ProjectDate>
              Completed: {new Date(currentProject.date).toLocaleDateString()}
            </ProjectDate>
          </ProjectDetailHeader>
          {currentProject.imageUrl && (
            <ProjectDetailImage src={currentProject.imageUrl} alt={currentProject.title} />
          )}
          <ProjectDetailDescription>{currentProject.description}</ProjectDetailDescription>
          <ProjectLinks>
            {currentProject.demoUrl && (
              <ProjectLink href={currentProject.demoUrl} target="_blank" rel="noopener noreferrer">
                <LucideIcons.ExternalLink size={16} style={{ marginRight: '5px' }} />
                Demo en Vivo
              </ProjectLink>
            )}
            {currentProject.repoUrl && (
              <ProjectLink href={currentProject.repoUrl} target="_blank" rel="noopener noreferrer">
                <LucideIcons.Github size={16} style={{ marginRight: '5px' }} />
                Código Fuente
              </ProjectLink>
            )}
          </ProjectLinks>
          <ProjectTech>
            <h3>Tecnologías Utilizadas:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
              {currentProject.technologies.map((tech, index) => (
                <TechTag key={index}>{tech}</TechTag>
              ))}
            </div>
          </ProjectTech>
        </ProjectDetail>
      ) : (
        <ProjectsGrid>
          {projects.map((project) => (
            <ProjectCard key={project.id} onClick={() => handleProjectClick(project.id)}>
              <ProjectImage $imageUrl={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'} />
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectTech>
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                  {project.technologies.length > 3 && (
                    <TechTag>+{project.technologies.length - 3} more</TechTag>
                  )}
                </ProjectTech>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      )}
    </PortfolioContainer>
  );
};

export default Portfolio;