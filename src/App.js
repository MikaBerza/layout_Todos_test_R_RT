import { HomePage } from './components/pages/HomePage';
import { Header } from './components/commons/Header';
import { Footer } from './components/commons/Footer';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  );
}

App.displayName = 'App';
export default App;
