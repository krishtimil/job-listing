import React, { useEffect, useState } from 'react';

const Job = (job) => {
  const isNew = true;
  const featured = true;
  const { position, timing, location, keywords, company, company_logo, posted_on } = job.job;
  return (
    <li class="py-3 sm:py-4">
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <img class="w-8 h-8 rounded-full" src={company_logo} alt="" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
            Neil Sims
          </p>
          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
            email@windster.com
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          $320
        </div>
      </div>
    </li>
  )
}

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

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

    <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Job Listings</h5>
        <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          View all
        </a>
      </div>
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          {jobs.map((job) => (<Job job={job} />))}
        </ul>
      </div>
    </div>

  );
};

export default JobListings;