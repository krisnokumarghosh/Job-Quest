import { serverFetch } from "../core/server";

export const getApplicationsByApplicants = async (applicantId) => {
  return serverFetch(`/api/applications?applicantId=${applicantId}`);
};
