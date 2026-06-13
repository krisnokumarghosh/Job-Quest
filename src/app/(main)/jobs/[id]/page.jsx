import { Avatar, Badge, Button, Chip } from "@heroui/react";

import Image from "next/image";
import { getJobsById } from "@/lib/api/jobs";
import { Bookmark, Calendar, CircleDollar } from "@gravity-ui/icons";
import Link from "next/link";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobsById(id);

  const {
    jobTitle,
    jobCategory,
    jobType,
    salaryMin,
    salaryMax,
    currency,
    deadline,
    city,
    country,
    responsibilities,
    requirements,
    benefits,
    company,
    companyLogo,
    isRemote,
    status,
  } = job;

  const formattedDeadline = new Date(deadline).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto p-8 border rounded-xl ">
      {/* Header */}
      <div>
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-xl border border-border overflow-hidden shrink-0">
            {companyLogo ? (
              <Image
                src={companyLogo}
                alt={`${company} logo`}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            ) : (
              <Avatar className="rounded-xl  h-14 w-14">
                <Avatar.Fallback>Logo</Avatar.Fallback>
              </Avatar>
            )}
          </div>
          <div>
            <h1 className="text-xl font-semibold">{jobTitle}</h1>
            <p className="text-sm text-muted mt-0.5">
              {company} &nbsp;·&nbsp; {city}, {country}
            </p>
          </div>
        </div>
      </div>

      {/* Badges & Meta */}
      <div className="flex flex-wrap gap-3 mt-5">
        <Chip variant="secondary">{jobType}</Chip>
        <Chip variant="secondary">{jobCategory}</Chip>
        <Chip variant="secondary">{isRemote ? "Remote" : "On-site"}</Chip>
        <span className="flex items-center gap-1.5 text-sm text-muted">
          <CircleDollar className="size-4" />
          {Number(salaryMin).toLocaleString()} –{" "}
          {Number(salaryMax).toLocaleString()} {currency}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-muted">
          <Calendar className="size-4" />
          Deadline: {formattedDeadline}
        </span>
      </div>

      <hr className="border-border my-6" />

      {/* Sections */}
      <div className="flex flex-col gap-4">
        <Section title="Responsibilities" content={responsibilities} />
        <Section title="Requirements" content={requirements} />
        <Section title="Benefits" content={benefits} />
      </div>

      <hr className="border-border my-6" />

      {/* Bottom CTA */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          <Bookmark className="size-4" />
          Save
        </Button>
        <Link href={`/jobs/${id}/apply`}>
          <Button className="bg-foreground text-background" size="sm">
            Apply now
          </Button>
        </Link>
      </div>
    </div>
  );
};

const Section = ({ title, content }) => (
  <div className="border border-border rounded-xl p-4">
    <h2 className="text-sm font-semibold mb-2">{title}</h2>
    <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
      {content}
    </p>
  </div>
);

export default JobDetailsPage;
