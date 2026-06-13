"use client";

import { submitApplication } from "@/lib/actions/applications";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import React, { useState } from "react";

const JobApply = ({ job, applicant }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const submissionData = {
      companyName: job?.company,
      jobId: job?._id,
      jobTitle: job?.jobTitle,
      jobCategory: job?.jobCategory,
      applicantId: applicant?.id,
      applicantName: applicant?.name,
      applicantEmail: applicant?.email,
      ...data,
    };
    console.log(submissionData);
    const submit = await submitApplication(submissionData);

    await new Promise((r) => setTimeout(r, 800));

    if (submit.insertedId) {
      setIsSubmitting(false);
      setSubmitted(true);
      alert("application submitted successfully");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Application Submitted!
          </h2>
          <p className="text-gray-500 mb-1">
            You applied for{" "}
            <span className="font-medium text-gray-700">{job?.title}</span>
          </p>
          <p className="text-gray-500 text-sm">at {job?.company?.name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Job Info Header */}
        <div className=" rounded-2xl bg-[#151516] shadow-sm border  p-6 mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#5C53FE] mb-1">
            Applying for
          </p>
          <h1 className="text-2xl font-bold text-white">
            {job?.jobCategory ?? "Job Title"}
          </h1>
          <p className="text-white/60 mt-1">
            {job?.company ?? "Company"} &middot; {job?.location ?? "Location"}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {job?.type && (
              <span className="text-xs bg-blue-50 text-blue-600 font-medium px-3 py-1 rounded-full">
                {job.type}
              </span>
            )}
            {job?.salary && (
              <span className="text-xs bg-green-50 text-green-600 font-medium px-3 py-1 rounded-full">
                {job.salary}
              </span>
            )}
          </div>
        </div>

        {/* Applicant Info */}
        <div className=" rounded-2xl bg-[#151516] shadow-sm border  p-6 mb-6">
          <p className="text-sm font-semibold text-white mb-3">Applying as</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
              {applicant?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div>
              <p className="font-medium text-white/90">
                {applicant?.name ?? "Your Name"}
              </p>
              <p className="text-sm text-white/60">
                {applicant?.email ?? "your@email.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className=" rounded-2xl bg-[#151516] shadow-sm border p-6">
          <h2 className="text-lg font-bold text-white mb-6">
            Application Details
          </h2>

          <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Resume Link - Required */}
            <TextField
              name="resumeLink"
              isRequired
              className="flex flex-col gap-1"
            >
              <Label className="text-sm font-medium text-white/60">
                Resume Link <span className="text-red-500">*</span>
              </Label>
              <Input
                type="url"
                placeholder="https://drive.google.com/your-resume"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <Description className="text-xs text-gray-400">
                Google Drive, Dropbox, or any public link to your resume (PDF
                preferred)
              </Description>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            <hr className="border-gray-100" />
            <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
              Optional Info
            </p>

            {/* Portfolio */}
            <TextField name="portfolio" className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-white/60">
                Portfolio / LinkedIn
              </Label>
              <Input
                type="url"
                placeholder="https://yourportfolio.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <Description className="text-xs text-gray-400">
                Your personal site, GitHub, or LinkedIn profile
              </Description>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Expected Salary */}
            <TextField name="expectedSalary" className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-white/60">
                Expected Salary
              </Label>
              <Input
                type="text"
                placeholder="e.g. $60,000/year or negotiable"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Cover Note */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-white/60">
                Cover Note
              </label>
              <TextArea
                name="coverNote"
                placeholder="Briefly introduce yourself or mention why you're a great fit..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              />
              <p className="text-xs text-gray-400">
                Keep it short — 2 to 3 sentences is enough
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="flex-1 bg-white  text-[#1A1C1C]  rounded-xl transition"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
              <Button type="reset" variant="outline" className="rounded-xl">
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default JobApply;
