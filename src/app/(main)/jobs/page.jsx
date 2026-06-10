// page.js
import JobsCard from "@/components/JobsCard";
import JobSearchFilter from "@/components/JobSearchFilter";
import { getJobs } from "@/lib/api/jobs";
import { Suspense } from "react";

const JobsPage = async ({ searchParams }) => {
  const { search, jobType, category, location } = await searchParams;

  const allJobs = await getJobs();
  let filteredJobs = [...allJobs];

  if (search) {
    const q = search.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (j) =>
        j.jobCategory?.toLowerCase().includes(q) ||
        j.company?.toLowerCase().includes(q),
    );
  }
  if (jobType) filteredJobs = filteredJobs.filter((j) => j.jobType === jobType);
  if (category)
    filteredJobs = filteredJobs.filter((j) => j.jobCategory === category);
  if (location) filteredJobs = filteredJobs.filter((j) => j.city === location);

  return (
    <div>
      <div className="container mx-auto mb-8">
        <h1 className="text-[32px] font-bold text-white">Open Positions</h1>
        <p className="text-white/60 mt-3">
          Discover your first or next position
        </p>
      </div>
      <Suspense>
        <JobSearchFilter />
      </Suspense>
      <JobsCard jobs={filteredJobs} />
    </div>
  );
};

export default JobsPage;
