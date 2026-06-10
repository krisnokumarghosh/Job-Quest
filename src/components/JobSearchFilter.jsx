"use client";

import { Magnifier } from "@gravity-ui/icons";
import { InputGroup, Label, ListBox, Select, TextField } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const JobSearchFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = useCallback((key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, router, pathname]);

  const handleReset = () => {
    router.push(pathname);
  };

  return (
    <div className="container mx-auto mb-8 flex flex-wrap gap-3 items-end">
      {/* Search */}
      <div className="flex-1 min-w-[200px]">
        <TextField
          defaultValue={searchParams.get("search") || ""}
          onChange={(value) => updateFilter("search", value)}
        >
          <Label className="text-white/70 text-sm mb-1">Search</Label>
          <InputGroup>
            <InputGroup.Prefix>
              <Magnifier className="w-4 h-4 text-white/40" />
            </InputGroup.Prefix>
            <InputGroup.Input placeholder="Job title or company..." />
          </InputGroup>
        </TextField>
      </div>

      {/* Job Type */}
      <div className="min-w-[150px]">
        <Select
          value={searchParams.get("jobType") || null}
          onChange={(val) => updateFilter("jobType", val)}
          placeholder="All types"
        >
          <Label className="text-white/70 text-sm mb-1">Job Type</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map((type) => (
                <ListBox.Item key={type} id={type} textValue={type}>
                  {type}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* Category */}
      <div className="min-w-[150px]">
        <Select
          value={searchParams.get("category") || null}
          onChange={(val) => updateFilter("category", val)}
          placeholder="All categories"
        >
          <Label className="text-white/70 text-sm mb-1">Category</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {["Engineering", "Marketing", "Design", "Finance", "HR", "Sales", "Operations"].map((cat) => (
                <ListBox.Item key={cat} id={cat} textValue={cat}>
                  {cat}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* Location */}
      <div className="min-w-[150px]">
        <Select
          value={searchParams.get("location") || null}
          onChange={(val) => updateFilter("location", val)}
          placeholder="All locations"
        >
          <Label className="text-white/70 text-sm mb-1">Location</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {["Dhaka", "Chittagong", "Sylhet", "Remote", "Abroad"].map((loc) => (
                <ListBox.Item key={loc} id={loc} textValue={loc}>
                  {loc}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="px-5 py-2 bg-white/10 hover:bg-white/15 text-white/70 text-sm rounded-lg transition-colors"
      >
        Reset
      </button>
    </div>
  );
};

export default JobSearchFilter;