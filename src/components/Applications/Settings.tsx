import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import * as LucideIcons from 'lucide-react';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

const SettingsHeader = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 20px;
`;

const SettingsTitle = styled.h1`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #000080;
`;

const SettingsDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const SettingsSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 15px 0;
  color: #000080;
  border-bottom: 1px solid #dfdfdf;
  padding-bottom: 5px;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #f0f0f0;
  border: 1px solid #dfdfdf;
  margin-bottom: 10px;
`;

const SettingInfo = styled.div`
  display: flex;
  align-items: center;
`;

const SettingIcon = styled.span`
  margin-right: 15px;
  display: flex;
  align-items: center;
  color: #000080;
`;

const SettingText = styled.div`
  flex: 1;
`;

const SettingName = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
`;

const SettingDescription = styled.div`
  font-size: 12px;
  color: #666;
`;

const SettingControl = styled.div`
  display: flex;
  align-items: center;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #000080;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #c0c0c0;
  transition: 0.4s;
  border-radius: 20px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
`;

const VolumeSlider = styled.input`
  width: 100%;
  margin: 0 10px;
`;

const VolumeValue = styled.span`
  font-size: 12px;
  color: #666;
  width: 30px;
  text-align: right;
`;

const ThemeSelector = styled.select`
  padding: 5px 10px;
  background-color: white;
  border: 1px solid #c0c0c0;
  font-size: 14px;
`;

const Settings: React.FC = () => {
  const [theme, setTheme] = React.useState('default');
  const [animations, setAnimations] = React.useState(true);
  const [highContrast, setHighContrast] = React.useState(false);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handleAnimationsToggle = () => {
    setAnimations(!animations);
  };

  const handleHighContrastToggle = () => {
    setHighContrast(!highContrast);
  };

  return (
    <SettingsContainer>
      <SettingsHeader>
        <SettingsTitle>Settings</SettingsTitle>
        <SettingsDescription>Customize your RetroOS experience</SettingsDescription>
      </SettingsHeader>

      <SettingsSection>
        <SectionTitle>Appearance</SectionTitle>
        <SettingItem>
          <SettingInfo>
            <SettingIcon>
              <LucideIcons.Palette size={24} />
            </SettingIcon>
            <SettingText>
              <SettingName>Theme</SettingName>
              <SettingDescription>Change the visual theme of RetroOS</SettingDescription>
            </SettingText>
          </SettingInfo>
          <SettingControl>
            <ThemeSelector value={theme} onChange={handleThemeChange}>
              <option value="default">Windows 98</option>
              <option value="xp">Windows XP</option>
              <option value="linux">Linux 2000</option>
              <option value="mac">Mac OS 9</option>
            </ThemeSelector>
          </SettingControl>
        </SettingItem>
        <SettingItem>
          <SettingInfo>
            <SettingIcon>
              <LucideIcons.Zap size={24} />
            </SettingIcon>
            <SettingText>
              <SettingName>Animations</SettingName>
              <SettingDescription>Enable or disable UI animations</SettingDescription>
            </SettingText>
          </SettingInfo>
          <SettingControl>
            <Switch>
              <SwitchInput
                type="checkbox"
                checked={animations}
                onChange={handleAnimationsToggle}
              />
              <SwitchSlider />
            </Switch>
          </SettingControl>
        </SettingItem>
        <SettingItem>
          <SettingInfo>
            <SettingIcon>
              <LucideIcons.Eye size={24} />
            </SettingIcon>
            <SettingText>
              <SettingName>High Contrast Mode</SettingName>
              <SettingDescription>Improve visibility with high contrast colors</SettingDescription>
            </SettingText>
          </SettingInfo>
          <SettingControl>
            <Switch>
              <SwitchInput
                type="checkbox"
                checked={highContrast}
                onChange={handleHighContrastToggle}
              />
              <SwitchSlider />
            </Switch>
          </SettingControl>
        </SettingItem>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>System</SectionTitle>
        <SettingItem>
          <SettingInfo>
            <SettingIcon>
              <LucideIcons.Info size={24} />
            </SettingIcon>
            <SettingText>
              <SettingName>About RetroOS</SettingName>
              <SettingDescription>Version 1.0.0 (Build 2025.04.15)</SettingDescription>
            </SettingText>
          </SettingInfo>
        </SettingItem>
      </SettingsSection>
    </SettingsContainer>
  );
};

export default Settings;