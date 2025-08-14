import css from './App.module.css';
import { useState } from 'react';
import { fetchNotes } from '../../services/noteService';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from "../NoteList/NoteList"
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';


function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isSuccess} = useQuery({
    queryKey: ["notes",searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  })

  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const totalPages = data?.totalPages || 0;

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
   <div className={css.app}>
	  <header className={css.toolbar}>
        {<SearchBox text={ searchQuery} onSearch={debouncedSetSearchQuery}/>}
      {isSuccess && totalPages > 1 && (<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>)}
      {<button className={css.button} onClick={openModal}>Create note +</button>}          
    </header>
      {data && data.notes.length > 0 && !isLoading && <NoteList notes={data.notes} />}
      {isModalOpen &&
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} onCancel={closeModal}/>
        </ Modal>}
  </div>

  )
};

export default App
