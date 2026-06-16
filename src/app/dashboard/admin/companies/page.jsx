import CompaniesTable from "@/components/dashboard/CompaniesTable";
import { getCompanies } from "@/lib/api/companies";
import React from "react";

const AdminCompaniesPage = async () => {
  const companies = await getCompanies();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold my-6">Company Applications</h1>

      <CompaniesTable companies={companies}></CompaniesTable>
    </div>
  );
};

export default AdminCompaniesPage;
