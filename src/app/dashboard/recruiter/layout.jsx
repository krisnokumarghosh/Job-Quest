import { requireRole } from "@/lib/core/session";

const Recruiterlayout = async ({ children }) => {
  await requireRole("recruiter");
  return children;
};

export default Recruiterlayout;
