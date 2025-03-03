import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import * as LucideIcons from 'lucide-react';

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

const AboutHeader = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 20px;
`;

const AboutTitle = styled.h1`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #000080;
`;

const AboutDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const ProfileSection = styled.div`
  display: flex;
  margin-bottom: 30px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #000080;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  font-size: 22px;
  margin: 0 0 10px 0;
  color: #000080;
`;

const ProfileTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 15px 0;
  color: #666;
`;

const ProfileBio = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 15px 0;
  color: #000080;
  border-bottom: 1px solid #dfdfdf;
  padding-bottom: 5px;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
`;

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 14px;
`;

const SkillIcon = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
  color: #000080;
`;

const ExperienceItem = styled.div`
  margin-bottom: 20px;
`;

const ExperienceTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 5px 0;
  color: #000080;
`;

const ExperienceCompany = styled.h4`
  font-size: 14px;
  margin: 0 0 5px 0;
  color: #666;
`;

const ExperiencePeriod = styled.p`
  font-size: 12px;
  margin: 0 0 10px 0;
  color: #666;
`;

const ExperienceDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
`;

const EducationItem = styled.div`
  margin-bottom: 20px;
`;

const EducationDegree = styled.h3`
  font-size: 16px;
  margin: 0 0 5px 0;
  color: #000080;
`;

const EducationInstitution = styled.h4`
  font-size: 14px;
  margin: 0 0 5px 0;
  color: #666;
`;

const EducationPeriod = styled.p`
  font-size: 12px;
  margin: 0 0 10px 0;
  color: #666;
`;

const AboutMe: React.FC = () => {
  return (
    <AboutContainer>
      <Helmet>
        <title>Sobre Mí - RetroOS</title>
        <meta name="description" content="Perfil profesional e información de antecedentes" />
      </Helmet>
      
      <AboutHeader>
        <AboutTitle>Sobre Mí</AboutTitle>
        <AboutDescription>Perfil profesional y antecedentes</AboutDescription>
      </AboutHeader>

      <ProfileSection>
        <ProfileImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" alt="Profile" />
        <ProfileInfo>
          <ProfileName>Juan Desarrollador</ProfileName>
          <ProfileTitle>Desarrollador Full-Stack Senior & Especialista en IA</ProfileTitle>
          <ProfileBio>
            Apasionado por crear soluciones innovadoras en la intersección del desarrollo web y la inteligencia artificial. 
            Con más de 8 años de experiencia construyendo aplicaciones escalables, me especializo en frameworks modernos de JavaScript, 
            visualización de datos e integración de capacidades de IA en aplicaciones web.
          </ProfileBio>
        </ProfileInfo>
      </ProfileSection>

      <Section>
        <SectionTitle>Habilidades</SectionTitle>
        <SkillsGrid>
          <SkillItem>
            <SkillIcon>
              <LucideIcons.Code size={16} />
            </SkillIcon>
            JavaScript/TypeScript
          </SkillItem>
          <SkillItem>
            <SkillIcon>
              <LucideIcons.Layers size={16} />
            </SkillIcon>
            React & Redux
          </SkillItem>
          <SkillItem>
            <SkillIcon>
              <LucideIcons.Server size={16} />
            </SkillIcon>
            Node.js
          </SkillItem>
          <SkillItem>
            <SkillIcon>
              <LucideIcons.Database size={16} />
            </SkillIcon>
            MongoDB
          </SkillItem>
          <SkillItem>
            <SkillIcon>
              <LucideIcons.BarChart size={16} />
            </SkillIcon>
            Data Visualization
          </SkillItem>
          <SkillItem>
            <SkillIcon>
              <LucideIcons.Cpu size={16} />
            </SkillIcon>
            Machine Learning
          </SkillItem>
          <SkillItem>
            <SkillIcon>
              <LucideIcons.Cloud size={16} />
            </SkillIcon>
            AWS
          </SkillItem>
          <SkillItem>
            <SkillIcon>
              <LucideIcons.GitBranch size={16} />
            </SkillIcon>
            Git & CI/CD
          </SkillItem>
        </SkillsGrid>
      </Section>

      <Section>
        <SectionTitle>Experiencia</SectionTitle>
        
        <ExperienceItem>
          <ExperienceTitle>Desarrollador Full-Stack Senior</ExperienceTitle>
          <ExperienceCompany>TechInnovate Solutions</ExperienceCompany>
          <ExperiencePeriod>Enero 2022 - Presente</ExperiencePeriod>
          <ExperienceDescription>
            Desarrollador líder de aplicaciones web empresariales con enfoque en integración de IA.
            Arquitecto e implementé soluciones escalables usando React, Node.js y MongoDB.
            Mentoría a desarrolladores junior y establecí mejores prácticas para el equipo de desarrollo.
          </ExperienceDescription>
        </ExperienceItem>
        
        <ExperienceItem>
          <ExperienceTitle>Desarrollador Full-Stack</ExperienceTitle>
          <ExperienceCompany>DataViz Corp</ExperienceCompany>
          <ExperiencePeriod>Marzo 2019 - Diciembre 2021</ExperiencePeriod>
          <ExperienceDescription>
            Desarrollé paneles de visualización de datos interactivos usando D3.js y React.
            Implementé APIs RESTful y procesamiento de datos en tiempo real con Node.js y WebSockets.
            Optimicé consultas de base de datos e implementé estrategias de caché para mejorar el rendimiento.
          </ExperienceDescription>
        </ExperienceItem>
        
        <ExperienceItem>
          <ExperienceTitle>Desarrollador Front-End</ExperienceTitle>
          <ExperienceCompany>WebCraft Studios</ExperienceCompany>
          <ExperiencePeriod>Junio 2017 - Febrero 2019</ExperiencePeriod>
          <ExperienceDescription>
            Construí aplicaciones web responsivas usando frameworks modernos de JavaScript.
            Colaboré con diseñadores para implementar componentes UI pixel-perfect.
            Mejoré el rendimiento del sitio a través de optimización de código y herramientas de construcción modernas.
          </ExperienceDescription>
        </ExperienceItem>
      </Section>

      <Section>
        <SectionTitle>Educación</SectionTitle>
        
        <EducationItem>
          <EducationDegree>Maestría en Ciencias de la Computación</EducationDegree>
          <EducationInstitution>Universidad Tecnológica</EducationInstitution>
          <EducationPeriod>2015 - 2017</EducationPeriod>
        </EducationItem>
        
        <EducationItem>
          <EducationDegree>Ingeniería en Software</EducationDegree>
          <EducationInstitution>Universidad Estatal</EducationInstitution>
          <EducationPeriod>2011 - 2015</EducationPeriod>
        </EducationItem>
      </Section>

      <Section>
        <SectionTitle>Certificaciones</SectionTitle>
        
        <ExperienceItem>
          <ExperienceTitle>Arquitecto de Soluciones Certificado AWS</ExperienceTitle>
          <ExperiencePeriod>2023</ExperiencePeriod>
        </ExperienceItem>
        
        <ExperienceItem>
          <ExperienceTitle>Certificado de Desarrollador TensorFlow</ExperienceTitle>
          <ExperiencePeriod>2022</ExperiencePeriod>
        </ExperienceItem>
        
        <ExperienceItem>
          <ExperienceTitle>Desarrollador Certificado MongoDB</ExperienceTitle>
          <ExperiencePeriod>2020</ExperiencePeriod>
        </ExperienceItem>
      </Section>
    </AboutContainer>
  );
};

export default AboutMe;