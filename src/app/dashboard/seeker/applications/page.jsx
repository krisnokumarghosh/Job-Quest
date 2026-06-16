// app/dashboard/seeker/applications/page.jsx

import { getApplicationsByApplicants } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import { Table, Chip } from "@heroui/react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const statusConfig = {
  applied: { label: "Applied", color: "default" },
  review: { label: "Review", color: "warning" },
  shortlisted: { label: "Shortlisted", color: "success" },
  rejected: { label: "Rejected", color: "danger" },
  offered: { label: "Offered", color: "primary" },
};

const JobIcon = ({ category }) => {
  const icons = {
    Healthcare: "🏥",
    Engineering: "⚙️",
    Design: "🎨",
    Finance: "💰",
    Technology: "💻",
  };
  return (
    <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-base shrink-0">
      {icons[category] ?? "💼"}
    </div>
  );
};

const ApplicationsPage = async () => {
  const user = await getUserSession();
  const applications = await getApplicationsByApplicants(user?.id);

  return (
    <div className="p-6">
      <h1 className="text-xl font-medium text-white mb-6">My Applications</h1>

      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Applications table"
            classNames={{
              base: "bg-neutral-900 rounded-xl",
              table: "min-w-full",
              thead:
                "[&>tr>th]:bg-neutral-900 [&>tr>th]:text-neutral-400 [&>tr>th]:font-normal [&>tr>th]:text-sm [&>tr>th]:border-b [&>tr>th]:border-neutral-800",
              tbody: "[&>tr>td]:border-b [&>tr>td]:border-neutral-800",
              tr: "hover:bg-neutral-800/50 transition-colors",
              td: "text-neutral-300 text-sm py-4",
            }}
          >
            <Table.Header>
              <Table.Column isRowHeader>Job Title</Table.Column>
              <Table.Column>Company</Table.Column>
              <Table.Column>Applied</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>

            <Table.Body
              emptyContent={
                <div className="py-12 text-neutral-500 text-sm">
                  No applications yet.
                </div>
              }
            >
              {applications.map((app) => {
                const status = statusConfig[app.status ?? "applied"];
                const appliedAt = app.createdAt?.$date
                  ? formatDistanceToNow(new Date(app.createdAt.$date), {
                      addSuffix: true,
                    })
                  : "—";

                return (
                  <Table.Row key={app._id?.$oid ?? app._id}>
                    {/* Job Title */}
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <JobIcon category={app.jobCategory} />
                        <div>
                          <p className="text-white font-medium text-sm">
                            {app.jobTitle}
                          </p>
                          <p className="text-neutral-500 text-xs mt-0.5">
                            {app.jobCategory}
                          </p>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* Company */}
                    <Table.Cell>{app.companyName}</Table.Cell>

                    {/* Applied */}
                    <Table.Cell className="text-neutral-400">
                      {appliedAt}
                    </Table.Cell>

                    {/* Status */}
                    <Table.Cell>
                      <Chip color="success">{status.label}</Chip>
                    </Table.Cell>

                    {/* Action */}
                    <Table.Cell>
                      <Link
                        href={`/dashboard/seeker/applications/${app.jobId}`}
                        className="text-neutral-300 hover:text-white text-sm transition-colors"
                      >
                        Details
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default ApplicationsPage;
