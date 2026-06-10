import { Globe, MapPin, Persons } from "@gravity-ui/icons";
import { Card, Button, Link } from "@heroui/react";

import Image from "next/image";

export default function CompanyDetailsCard({ company }) {
  console.log(company);
  console.log(company.companyName);

  return (
    <div className="mt-20">
      <Card className="w-[360px] p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-xl bg-black flex items-center justify-center shrink-0 overflow-hidden">
              {company.logoUrl ? (
                <Image
                  src={company.logoUrl}
                  alt={`${company.companyName} logo`}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-lg">
                  {company.companyName}
                </span>
              )}
            </div>
            <div>
              <p className="font-medium text-base">{company.companyName}</p>
              <p className="text-sm text-muted">{company.category}</p>
            </div>
          </div>

          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-foreground text-background uppercase tracking-wide">
            {company.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed mb-4">
          {company.description}
        </p>

        <hr className="border-border mb-4" />

        {/* Meta */}
        <div className="flex gap-5 mb-3">
          <span className="flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="size-4" />
            {company.location}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted">
            <Persons className="size-4" />
            {company.employeeRange}
          </span>
        </div>

        {/* Website Link */}
        {company.websiteURL && (
          <Link
            href={company.websiteURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            <Globe className="size-4" />
            Visit Website
            <Link.Icon aria-hidden="true" />
          </Link>
        )}
      </Card>
    </div>
  );
}
