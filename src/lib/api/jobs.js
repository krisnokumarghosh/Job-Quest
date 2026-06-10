import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyJobs = async (companyId, status = "active") => {
  const res = await fetch(
    `${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`,
  );
  const data = res.json();
  return data;
};

export const getJobs = async () => {
  return serverFetch("/api/jobs");
};


export const getJobsById = async (jobId) => {
  return serverFetch(`/api/jobs/${jobId}`);
};
