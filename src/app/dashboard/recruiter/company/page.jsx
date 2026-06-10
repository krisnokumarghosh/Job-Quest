import CompanyDetailsCard from "@/components/dashboard/CompanyDetailsCard";
import RegisterCompanyModal from "@/components/dashboard/RegisterCompanyModal";
import { getRecruiterCompany } from "@/lib/api/companies";
import { getUserSession } from "@/lib/core/session";
import { Factory } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import React from "react";

const CompanyProfilePage = async () => {
  const user = await getUserSession();
  const company = await getRecruiterCompany(user.id);
  console.log(company);

  return (
    <div className="container mx-auto">
      {!company?._id ? (
        <div className="mt-12  lg:mt-30 flex justify-center items-center">
          <Card className="w-125 py-6">
            <div className=" bg-white/6 w-15 h-15 mx-auto flex justify-center items-center rounded-2xl">
              <Factory
                aria-label="Dollar sign icon"
                className="text-primary size-6 "
                role="img"
              />
            </div>
            <Card.Header>
              <Card.Title className="text-center text-2xl mt-4">
                No Company Registered Yet!
              </Card.Title>
              <Card.Description className="text-center text-[17px] mt-4">
                Register a company to see company details
              </Card.Description>
            </Card.Header>
            <Card.Footer className="mt-4 mx-auto">
              <RegisterCompanyModal recruiter={user}></RegisterCompanyModal>
            </Card.Footer>
          </Card>
        </div>
      ) : (
        <div>
          <div>
            <h1 className="text-2xl font-semibold mt-10">My Companies</h1>
            <p className="text-white/60 mt-3">
              Manage your registered companies and their verification states.
            </p>
          </div>

          <div>
            <CompanyDetailsCard company={company}></CompanyDetailsCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfilePage;
