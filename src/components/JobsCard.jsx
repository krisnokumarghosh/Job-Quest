import { Briefcase, CircleDollar, MapPin } from "@gravity-ui/icons";
import { Avatar, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const JobsCard = ({ jobs }) => {
  return (
    <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3  gap-7 justify-items-center">
      {jobs.map((job, ind) => {
        return (
          <Card key={ind} className="bg-[#151516] max-w-100  px-6 py-8">
            <div className="flex items-center gap-5 mb-3">
              {job.companyLogo ? (
                <Image
                  alt={job.jobCategory}
                  height={32}
                  width={32}
                  src={job.companyLogo}
                />
              ) : (
                <Avatar>
                  <Avatar.Fallback>Logo</Avatar.Fallback>
                </Avatar>
              )}
              <h4 className="text-white font-semibold text-xl">
                {job.company}
              </h4>
            </div>
            <Card.Header className="p-0">
              <Card.Title className="text-white text-2xl font-bold mb-3">
                {job.jobCategory}
              </Card.Title>
              <Card.Description className="text-gray-400 text-sm leading-relaxed mb-8">
                {job.responsibilities}
              </Card.Description>
            </Card.Header>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {job.isRemote ? (
                <span className="flex items-center gap-2 bg-[#2a2a2a] text-gray-300 text-sm px-4 py-2 rounded-full">
                  <MapPin className="w-4 h-4 text-[#F7C2FF]" />
                  Remote
                </span>
              ) : (
                <span className="flex items-center gap-2 bg-[#2a2a2a] text-gray-300 text-sm px-4 py-2 rounded-full">
                  <MapPin className="w-4 h-4 text-[#F7C2FF]" />
                  {job.city}, {job.country}
                </span>
              )}
              <span className="flex items-center gap-2 bg-[#2a2a2a] text-gray-300 text-sm px-4 py-2 rounded-full">
                <Briefcase className="w-4 h-4 text-[#F7C2FF]" />
                {job.jobType}
              </span>
              <span className="flex items-center gap-2 bg-[#2a2a2a] text-gray-300 text-sm px-4 py-2 rounded-full">
                <CircleDollar className="w-4 h-4 text-[#F7C2FF]" />
                {job.currency} {job.salaryMin} - {job.salaryMax}
              </span>
            </div>

            <Card.Footer className="p-0">
              <Link
                href={`/jobs/${job._id}`}
                className="flex items-center gap-2 text-white font-medium text-sm hover:gap-3 transition-all duration-200"
              >
                Apply Now <span>→</span>
              </Link>
            </Card.Footer>
          </Card>
        );
      })}
    </div>
  );
};

export default JobsCard;
