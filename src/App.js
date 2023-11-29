import { HomePage } from './components/pages/HomePage';
import { Header } from './components/commons/headers/Header';
import { Footer } from './components/commons/footers/Footer';
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
