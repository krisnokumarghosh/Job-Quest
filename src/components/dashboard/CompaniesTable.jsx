"use client";

import { updateCompany } from "@/lib/actions/companies";
import { Table, Button, Chip, Avatar } from "@heroui/react";

const statusColorMap = {
  Pending: "warning",
  Approved: "success",
  Rejected: "danger",
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const CompaniesTable = ({ companies = [] }) => {
  const handleApprove = async (id) => {
    console.log(`approve company id: ${id}`);
    const result = await updateCompany(id, { status: "Approved" });
  };

  const handleReject = async (id) => {
    const result = await updateCompany(id, { status: "Rejected" });
  };

  return (
    <Table aria-label="Company applications table">
      <Table.ScrollContainer>
        <Table.Content>
          <Table.Header>
            <Table.Column
              isRowHeader
              className="bg-default-100 text-default-600 font-medium text-sm"
            >
              Company Name
            </Table.Column>
            <Table.Column className="bg-default-100 text-default-600 font-medium text-sm">
              Recruiter Email
            </Table.Column>
            <Table.Column className="bg-default-100 text-default-600 font-medium text-sm">
              Industry
            </Table.Column>
            <Table.Column className="bg-default-100 text-default-600 font-medium text-sm">
              Jobs
            </Table.Column>
            <Table.Column className="bg-default-100 text-default-600 font-medium text-sm">
              Status
            </Table.Column>
            <Table.Column className="bg-default-100 text-default-600 font-medium text-sm">
              Date Submitted
            </Table.Column>
            <Table.Column className="bg-default-100 text-default-600 font-medium text-sm text-right">
              Actions
            </Table.Column>
          </Table.Header>

          <Table.Body emptyContent="No companies found.">
            {companies.map((company) => {
              const status = company.status || "Pending";
              const isApproved = status === "Approved";
              const isRejected = status === "Rejected";

              const submittedAt = company.createdAt
                ? new Date(company.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })
                : "—";

              return (
                <Table.Row key={company._id?.$oid ?? company._id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={company.logoUrl}
                        name={getInitials(company.companyName)}
                        size="sm"
                        radius="sm"
                        className="shrink-0"
                      />
                      <span className="font-medium text-sm">
                        {company.companyName}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-sm text-default-600">
                      {company.recruiterEmail ?? "—"}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-sm text-default-500 border border-default-200 rounded-full px-3 py-0.5">
                      {company.category ?? "—"}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-sm text-default-500 border border-default-200 rounded-full px-3 py-0.5">
                      {company.jobCount ?? "—"}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <Chip
                      color={statusColorMap[status] ?? "default"}
                      variant="dot"
                      size="sm"
                    >
                      {status}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-sm text-default-600">
                      {submittedAt}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center justify-end gap-2">
                      {!isApproved && (
                        <Button
                          size="sm"
                          color="success"
                          variant="bordered"
                          className="text-success font-medium border-success"
                          onClick={() => handleApprove(company?._id)}
                        >
                          Approve
                        </Button>
                      )}
                      {!isRejected && (
                        <Button
                          size="sm"
                          color="danger"
                          variant="bordered"
                          className="text-danger font-medium border-danger"
                          onClick={() => handleReject(company?._id)}
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};

export default CompaniesTable;
