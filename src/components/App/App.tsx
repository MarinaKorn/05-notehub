
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import NoteModal from '../NoteModal/NoteModal';
import Pagination from '../Pagination/Pagination';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const handleToggleModal = () => {
    setIsOpen(prev => !prev);
  };

  return (
      <div className={css.app}>
          {isOpen && (
  <NoteModal onClose={handleToggleModal}>
    <NoteForm onCancel={handleToggleModal} onSubmit={() => {}} />
  </NoteModal>
)}

<NoteList notes={[]} onDelete={() => {}} />
<Pagination totalPages={5} currentPage={page} onPageChange={setPage} />

      <Toaster position="top-right" />

      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />

  

        <button className={css.button} onClick={handleToggleModal}>
          Create note +
        </button>
          </header>
          <NoteList notes={[]} onDelete={() => {}} />
<Pagination totalPages={5} currentPage={1} onPageChange={() => {}} />

      {isOpen && (
  <NoteModal onClose={handleToggleModal}>
    <NoteForm
      onSubmit={values => {
        console.log(values);
        handleToggleModal();
      }}
      onCancel={handleToggleModal}
    />
  </NoteModal>
)}

    </div>
  );
}
