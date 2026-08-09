'use client';

import { useState } from 'react';
import { useHover } from '../lib/useHover';
import LoginModal from './LoginModal';

export default function LoginButtonWithModal({ navLinkStyle, hoverColor, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, hoverProps] = useHover();

  const buttonStyle = {
    ...navLinkStyle,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    padding: 0,
    margin: 0,
    color: hovered ? hoverColor : navLinkStyle.color,
    transition: 'color 0.15s ease',
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        style={buttonStyle}
        {...hoverProps}
      >
        {children}
      </button>
      {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
