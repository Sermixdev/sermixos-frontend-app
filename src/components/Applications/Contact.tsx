import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import * as LucideIcons from 'lucide-react';

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

const ContactHeader = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 20px;
`;

const ContactTitle = styled.h1`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #000080;
`;

const ContactDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const ContactContent = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactFormSection = styled.div`
  flex: 1;
`;

const ContactInfoSection = styled.div`
  flex: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: #000080;
`;

const Input = styled.input`
  padding: 8px 10px;
  font-size: 14px;
  border: 1px solid #c0c0c0;
  border-radius: 0;
  background-color: white;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: 1px solid #000080;
  }
`;

const TextArea = styled.textarea`
  padding: 8px 10px;
  font-size: 14px;
  border: 1px solid #c0c0c0;
  border-radius: 0;
  background-color: white;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1);
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: 1px solid #000080;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  background-color: #000080;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
  align-self: flex-start;

  &:hover {
    background-color: #0000b0;
  }

  &:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
  }
`;

const ContactInfoCard = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #dfdfdf;
  margin-bottom: 20px;
`;

const ContactInfoTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 15px 0;
  color: #000080;
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ContactInfoIcon = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
  color: #000080;
`;

const ContactInfoText = styled.span`
  font-size: 14px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #000080;
  color: white;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0000b0;
  }
`;

const SuccessMessage = styled.div`
  padding: 15px;
  background-color: #e6ffe6;
  border: 1px solid #b3ffb3;
  color: #006600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.div`
  padding: 15px;
  background-color: #ffe6e6;
  border: 1px solid #ffb3b3;
  color: #cc0000;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const MessageIcon = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      if (Math.random() > 0.2) { // 80% success rate for demo
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <ContactContainer>
      <Helmet>
        <title>Contacto - RetroOS</title>
        <meta name="description" content="Ponte en contacto conmigo" />
      </Helmet>
      
      <ContactHeader>
        <ContactTitle>Contacto</ContactTitle>
        <ContactDescription>Ponte en contacto conmigo</ContactDescription>
      </ContactHeader>

      {submitStatus === 'success' && (
        <SuccessMessage>
          <MessageIcon>
            <LucideIcons.CheckCircle size={20} />
          </MessageIcon>
          ¡Tu mensaje ha sido enviado exitosamente! Me pondré en contacto contigo pronto.
        </SuccessMessage>
      )}

      {submitStatus === 'error' && (
        <ErrorMessage>
          <MessageIcon>
            <LucideIcons.AlertCircle size={20} />
          </MessageIcon>
          Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.
        </ErrorMessage>
      )}

      <ContactContent>
        <ContactFormSection>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Nombre</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <Label htmlFor="message">Mensaje</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </SubmitButton>
          </Form>
        </ContactFormSection>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact;