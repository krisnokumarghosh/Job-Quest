import JobApply from "@/components/JobApply";
import { getApplicationsByApplicants } from "@/lib/api/applications";
import { getJobsById } from "@/lib/api/jobs";
import { getPlanById } from "@/lib/api/plans";
import { getUserSession } from "@/lib/core/session";
import { TriangleExclamation } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import { redirect } from "next/navigation";
import React from "react";

const JobApplyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();
  console.log(user);

  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="mt-12  lg:mt-30 flex justify-center items-center">
        <Card className="w-125 py-6">
          <div className=" bg-white/6 w-15 h-15 mx-auto flex justify-center items-center rounded-2xl">
            <TriangleExclamation
              aria-label="Dollar sign icon"
              className="text-primary size-6 "
              role="img"
            />
          </div>
          <Card.Header>
            <Card.Title className="text-center text-2xl mt-4 leading-8">
              Only Job Seeker Can Apply For This Position.
            </Card.Title>
            <Card.Description className="text-center text-[17px] mt-4">
              Please sign in with a seeker account to proceed.
            </Card.Description>
          </Card.Header>
          <Card.Footer className="mt-4 mx-auto"></Card.Footer>
        </Card>
      </div>
    );
  }

  const applications = await getApplicationsByApplicants(user?.id);

  

  const plan = await getPlanById(user?.plan || "seeker_free")
  console.log(plan);
  

  const job = await getJobsById(id);

  return (
       <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Usage Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-white/50">Monthly Applications</p>
              <p className="text-2xl font-bold text-white">
                {applications.length}
                <span className="text-white/30 font-normal text-lg"> / {plan.maxApplicationsPerMonth}</span>
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
              ${applications.length < plan.maxApplicationsPerMonth
                ? 'bg-primary/10 text-primary'
                : 'bg-red-500/10 text-red-400'}`}>
              {plan.maxApplicationsPerMonth - applications.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500
                ${(applications.length / plan.maxApplicationsPerMonth) >= 1
                  ? 'bg-red-400'
                  : (applications.length / plan.maxApplicationsPerMonth) >= 0.66
                  ? 'bg-yellow-400'
                  : 'bg-primary'}`}
              style={{ width: `${Math.min((applications.length / plan.maxApplicationsPerMonth) * 100, 100)}%` }}
            />
          </div>

          <p className="text-xs text-white/40 mt-2">
            {applications.length < plan.maxApplicationsPerMonth
              ? `${plan.maxApplicationsPerMonth - applications.length} application${plan.maxApplicationsPerMonth - applications.length !== 1 ? 's' : ''} remaining this month`
              : 'You have used all your applications for this month'}
          </p>
        </div>

        {/* Limit Reached */}
        {applications.length >= plan.maxApplicationsPerMonth && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <TriangleExclamation className="text-red-400 size-6" />
            </div>
            <h3 className="font-semibold text-red-400 mb-1">Application Limit Reached</h3>
            <p className="text-sm text-white/50">
              You have used all <span className="font-medium text-white/70">{plan.maxApplicationsPerMonth}</span> applications for this month.
              Upgrade your plan to apply to more jobs.
            </p>
          </div>
        )}

        {/* Form */}
        {applications.length < plan.maxApplicationsPerMonth && (
          <JobApply applicant={user} job={job} />
        )}

      </div>
    </div>
  );
};

export default JobApplyPage;
