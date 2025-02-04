import Footer from './components/Footer';
import './globals.css'
import Main from './pages/Main';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col bg-slate-700'>
      <Navbar />
      <Main/>
      <Footer/>
    </div>
  );
}
