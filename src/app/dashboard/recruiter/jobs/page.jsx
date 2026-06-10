import { getLoggedInRecruiterCompany } from "@/lib/api/companies";
import { getCompanyJobs } from "@/lib/api/jobs";
import { Eye, PencilToLine, TrashBin } from "@gravity-ui/icons";
import { Button, Table } from "@heroui/react";

const RecruiterJobs = async () => {
  const company =await getLoggedInRecruiterCompany()
  const jobs = await getCompanyJobs(company._id);

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-10">Manage all Jobs</h1>
      <p className="text-white/60 mt-3">
        View, Update and Manage your current job posting
      </p>

      <div className="mt-16 container mx-auto">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Jobs table" className="min-w-150">
              <Table.Header>
                <Table.Column isRowHeader>Job Title</Table.Column>
                <Table.Column>Type / Category</Table.Column>
                <Table.Column>Salary</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column>Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {jobs.map((job) => (
                  <Table.Row key={job._id}>
                    <Table.Cell>{job.jobTitle}</Table.Cell>
                    <Table.Cell>{job.jobType} · {job.jobCategory}</Table.Cell>
                    <Table.Cell>{job.salaryMin} - {job.salaryMax} {job.currency}</Table.Cell>
                    <Table.Cell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {job.status}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-2">
                        <Button className="bg-transparent"><Eye/></Button>
                        <Button className="bg-transparent"><PencilToLine/></Button>
                        <Button className="bg-transparent text-red-500"><TrashBin/></Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
};

export default RecruiterJobs;