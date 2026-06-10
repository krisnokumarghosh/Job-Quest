"use client";

import { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  TextArea,
  Select,
  ListBox,
  FieldError,
  Description,
  Button,
  Switch,
  toast,
} from "@heroui/react";
import { CircleDollar, Persons, Boxes3, Briefcase } from "@gravity-ui/icons";
import { createJob } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";

// ── mock company data (replace with real session/API data) ──────────────────

const JOB_CATEGORIES = [
  "Software Engineering",
  "Design & Creative",
  "Marketing",
  "Sales",
  "Finance & Accounting",
  "Human Resources",
  "Customer Support",
  "Operations",
  "Legal",
  "Healthcare",
  "Education",
  "Other",
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const CURRENCIES = ["USD", "BDT", "EUR", "GBP", "AED", "CAD", "AUD", "INR"];

// ── reusable section wrapper ────────────────────────────────────────────────
function SectionCard({ icon, title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#1c1c1c] overflow-hidden">
      <div className="px-6 py-5 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg border-white/6 flex items-center justify-center text-white/50">
            {icon}
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">{title}</h2>
            {subtitle && (
              <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
      <div className="px-6 py-6">{children}</div>
    </div>
  );
}

// ── main page ───────────────────────────────────────────────────────────────
export default function PostJobForm({ company }) {
  const [isRemote, setIsRemote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const companyInfo =

  // if (!mockCompany.approved) {
  //   return (
  //     <div className="min-h-screen bg-[#141414] flex items-center justify-center p-6">
  //       <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-8 max-w-md text-center">
  //         <Boxes3
  //           width={32}
  //           height={32}
  //           className="text-yellow-400 mx-auto mb-4"
  //         />
  //         <h2 className="text-white font-semibold text-lg mb-2">
  //           Company Not Approved
  //         </h2>
  //         <p className="text-white/50 text-sm">
  //           Your company registration is pending approval. Youll be able to post
  //           jobs once your company is verified.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const data = {
      ...formData,
      isRemote,
      companyLogo: company.logoUrl,
      companyId: company._id,
      status: "active",
    };
    // TODO: call API
    const res = await createJob(data);

    if (res.insertedId) {
      setIsSubmitting(false);
      toast.success("Job Posted Successfully");
      redirect("/dashboard/recruiter");
    } else if (!res) {
      alert(res.error);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="o pr-8 py-10">
        {/* ── page header ── */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">Post a New Job</h1>
          <p className="text-sm text-white/40 mt-1">
            Fill in the details below to publish a job listing.
          </p>
        </div>

        <Form
          onSubmit={handleSubmit}
          validationBehavior="native"
          className="grid lg:grid-cols-2 gap-5"
        >
          {/* ────────────────────────────────────────────────────────────────
              SECTION 1 — Job Info
          ──────────────────────────────────────────────────────────────── */}
          <SectionCard
            icon={<Briefcase />}
            title="Job Info"
            subtitle="Basic details about the position"
          >
            <Fieldset>
              <Fieldset.Group className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Job Title */}
                <TextField isRequired name="jobTitle" className="sm:col-span-2">
                  <Label className="text-xs text-white/60 mb-1.5 block">
                    Job Title
                  </Label>
                  <Input
                    placeholder="e.g. Senior Frontend Developer"
                    className="bg-[#252525] border-white/1 text-white placeholder:text-white/25"
                  />
                  <FieldError className="text-xs text-red-400 mt-1" />
                </TextField>

                {/* Job Category */}
                <Select
                  isRequired
                  name="jobCategory"
                  fullWidth
                  placeholder="Select category"
                >
                  <Label className="text-xs text-white/60 mb-1.5 block">
                    Job Category
                  </Label>
                  <Select.Trigger className="bg-[#252525] border border-white/1 text-white">
                    <Select.Value className="text-white" />
                    <Select.Indicator className="text-white/40" />
                  </Select.Trigger>
                  <FieldError className="text-xs text-red-400 mt-1" />
                  <Select.Popover>
                    <ListBox>
                      {JOB_CATEGORIES.map((cat) => (
                        <ListBox.Item key={cat} id={cat} textValue={cat}>
                          {cat}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* Job Type */}
                <Select
                  isRequired
                  name="jobType"
                  fullWidth
                  placeholder="Select type"
                >
                  <Label className="text-xs text-white/60 mb-1.5 block">
                    Job Type
                  </Label>
                  <Select.Trigger className="bg-[#252525] border border-white/1 text-white">
                    <Select.Value className="text-white" />
                    <Select.Indicator className="text-white/40" />
                  </Select.Trigger>
                  <FieldError className="text-xs text-red-400 mt-1" />
                  <Select.Popover>
                    <ListBox>
                      {JOB_TYPES.map((type) => (
                        <ListBox.Item key={type} id={type} textValue={type}>
                          {type}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </Fieldset.Group>
            </Fieldset>
          </SectionCard>

          {/* ────────────────────────────────────────────────────────────────
              SECTION 2 — Salary & Location
          ──────────────────────────────────────────────────────────────── */}
          <SectionCard
            icon={<CircleDollar />}
            title="Salary & Location"
            subtitle="Compensation and where the role is based"
          >
            <Fieldset>
              <Fieldset.Group className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Salary Min */}
                <TextField name="salaryMin">
                  <Label className="text-xs text-white/60 mb-1.5 block">
                    Salary Min
                  </Label>
                  <Input
                    type="number"
                    placeholder="e.g. 50000"
                    className="bg-[#252525] border-white/10 text-white placeholder:text-white/25"
                  />
                </TextField>

                {/* Salary Max */}
                <TextField name="salaryMax">
                  <Label className="text-xs text-white/60 mb-1.5 block">
                    Salary Max
                  </Label>
                  <Input
                    type="number"
                    placeholder="e.g. 80000"
                    className="bg-[#252525] border-white/10 text-white placeholder:text-white/25"
                  />
                </TextField>

                {/* Currency */}
                <Select name="currency" fullWidth placeholder="Select currency">
                  <Label className="text-xs text-white/60 mb-1.5 block">
                    Currency
                  </Label>
                  <Select.Trigger className="bg-[#252525] border border-white/10 text-white">
                    <Select.Value className="text-white" />
                    <Select.Indicator className="text-white/40" />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {CURRENCIES.map((c) => (
                        <ListBox.Item key={c} id={c} textValue={c}>
                          {c}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* Application Deadline */}
                <TextField name="deadline">
                  <Label className="text-xs text-white/60 mb-1.5 block">
                    Application Deadline
                  </Label>
                  <Input
                    type="date"
                    className="bg-[#252525] border-white/10 text-white placeholder:text-white/25"
                  />
                </TextField>

                {/* Remote Toggle */}
                <div className="sm:col-span-2 flex items-center justify-between rounded-xl border border-white/8 bg-[#1f1f1f] px-4 py-3">
                  <div>
                    <p className="text-sm text-white font-medium">
                      Remote Position
                    </p>
                    <p className="text-xs text-white/40 mt-0.5">
                      Toggle on if no physical location required
                    </p>
                  </div>
                  <Switch
                    isSelected={isRemote}
                    onChange={setIsRemote}
                    aria-label="Remote position"
                  >
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                    <Switch.Content></Switch.Content>
                  </Switch>
                </div>

                {/* City */}
                {!isRemote && (
                  <>
                    <TextField name="city">
                      <Label className="text-xs text-white/60 mb-1.5 block">
                        City
                      </Label>
                      <Input
                        placeholder="e.g. Dhaka"
                        className="bg-[#252525] border-white/10 text-white placeholder:text-white/25"
                      />
                    </TextField>

                    <TextField name="country">
                      <Label className="text-xs text-white/60 mb-1.5 block">
                        Country
                      </Label>
                      <Input
                        placeholder="e.g. Bangladesh"
                        className="bg-[#252525] border-white/10 text-white placeholder:text-white/25"
                      />
                    </TextField>
                  </>
                )}
              </Fieldset.Group>
            </Fieldset>
          </SectionCard>

          {/* ────────────────────────────────────────────────────────────────
              SECTION 3 — Job Description
          ──────────────────────────────────────────────────────────────── */}
          <SectionCard
            icon={<Persons />}
            title="Job Description"
            subtitle="Describe the role in detail"
          >
            <Fieldset>
              <Fieldset.Group className="grid grid-cols-1 gap-4">
                {/* Responsibilities */}
                <TextField isRequired name="responsibilities">
                  <Label className="text-xs text-white/60 mb-1.5 block">
                    Responsibilities
                  </Label>
                  <TextArea
                    rows={5}
                    placeholder="List the key responsibilities of the role..."
                    className="bg-[#252525] border-white/10 text-white placeholder:text-white/25 resize-none"
                  />
                  <FieldError className="text-xs text-red-400 mt-1" />
                </TextField>

                {/* Requirements */}
                <TextField isRequired name="requirements">
                  <Label className="text-xs text-white/60 mb-1.5 block">
                    Requirements
                  </Label>
                  <TextArea
                    rows={5}
                    placeholder="List skills, experience, and qualifications required..."
                    className="bg-[#252525] border-white/10 text-white placeholder:text-white/25 resize-none"
                  />
                  <FieldError className="text-xs text-red-400 mt-1" />
                </TextField>

                {/* Benefits (optional) */}
                <TextField name="benefits">
                  <Label className="text-xs text-white/60 mb-1.5 block">
                    Benefits{" "}
                    <span className="text-white/30 font-normal">
                      (optional)
                    </span>
                  </Label>
                  <TextArea
                    rows={4}
                    placeholder="Health insurance, remote work options, stock options..."
                    className="bg-[#252525] border-white/10 text-white placeholder:text-white/25 resize-none"
                  />
                </TextField>
              </Fieldset.Group>
            </Fieldset>
          </SectionCard>

          {/* ────────────────────────────────────────────────────────────────
              SECTION 4 — Company (auto-filled)
          ──────────────────────────────────────────────────────────────── */}
          <SectionCard
            icon={<Boxes3 />}
            title="Company"
            subtitle="Auto-filled from your registered company"
          >
            <div className="flex items-center gap-4 rounded-xl border border-white/8 bg-[#1f1f1f] px-4 py-3">
              <div className="w-10 h-10 rounded-lg bg-white/6 flex items-center justify-center text-white/50 text-sm font-semibold">
                {company.companyName}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {company.companyName}
                </p>
                <p className="text-xs text-white/40">{company.category}</p>
              </div>
              <span className="shrink-0 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                Approved
              </span>
            </div>
            {/* hidden field so it's part of the FormData */}
            <input type="hidden" name="company" value={company.companyName} />
          </SectionCard>

          {/* ────────────────────────────────────────────────────────────────
              SUBMIT
          ──────────────────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="ghost"
              className="text-white/50 hover:text-white"
              onPress={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isPending={isSubmitting}
              className="bg-white text-black font-semibold px-6 rounded-xl hover:bg-white/90 transition-colors"
            >
              {isSubmitting ? "Publishing..." : "Publish Job"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
