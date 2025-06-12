import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './NoteModal.module.css';
import NoteForm from '../NoteForm/NoteForm';

interface NoteModalProps {
  onClose: () => void;
}

const modalRoot = document.getElementById('modal-root') as HTMLElement;

export default function NoteModal({ onClose }: NoteModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm onClose={onClose} />
      </div>
    </div>,
    modalRoot
  );
}