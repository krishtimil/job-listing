import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Job = ({ job, changeFilter }) => {
  const { position, timing, location, keywords, company, company_logo, posted_on } = job;
  const date = moment(new Date(posted_on)).fromNow();
  return (
    <li class="py-3 sm:py-4">
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <img class="w-20 h-20 rounded-full object-contain" src={company_logo} alt="" />
        </div>
        <div class="flex-1 min-w-0 justify-start">
          <p class="text-xl font-medium text-gray-900 truncate dark:text-white">
            {position}
          </p>
          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
            {date} ・ {timing} ・ {location}
          </p>
        </div>
        <div class="inline-flex items-center">
          {keywords.map((keyword) => (
            <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => changeFilter(keyword)}>{keyword}</button>
          ))}
        </div>
      </div>
    </li >
  )
}

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  function filterItemsByCategories() {
    if (selectedCategories.length === 0) {
      // If no categories are selected, return the entire list
      return jobs;
    } else {
      // Filter the list based on the selected categories
      return jobs.filter(item =>
        item.keywords.some(category => selectedCategories.includes(category))
      );
    }
  };

  const filteredItems = filterItemsByCategories();

  const handleCategoryToggle = category => {
    setSelectedCategories(prevCategories => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter(c => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch('https://storage.googleapis.com/programiz-static/hiring/software/job-listing-page-challenge/data.json');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.log('Error fetching job listings:', error);
    }
  };


  return (

    <div class="w-full max-w-3xl p-4 my-12 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-3xl font-bold leading-none text-gray-900 dark:text-white">Job Listings</h5>
        {selectedCategories.length > 0 && (
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={clearAllFilters}>Clear Filter</button>
        )}
      </div>
      {selectedCategories.length > 0 && (
        <div>
        {selectedCategories.map((category) => (
          <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => handleCategoryToggle(category)}>{category} ⨯</button>
          ))}
        </div>) }
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredItems.map((job) => (<Job job={job} changeFilter={handleCategoryToggle} />))}
        </ul>
      </div>
    </div>

  );
};

export default JobListings;