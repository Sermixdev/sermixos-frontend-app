import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { fetchProjects, fetchProjectById, clearCurrentProject } from '../../store/slices/projectsSlice';
import { Helmet } from 'react-helmet-async';
import { Loader, ArrowLeft, ExternalLink, Github, Calendar, Code } from 'lucide-react';
import { AppDispatch } from '../../store';

const PortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f0f0f0;
`;

const PortfolioHeader = styled.div`
  padding: 20px;
  border-bottom: 2px solid #000080;
  background: linear-gradient(to right, #000080, #1084d0);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const PortfolioTitle = styled.h1`
  font-size: 28px;
  margin: 0;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const PortfolioDescription = styled.p`
  margin: 8px 0 0 0;
  color: #e0e0e0;
  font-size: 16px;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  overflow-y: auto;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

const ProjectCard = styled.div`
  background: white;
  border: 2px solid #808080;
  border-radius: 0;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, 4px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 430px; /* Aumentado la altura para acomodar la descripción más grande */
  width: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, 6px 6px 12px rgba(0, 0, 0, 0.25);
  }
`;

const ProjectImage = styled.div<{ $imageUrl: string }>`
  height: 160px;
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-position: center;
  background-color: #f0f0f0;
  border-bottom: 1px solid #808080;
  flex-shrink: 0;
  width: 100%;
`;

const ProjectInfo = styled.div`
  padding: 1rem;
  background: linear-gradient(to bottom, #e0e0e0, #f0f0f0);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: calc(100% - 160px); /* Altura fija restando la altura de la imagen */
`;

const ProjectTitle = styled.h3`
  color: #000080;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 0.5px 0.5px 0 #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 1.5rem; /* Altura fija para el título */
  line-height: 1.5rem;
`;

const ProjectDescription = styled.p`
  color: #333;
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.9rem;
  background-color: white;
  padding: 0.75rem;
  border: 1px solid #c0c0c0;
  box-shadow: inset 1px 1px 0 #dfdfdf;
  flex-grow: 1;
  position: relative;
  min-height: 7.5rem; /* Altura mínima para 5 líneas de texto */
  max-height: 7.5rem; /* Altura máxima para 5 líneas de texto */
  box-sizing: border-box;
  
  &::after {
    content: '...';
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    padding-left: 0.5rem;
    background-color: white;
  }
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto; /* Empuja las etiquetas hacia abajo */
  padding-top: 0.75rem;
  flex-shrink: 0;
  height: 2.25rem; /* Altura fija para las etiquetas */
  overflow: hidden;
  width: 100%;
`;

const TechTag = styled.span`
  font-size: 0.75rem;
  background-color: #000080;
  padding: 2px 6px;
  border-radius: 0;
  color: white;
  border: 1px solid #000060;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.3);
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  height: 1.5rem; /* Altura fija para cada etiqueta */
  max-width: 100px; /* Ancho máximo para cada etiqueta */
  overflow: hidden;
`;

const ProjectDetail = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  padding: 1.5rem;
`;

const ProjectDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #000080;
`;

const ProjectDetailTitle = styled.h2`
  color: #000080;
  font-size: 1.75rem;
  line-height: 1.3;
  text-shadow: 1px 1px 0 #ffffff;
  margin: 0;
`;

const ProjectDetailImage = styled.img`
  max-width: 100%;
  height: auto;
  margin: 1.5rem 0;
  border: 2px solid #808080;
  box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080;
`;

const ProjectDetailDescription = styled.p`
  color: #333;
  line-height: 1.7;
  font-size: 1rem;
  white-space: pre-wrap;
  background-color: #f9f9f9;
  padding: 1.5rem;
  border: 1px solid #c0c0c0;
  box-shadow: inset 1px 1px 0 #dfdfdf;
  margin-bottom: 1.5rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  background: #c0c0c0;
  border: 2px solid #808080;
  color: #000080;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s;
  box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080;
  gap: 0.5rem;

  &:hover {
    background: #d0d0d0;
  }
  
  &:active {
    box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff;
  }
`;

const ProjectDate = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 5px;
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

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  gap: 1rem;
`;

const TechSection = styled.div`
  margin-top: 1.5rem;
`;

const TechTitle = styled.h3`
  color: #000080;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-shadow: 0.5px 0.5px 0 #ffffff;
`;

const TechContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Portfolio: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
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
        <Loader size={24} className="animate-spin" />
        <span>Loading...</span>
      </LoadingIndicator>
    );
  }

  return (
    <PortfolioContainer>
      <Helmet>
        <title>Portafolio - SermixOS</title>
        <meta name="description" content="Muestra de proyectos destacados" />
      </Helmet>
      
      <PortfolioHeader>
        <PortfolioTitle>Portafolio</PortfolioTitle>
        <PortfolioDescription>Muestra de proyectos destacados</PortfolioDescription>
      </PortfolioHeader>

      {!currentProject ? (
        <ProjectsGrid>
          {projects.map((project) => (
            <ProjectCard key={project.id} onClick={() => handleProjectClick(project.id)}>
              <ProjectImage $imageUrl={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'} />
              <ProjectInfo>
                <ProjectTitle title={project.title}>{project.title}</ProjectTitle>
                <ProjectDescription title={project.description}>{project.description}</ProjectDescription>
                <ProjectTech>
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <TechTag key={index} title={tech}>
                      <Code size={10} style={{ marginRight: '3px', flexShrink: 0 }} />
                      {tech.length > 8 ? `${tech.substring(0, 8)}...` : tech}
                    </TechTag>
                  ))}
                  {project.technologies.length > 3 && (
                    <TechTag title={`${project.technologies.length - 3} tecnologías más`}>
                      +{project.technologies.length - 3}
                    </TechTag>
                  )}
                </ProjectTech>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      ) : (
        <ProjectDetail>
          <BackButton onClick={handleBackClick}>
            <ArrowLeft size={16} />
            Volver a proyectos
          </BackButton>
          <ProjectDetailHeader>
            <ProjectDetailTitle>{currentProject.title}</ProjectDetailTitle>
            <ProjectDate>
              <Calendar size={14} />
              Completado: {new Date(currentProject.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </ProjectDate>
          </ProjectDetailHeader>
          {currentProject.imageUrl && (
            <ProjectDetailImage src={currentProject.imageUrl} alt={currentProject.title} />
          )}
          <ProjectDetailDescription>{currentProject.description}</ProjectDetailDescription>
          <ProjectLinks>
            {currentProject.demoUrl && (
              <ProjectLink href={currentProject.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} />
                Demo en Vivo
              </ProjectLink>
            )}
            {currentProject.repoUrl && (
              <ProjectLink href={currentProject.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github size={16} />
                Código Fuente
              </ProjectLink>
            )}
          </ProjectLinks>
          <TechSection>
            <TechTitle>Tecnologías Utilizadas:</TechTitle>
            <TechContainer>
              {currentProject.technologies.map((tech, index) => (
                <TechTag key={index}><Code size={12} style={{ marginRight: '4px' }} />{tech}</TechTag>
              ))}
            </TechContainer>
          </TechSection>
        </ProjectDetail>
      )}
    </PortfolioContainer>
  );
};

export default Portfolio;