"use client";

import StatsSection from "@/components/dashboard/StatsSection";
import { authClient } from "@/lib/auth-client";
import { CircleCheck, File, Persons, Thunderbolt } from "@gravity-ui/icons";
import React from "react";

const RecruiterPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const recruiterStats = [
    { label: "Total Job Posts", value: "48", icon: <File/> },
    { label: "Total Applicants", value: "1,284", icon: <Persons/> },
    { label: "Active Jobs", value: "18", icon: <Thunderbolt/> },
    { label: "Jobs Closed", value: "32", icon: <CircleCheck/> },
  ];

  return (
    <div className="mt-10">
      <h2 className="font-medium text-2xl">Welcome Back, {user?.name}</h2>
      <StatsSection statsData={recruiterStats}/>
    </div>
  );
};

export default RecruiterPage;
