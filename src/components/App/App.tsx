import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { Toaster } from 'react-hot-toast';
import { fetchNotes } from '../../services/noteService';

import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import NoteModal from '../NoteModal/NoteModal';
import Pagination from '../Pagination/Pagination';

import css from './App.module.css';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 300);

  const handleToggleModal = () => {
    setIsOpen(prev => !prev);
  };

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch),
    placeholderData: (keep) => keep,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <Toaster position="top-right" />

      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        <button className={css.button} onClick={handleToggleModal}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch notes</p>}

      {notes.length > 0 && <NoteList notes={notes} />}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(selected: number) => setPage(selected)}
        />
      )}

{isOpen && <NoteModal onClose={handleToggleModal} />}
    </div>
  );
}