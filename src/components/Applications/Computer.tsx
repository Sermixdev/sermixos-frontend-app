import React from 'react';
import styled from 'styled-components';
import { HardDrive, Disc, Cloud, Cpu, MemoryStick as Memory, Monitor, Globe, Info, Clock } from 'lucide-react';

const ComputerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

const ComputerHeader = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 20px;
`;

const ComputerTitle = styled.h1`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #000080;
`;

const ComputerDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const DrivesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const DriveItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #dfdfdf;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const DriveIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 10px;
  color: #000080;
`;

const DriveName = styled.h3`
  font-size: 16px;
  margin: 0 0 5px 0;
  color: #000080;
`;

const DriveInfo = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
  text-align: center;
`;

const SystemInfoSection = styled.div`
  margin-top: 30px;
`;

const SystemInfoTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 15px 0;
  color: #000080;
  border-bottom: 1px solid #dfdfdf;
  padding-bottom: 5px;
`;

const SystemInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
`;

const SystemInfoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #dfdfdf;
`;

const SystemInfoIcon = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
  color: #000080;
`;

const SystemInfoContent = styled.div`
  flex: 1;
`;

const SystemInfoLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #000080;
`;

const SystemInfoValue = styled.div`
  font-size: 14px;
  color: #666;
`;

const Computer: React.FC = () => {
  return (
    <ComputerContainer>
      <ComputerHeader>
        <ComputerTitle>Mi PC</ComputerTitle>
        <ComputerDescription>Información del sistema y almacenamiento</ComputerDescription>
      </ComputerHeader>

      <DrivesList>
        <DriveItem>
          <DriveIcon>
            <HardDrive size={48} />
          </DriveIcon>
          <DriveName>Disco Local (C:)</DriveName>
          <DriveInfo>Unidad del Sistema</DriveInfo>
          <DriveInfo>120 GB libres de 500 GB</DriveInfo>
        </DriveItem>
        <DriveItem>
          <DriveIcon>
            <HardDrive size={48} />
          </DriveIcon>
          <DriveName>Datos (D:)</DriveName>
          <DriveInfo>Unidad de Almacenamiento</DriveInfo>
          <DriveInfo>850 GB libres de 1 TB</DriveInfo>
        </DriveItem>
        <DriveItem>
          <DriveIcon>
            <Disc size={48} />
          </DriveIcon>
          <DriveName>Unidad DVD (E:)</DriveName>
          <DriveInfo>Unidad Óptica</DriveInfo>
          <DriveInfo>Sin disco</DriveInfo>
        </DriveItem>
        <DriveItem>
          <DriveIcon>
            <Cloud size={48} />
          </DriveIcon>
          <DriveName>Unidad de Red (Z:)</DriveName>
          <DriveInfo>Almacenamiento Compartido</DriveInfo>
          <DriveInfo>2 TB libres de 5 TB</DriveInfo>
        </DriveItem>
      </DrivesList>

      <SystemInfoSection>
        <SystemInfoTitle>Información del Sistema</SystemInfoTitle>
        <SystemInfoGrid>
          <SystemInfoItem>
            <SystemInfoIcon>
              <Cpu size={24} />
            </SystemInfoIcon>
            <SystemInfoContent>
              <SystemInfoLabel>Procesador</SystemInfoLabel>
              <SystemInfoValue>Intel Core i7-10700K @ 3.80GHz</SystemInfoValue>
            </SystemInfoContent>
          </SystemInfoItem>
          <SystemInfoItem>
            <SystemInfoIcon>
              <Memory size={24} />
            </SystemInfoIcon>
            <SystemInfoContent>
              <SystemInfoLabel>Memoria (RAM)</SystemInfoLabel>
              <SystemInfoValue>32 GB DDR4</SystemInfoValue>
            </SystemInfoContent>
          </SystemInfoItem>
          <SystemInfoItem>
            <SystemInfoIcon>
              <Monitor size={24} />
            </SystemInfoIcon>
            <SystemInfoContent>
              <SystemInfoLabel>Pantalla</SystemInfoLabel>
              <SystemInfoValue>NVIDIA GeForce RTX 3080</SystemInfoValue>
            </SystemInfoContent>
          </SystemInfoItem>
          <SystemInfoItem>
            <SystemInfoIcon>
              <Globe size={24} />
            </SystemInfoIcon>
            <SystemInfoContent>
              <SystemInfoLabel>Red</SystemInfoLabel>
              <SystemInfoValue>Intel Wi-Fi 6 AX201 160MHz</SystemInfoValue>
            </SystemInfoContent>
          </SystemInfoItem>
          <SystemInfoItem>
            <SystemInfoIcon>
              <Disc size={24} />
            </SystemInfoIcon>
            <SystemInfoContent>
              <SystemInfoLabel>Sistema Operativo</SystemInfoLabel>
              <SystemInfoValue>RetroOS v1.0</SystemInfoValue>
            </SystemInfoContent>
          </SystemInfoItem>
          <SystemInfoItem>
            <SystemInfoIcon>
              <Clock size={24} />
            </SystemInfoIcon>
            <SystemInfoContent>
              <SystemInfoLabel>Tiempo de Actividad</SystemInfoLabel>
              <SystemInfoValue>3 días, 7 horas, 42 minutos</SystemInfoValue>
            </SystemInfoContent>
          </SystemInfoItem>
        </SystemInfoGrid>
      </SystemInfoSection>
    </ComputerContainer>
  );
};

export default Computer;