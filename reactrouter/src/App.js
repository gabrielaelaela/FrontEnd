import logo from './logo.svg';
import './App.css';
import {Route, Routes, BrowserRouter, Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router</h1>
      <div>
          <BrowserRouter>
              <Link to="/">Home</Link>{' '}
              <Link to="/about">About</Link>{' '}
              <Link to="/contact">Contact</Link>{' '}
              <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </BrowserRouter>
      </div>
    </div>
  );
}

function Home() {
    return (
        <div>
            <h2>This is home page</h2>
        </div>
    )
}

function About() {
    return (
        <div>
            <h2>Here you can find more info about us</h2>
        </div>
    )
}

function Contact() {
    return (
        <div>
            <h2>Our contacts</h2>
        </div>
    )
}

function NotFound() {
    return (
        <div>
            <h2>Sorry, page not found</h2>
        </div>
    )
}

export default App;
