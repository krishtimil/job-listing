import logo from './logo.svg';
import './App.css';
import JobListings from './JobListings';

function App() {
  return (
    <div className="App">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="container px-10 py-6 m-auto">
          <div className="flex items-center justify-center lg:flex ">
              <JobListings />
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
