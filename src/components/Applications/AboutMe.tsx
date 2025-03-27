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
        <title>Sobre Mí - SermixOS</title>
        <meta name="description" content="Perfil profesional y experiencia" />
      </Helmet>
      
      <AboutHeader>
        <AboutTitle>Sobre Mí</AboutTitle>
        <AboutDescription>Perfil profesional y experiencia</AboutDescription>
      </AboutHeader>

      <ProfileSection>
        <ProfileImage src="/images/about-me-profile-photo.jpeg" alt="Profile" />
        <ProfileInfo>
          <ProfileName>Sergio Ferrer Bueno</ProfileName>
          <ProfileTitle>Desarrollador Web & Especialista en automatizaciones con IA</ProfileTitle>
          <ProfileBio>
            Apasionado por crear soluciones innovadoras en la intersección del desarrollo web y la inteligencia artificial. 
            Me especializo en frameworks modernos de JavaScript, 
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
            PostgreSQL
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
            Cloud
          </SkillItem>
          <SkillItem>
            <SkillIcon>
              <LucideIcons.GitBranch size={16} />
            </SkillIcon>
            Git & CI/CD
          </SkillItem>
          <SkillItem>
            <SkillIcon>
              <LucideIcons.Atom size={16} />
            </SkillIcon>
            AI Automation
          </SkillItem>
          <SkillItem>
            <SkillIcon>
              <LucideIcons.Text size={16} />
            </SkillIcon>
            Data collection
          </SkillItem>
        </SkillsGrid>
      </Section>

      <Section>
        <SectionTitle>Experiencia</SectionTitle>
        
        <ExperienceItem>
          <ExperienceTitle>Desarrollador Full-Stack</ExperienceTitle>
          <ExperienceCompany>WIP</ExperienceCompany>
          <ExperiencePeriod>WIP </ExperiencePeriod>
          <ExperienceDescription>
            WIP
          </ExperienceDescription>
        </ExperienceItem>
      </Section>

      <Section>
        <SectionTitle>Educación</SectionTitle>
        
        <EducationItem>
          <EducationDegree>WIP</EducationDegree>
          <EducationInstitution>WIP</EducationInstitution>
          <EducationPeriod>WIP</EducationPeriod>
        </EducationItem>
        
        <EducationItem>
          <EducationDegree>WIP</EducationDegree>
          <EducationInstitution>WIP</EducationInstitution>
          <EducationPeriod>WIP</EducationPeriod>
        </EducationItem>
      </Section>

      <Section>
        <SectionTitle>Certificaciones</SectionTitle>
        
        <ExperienceItem>
          <ExperienceTitle>WIP</ExperienceTitle>
          <ExperiencePeriod>WIP</ExperiencePeriod>
        </ExperienceItem>
        
        <ExperienceItem>
          <ExperienceTitle>WIP</ExperienceTitle>
          <ExperiencePeriod>WIP</ExperiencePeriod>
        </ExperienceItem>
        
        <ExperienceItem>
          <ExperienceTitle>WIP</ExperienceTitle>
          <ExperiencePeriod>WIP</ExperiencePeriod>
        </ExperienceItem>
      </Section>
    </AboutContainer>
  );
};

export default AboutMe;