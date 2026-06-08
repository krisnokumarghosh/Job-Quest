import RegisterCompanyModal from "@/components/dashboard/RegisterCompanyModal";
import React from "react";

const CompanyProfilePage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold mt-10">My Companies</h1>
          <p className="text-white/60 mt-3">
            Manage your registered companies and their verification states.
          </p>
        </div>

        <div>
           <RegisterCompanyModal></RegisterCompanyModal>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
