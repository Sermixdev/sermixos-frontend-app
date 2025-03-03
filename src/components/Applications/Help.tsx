import React from 'react';
import styled from 'styled-components';
import * as LucideIcons from 'lucide-react';

const HelpContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

const HelpHeader = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 20px;
`;

const HelpTitle = styled.h1`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #000080;
`;

const HelpDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const HelpContent = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HelpSidebar = styled.div`
  width: 200px;
  border-right: 1px solid #dfdfdf;
  padding-right: 20px;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #dfdfdf;
    padding-right: 0;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
`;

const HelpTopicsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const HelpTopicItem = styled.li<{ $isActive: boolean }>`
  padding: 8px 10px;
  margin-bottom: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.$isActive ? '#000080' : 'transparent')};
  color: ${(props) => (props.$isActive ? 'white' : 'inherit')};
  border-radius: 4px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${(props) => (props.$isActive ? '#000080' : '#f0f0f0')};
  }
`;

const TopicIcon = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const HelpMain = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const TopicTitle = styled.h2`
  font-size: 20px;
  margin: 0 0 15px 0;
  color: #000080;
`;

const TopicContent = styled.div`
  font-size: 14px;
  line-height: 1.6;

  h3 {
    font-size: 16px;
    color: #000080;
    margin: 20px 0 10px 0;
  }

  p {
    margin-bottom: 15px;
  }

  ul {
    margin-bottom: 15px;
  }

  li {
    margin-bottom: 5px;
  }
`;

const SearchBox = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px 10px;
  font-size: 14px;
  border: 1px solid #c0c0c0;
  border-right: none;
  background-color: white;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  background-color: #c0c0c0;
  border: 1px solid #c0c0c0;
  box-shadow: inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff;
  cursor: pointer;

  &:active {
    box-shadow: inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff;
  }
`;

const Help: React.FC = () => {
  const [activeTopic, setActiveTopic] = React.useState('getting-started');
  const [searchQuery, setSearchQuery] = React.useState('');

  const topics = [
    {
      id: 'getting-started',
      title: 'Primeros Pasos',
      icon: 'Home',
      content: (
        <>
          <h3>¡Bienvenido a RetroOS!</h3>
          <p>
            RetroOS es una aplicación web moderna que simula la apariencia y el funcionamiento de los sistemas operativos clásicos de finales de los 90 y principios de los 2000. Esta guía te ayudará a navegar y usar las diferentes características de RetroOS.
          </p>
          
          <h3>Navegación Básica</h3>
          <p>
            RetroOS cuenta con un entorno de escritorio con iconos, ventanas y una barra de tareas, similar a los sistemas Windows 98 o Linux 2000 clásicos.
          </p>
          <ul>
            <li><strong>Iconos de Escritorio:</strong> Un clic para seleccionar, doble clic para abrir.</li>
            <li><strong>Menú Inicio:</strong> Haz clic en el botón "Inicio" en la esquina inferior izquierda para acceder a las aplicaciones y funciones del sistema.</li>
            <li><strong>Barra de Tareas:</strong> Muestra las aplicaciones en ejecución y el reloj del sistema.</li>
            <li><strong>Ventanas:</strong> Se pueden mover, redimensionar, minimizar, maximizar y cerrar.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'windows',
      title: 'Trabajando con Ventanas',
      icon: 'Maximize2',
      content: (
        <>
          <h3>Controles de Ventana</h3>
          <p>
            Cada ventana en RetroOS tiene controles estándar en la esquina superior derecha:
          </p>
          <ul>
            <li><strong>Minimizar (-):</strong> Oculta la ventana pero la mantiene ejecutándose en la barra de tareas.</li>
            <li><strong>Maximizar (□):</strong> Expande la ventana para llenar la pantalla. Haz clic de nuevo para restaurar al tamaño anterior.</li>
            <li><strong>Cerrar (X):</strong> Cierra la ventana y la aplicación.</li>
          </ul>
          
          <h3>Mover y Redimensionar</h3>
          <p>
            Para mover una ventana, haz clic y arrastra la barra de título. Para redimensionar una ventana, haz clic y arrastra cualquier borde o esquina de la ventana.
          </p>
          
          <h3>Foco de Ventana</h3>
          <p>
            Hacer clic en cualquier parte de una ventana la trae al frente (le da el foco). La ventana activa tiene una barra de título resaltada.
          </p>
        </>
      ),
    },
    {
      id: 'applications',
      title: 'Aplicaciones',
      icon: 'Briefcase',
      content: (
        <>
          <h3>Aplicaciones Disponibles</h3>
          <p>
            RetroOS viene con varias aplicaciones incorporadas:
          </p>
          <ul>
            <li><strong>Blog:</strong> Lee artículos sobre IA, datos y automatización.</li>
            <li><strong>Portafolio:</strong> Ve proyectos destacados y sus detalles.</li>
            <li><strong>Sobre Mí:</strong> Conoce el perfil profesional y antecedentes.</li>
            <li><strong>Contacto:</strong> Ponte en contacto a través del formulario de contacto o redes sociales.</li>
            <li><strong>Mi PC:</strong> Ve información del sistema y detalles de almacenamiento.</li>
            <li><strong>Papelera de Reciclaje:</strong> Gestiona archivos eliminados.</li>
            <li><strong>Configuración:</strong> Personaliza tu experiencia RetroOS.</li>
            <li><strong>Ayuda:</strong> Accede a este sistema de ayuda.</li>
          </ul>
          
          <h3>Abrir Aplicaciones</h3>
          <p>
            Las aplicaciones se pueden abrir de varias formas:
          </p>
          <ul>
            <li>Doble clic en el icono de la aplicación en el escritorio.</li>
            <li>Haz clic en el botón Inicio y selecciona la aplicación del menú.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'customization',
      title: 'Personalización',
      icon: 'Settings',
      content: (
        <>
          <h3>Configuración del Sistema</h3>
          <p>
            RetroOS se puede personalizar a través de la aplicación Configuración:
          </p>
          <ul>
            <li><strong>Sonido:</strong> Activa/desactiva sonidos del sistema y ajusta el volumen.</li>
            <li><strong>Apariencia:</strong> Cambia el tema visual, alterna animaciones y activa el modo de alto contraste.</li>
            <li><strong>Sistema:</strong> Ve información del sistema y detalles de la versión.</li>
          </ul>
          
          <h3>Personalización del Escritorio</h3>
          <p>
            Aunque RetroOS mantiene la apariencia clásica de los sistemas operativos antiguos, aún puedes personalizar tu experiencia a través de las configuraciones disponibles.
          </p>
        </>
      ),
    },
    {
      id: 'troubleshooting',
      title: 'Solución de Problemas',
      icon: 'AlertTriangle',
      content: (
        <>
          <h3>Problemas Comunes</h3>
          <p>
            Si encuentras algún problema mientras usas RetroOS, prueba estas soluciones:
          </p>
          <ul>
            <li><strong>Aplicación no responde:</strong> Cierra y vuelve a abrir la aplicación.</li>
            <li><strong>Sistema lento:</strong> Cierra aplicaciones no utilizadas para liberar recursos.</li>
            <li><strong>Problemas de visualización:</strong> Intenta refrescar la página o ajustar el nivel de zoom del navegador.</li>
          </ul>
          
          <h3>Compatibilidad del Navegador</h3>
          <p>
            RetroOS funciona mejor en navegadores modernos como Chrome, Firefox, Safari o Edge. Si experimentas problemas, asegúrate de que tu navegador esté actualizado.
          </p>
          
          <h3>Reportar Problemas</h3>
          <p>
            Si encuentras un error o tienes una sugerencia de mejora, por favor usa el formulario de Contacto para reportarlo.
          </p>
        </>
      ),
    },
  ];

  const handleTopicClick = (id: string) => {
    setActiveTopic(id);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would search through help content
    console.log('Searching for:', searchQuery);
  };

  const currentTopic = topics.find((topic) => topic.id === activeTopic);

  return (
    <HelpContainer>
      <HelpHeader>
        <HelpTitle>Ayuda</HelpTitle>
        <HelpDescription>Aprende a usar RetroOS</HelpDescription>
      </HelpHeader>

      <form onSubmit={handleSearchSubmit}>
        <SearchBox>
          <SearchInput
            type="text"
            placeholder="Buscar temas de ayuda..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <SearchButton type="submit">
            <LucideIcons.Search size={16} />
          </SearchButton>
        </SearchBox>
      </form>

      <HelpContent>
        <HelpSidebar>
          <HelpTopicsList>
            {topics.map((topic) => (
              <HelpTopicItem
                key={topic.id}
                $isActive={topic.id === activeTopic}
                onClick={() => handleTopicClick(topic.id)}
              >
                <TopicIcon>
                  {React.createElement(
                    LucideIcons[topic.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle,
                    { size: 16 }
                  )}
                </TopicIcon>
                {topic.title}
              </HelpTopicItem>
            ))}
          </HelpTopicsList>
        </HelpSidebar>

        <HelpMain>
          {currentTopic && (
            <>
              <TopicTitle>{currentTopic.title}</TopicTitle>
              <TopicContent>{currentTopic.content}</TopicContent>
            </>
          )}
        </HelpMain>
      </HelpContent>
    </HelpContainer>
  );
};

export default Help;