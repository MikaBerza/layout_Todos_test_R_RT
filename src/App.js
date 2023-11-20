import HomePage from './components/pages/HomePage/HomePage';
import Header from './components/commons/headers/Header';
import Footer from './components/commons/footers/Footer';
import './App.css';

function App() {
  return (
    <>
      <Header title={'Todos'} />
      <HomePage />
      <Footer />
    </>
  );
}

export default App;
