import logo from './logo.svg';
import './App.css';
import JobListings from './JobListings';

function App() {
  return (
    <div className="App">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="container">
          <div className="flex items-center justify-center lg:flex ">
              <JobListings />
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
