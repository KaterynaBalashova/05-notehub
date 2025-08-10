// import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
// import Pagination from '../Pagination/Pagination';

function App() {

  return (
   <div className={css.app}>
	  <header className={css.toolbar}>
		  {<SearchBox/>}
		  {/* {<Pagination/>} */}
		  {<button className={css.button}>Create note +</button>}
    </header>
  </div>

  )
};

export default App
