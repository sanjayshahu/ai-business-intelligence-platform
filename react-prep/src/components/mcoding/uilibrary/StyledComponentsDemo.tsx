// // components/StyledComponentsDemo.tsx
// import React, { useState } from 'react';
// import styled, { keyframes, css } from 'styled-components';

// // Animations
// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const pulse = keyframes`
//   0% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(1.05);
//   }
//   100% {
//     transform: scale(1);
//   }
// `;

// const glow = keyframes`
//   0%, 100% {
//     box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
//   }
//   50% {
//     box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
//   }
// `;

// // Styled Components
// const Container = styled.div`
//   min-height: 100vh;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   padding: 2rem;
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// `;

// const MainContent = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   animation: ${fadeIn} 0.8s ease-out;
// `;

// const Header = styled.header`
//   background: rgba(255, 255, 255, 0.95);
//   backdrop-filter: blur(10px);
//   border-radius: 20px;
//   padding: 2rem;
//   margin-bottom: 2rem;
//   text-align: center;
//   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
//   border: 1px solid rgba(255, 255, 255, 0.2);
// `;

// const Title = styled.h1`
//   font-size: 3rem;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   background-clip: text;
//   margin-bottom: 0.5rem;
//   font-weight: 700;
// `;

// const Subtitle = styled.p`
//   font-size: 1.2rem;
//   color: #6b7280;
//   margin-bottom: 1rem;
// `;

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: 1.5rem;
//   margin-bottom: 2rem;
// `;

// interface CardProps {
//   featured?: boolean;
// }

// const Card = styled.div<CardProps>`
//   background: rgba(255, 255, 255, 0.95);
//   backdrop-filter: blur(10px);
//   border-radius: 20px;
//   padding: 2rem;
//   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
//   border: 1px solid rgba(255, 255, 255, 0.2);
//   transition: all 0.3s ease;
//   animation: ${fadeIn} 0.6s ease-out;

//   ${props => props.featured && css`
//     animation: ${glow} 2s ease-in-out infinite;
//     border: 2px solid rgba(59, 130, 246, 0.5);
//   `}

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
//   }
// `;

// const CardHeader = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 1.5rem;
// `;

// const Icon = styled.div<{ color: string }>`
//   width: 50px;
//   height: 50px;
//   border-radius: 12px;
//   background: ${props => props.color};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 1rem;
//   font-weight: bold;
//   color: white;
//   font-size: 1.2rem;
// `;

// const CardTitle = styled.h3`
//   font-size: 1.5rem;
//   color: #374151;
//   margin: 0;
// `;

// const CardText = styled.p`
//   color: #6b7280;
//   line-height: 1.6;
//   margin-bottom: 1.5rem;
// `;

// interface ButtonProps {
//   primary?: boolean;
//   size?: 'small' | 'medium' | 'large';
// }

// const Button = styled.button<ButtonProps>`
//   background: ${props => props.primary 
//     ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
//     : 'transparent'};
//   color: ${props => props.primary ? 'white' : '#667eea'};
//   border: ${props => props.primary ? 'none' : '2px solid #667eea'};
//   padding: ${props => {
//     switch (props.size) {
//       case 'small': return '0.5rem 1rem';
//       case 'large': return '1rem 2rem';
//       default: return '0.75rem 1.5rem';
//     }
//   }};
//   border-radius: 50px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   font-size: ${props => props.size === 'small' ? '0.875rem' : '1rem'};

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
//     animation: ${pulse} 0.6s ease;
//   }

//   &:active {
//     transform: translateY(0);
//   }
// `;

// const CounterContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   margin: 1.5rem 0;
// `;

// const CounterButton = styled.button`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   border: none;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   color: white;
//   font-size: 1.2rem;
//   cursor: pointer;
//   transition: all 0.3s ease;

//   &:hover {
//     transform: scale(1.1);
//   }

//   &:active {
//     transform: scale(0.95);
//   }
// `;

// const CounterValue = styled.span`
//   font-size: 1.5rem;
//   font-weight: bold;
//   color: #374151;
//   min-width: 3rem;
//   text-align: center;
// `;

// const Form = styled.form`
//   background: rgba(255, 255, 255, 0.95);
//   backdrop-filter: blur(10px);
//   border-radius: 20px;
//   padding: 2rem;
//   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
//   border: 1px solid rgba(255, 255, 255, 0.2);
// `;

// const FormGroup = styled.div`
//   margin-bottom: 1.5rem;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 0.5rem;
//   color: #374151;
//   font-weight: 600;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem 1rem;
//   border: 2px solid #e5e7eb;
//   border-radius: 10px;
//   font-size: 1rem;
//   transition: all 0.3s ease;

//   &:focus {
//     outline: none;
//     border-color: #667eea;
//     box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//   }
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 0.75rem 1rem;
//   border: 2px solid #e5e7eb;
//   border-radius: 10px;
//   font-size: 1rem;
//   resize: vertical;
//   min-height: 120px;
//   transition: all 0.3s ease;
//   font-family: inherit;

//   &:focus {
//     outline: none;
//     border-color: #667eea;
//     box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//   }
// `;

// const StyledComponentsDemo: React.FC = () => {
//   const [count, setCount] = useState(0);
//   const [isActive, setIsActive] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert('Form submitted with styled components!');
//   };

//   return (
//     <Container>
//       <MainContent>
//         <Header>
//           <Title>Styled Components</Title>
//           <Subtitle>
//             CSS-in-JS library for scoped styles with full CSS power
//           </Subtitle>
//           <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
//             <Button size="small">Components</Button>
//             <Button primary size="small">Theming</Button>
//             {/* < */}
export default {}