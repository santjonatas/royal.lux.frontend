import { useEffect, useRef } from "react";
import "./TextArea.css";

interface TextAreaProps {
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
  placeholder: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  id?: string;
  rows?: number;
}

export default function TextArea({
  value = "",
  onChange = () => {}, 
  placeholder,
  name = "",
  required = false,
  disabled = false,
  readOnly = false,
  id = "",
  rows = 5
}: TextAreaProps) {
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleResize = () => {
      adjustHeight();
    };
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      adjustHeight();
    });

    resizeObserver.observe(textarea);

    if (textarea.parentElement) {
      resizeObserver.observe(textarea.parentElement);
    }

    adjustHeight(); 
    
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <textarea
      ref={textareaRef}
      id={id}
      value={value}
      onChange={onChange}
      className="input-form"
      name={name}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      rows={rows}
      style={{ overflow: 'hidden' }}
    />
  );
}