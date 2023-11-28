import HomePage from './components/pages/HomePage/HomePage';
import { Header } from './components/commons/headers/indexHeaders.js';
import { Footer } from './components/commons/footers/indexFooters.js';
import './App.css';

function App() {
  return (
    <>
      <Header title='Todos' />
      <HomePage />
      <Footer caption='Наши социальные сети' />
    </>
  );
}

App.displayName = 'App';
export default App;
