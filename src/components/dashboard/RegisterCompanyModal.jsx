"use client";

import { useState, useRef } from "react";
import {
  Modal,
  Button,
  TextField,
  Label,
  Input,
  Select,
  Surface,
  Form,
  ListBox,
  TextArea,
} from "@heroui/react";
import Image from "next/image";
import { Alarm, MapPin, Picture, Plus } from "@gravity-ui/icons";
import { createCompany } from "@/lib/actions/companies";

const INDUSTRY_OPTIONS = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Media & Entertainment",
  "Real Estate",
  "Transportation",
  "Other",
];

const EMPLOYEE_RANGES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY; // set in .env.local

export default function RegisterCompanyModal() {
  // const [form, setForm] = useState({
  //   companyName: "",
  //   industry: "Technology",
  //   websiteUrl: "",
  //   location: "",
  //   employeeRange: "1-10 employees",
  //   description: "",
  //   logoUrl: "",
  // });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // const handleChange = (field) => (e) => {
  //   setForm((prev) => ({ ...prev, [field]: e.target.value }));
  // };

  const handleLogoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (
      ![
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/webp",
      ].includes(file.type)
    ) {
      setUploadError("Please select a valid image file (PNG, JPG, GIF, WEBP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be under 5MB.");
      return;
    }

    setUploadError("");
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const imgbbApiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!res.ok) throw new Error("ImgBB upload failed");
    const data = await res.json();
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    // console.log(formData);

    setSubmitting(true);
    try {
      let logoUrl = Form.logoUrl;

      if (logoFile) {
        setUploading(true);
        logoUrl = await uploadToImgBB(logoFile);
        setUploading(false);
      }

      const payload = { ...formData, logoUrl };

      const company = await createCompany(payload);

      console.log("Registering company:", payload);
    } catch (err) {
      console.error(err);
      setUploadError("Logo upload failed. Please try again.");
    } finally {
      setSubmitting(false);
      setUploading(false);
      alert("company created successfully");
    }
  };

  return (
    <Modal>
      <Button className="bg-white text-[#1A1C1C] font-semibold">
        <Plus /> Register a company
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg w-full">
            <Modal.CloseTrigger />

            {/* Header */}
            <Modal.Header>
              <Modal.Heading>Register New Company</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Enter your business details to start hiring on HireLoop.
              </p>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="p-6">
              <Surface variant="default">
                <Form
                  id="register-company-form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  {/* Row 1: Company Name + Industry */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField
                      isRequired
                      className="w-full"
                      name="companyName"
                      variant="secondary"
                    >
                      <Label>Company Name</Label>
                      <Input
                        className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="e.g. Acme Corp"
                        // onChange={handleChange("companyName")}
                      />
                    </TextField>

                    <div className="flex flex-col gap-1.5">
                      <Select
                        isRequired
                        name="category"
                        placeholder="Select one"
                      >
                        <Label className="text-sm font-medium text-foreground">
                          {" "}
                          Industry / Category
                        </Label>
                        <Select.Trigger className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {INDUSTRY_OPTIONS.map((opt) => (
                              <ListBox.Item key={opt} id={opt} textValue={opt}>
                                {opt}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>
                  </div>

                  {/* Row 2: Website URL + Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <TextField isRequired>
                        <Label className="text-sm font-medium text-foreground">
                          Website URL
                        </Label>
                        <div className="flex items-center rounded-md border border-border bg-secondary overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                          <span className="px-3 py-2 text-sm text-muted border-r border-border bg-muted/20 shrink-0">
                            https://
                          </span>
                          <Input
                            type="text"
                            name="websiteURL"
                            placeholder="www.company.com"
                            // onChange={handleChange("websiteUrl")}
                            className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none"
                          />
                        </div>
                      </TextField>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <TextField isRequired>
                        <Label className="text-sm font-medium text-foreground">
                          Location
                        </Label>
                        <div className="flex items-center rounded-md border border-border bg-secondary overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                          <MapPin className="size-4 text-muted mx-3 shrink-0" />
                          <Input
                            type="text"
                            name="location"
                            placeholder="City, Country"
                            // onChange={handleChange("location")}
                            className="flex-1 bg-transparent py-2 pr-3 text-sm text-foreground focus:outline-none"
                          />
                        </div>
                      </TextField>
                    </div>
                  </div>

                  {/* Row 3: Employee Count + Company Logo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Select
                        isRequired
                        name="employeeRange"
                        placeholder="Select one"
                      >
                        <Label className="text-sm font-medium text-foreground">
                          {" "}
                          Employee Count Range
                        </Label>
                        <Select.Trigger className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {EMPLOYEE_RANGES.map((opt) => (
                              <ListBox.Item key={opt} id={opt} textValue={opt}>
                                {opt}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label className="text-sm font-medium text-foreground">
                        Company Logo
                      </Label>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-3 rounded-md border-2 border-dashed border-border bg-secondary px-3 py-2.5 text-left hover:border-accent hover:bg-accent/5 transition-colors"
                      >
                        {logoPreview ? (
                          <>
                            <Image
                              src={logoPreview}
                              height={36}
                              width={36}
                              alt="Logo preview"
                              className="size-9 rounded-md object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {logoFile?.name}
                              </p>
                              <p className="text-xs text-muted">
                                Click to change
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex size-9 items-center justify-center rounded-md border border-border bg-muted/20 shrink-0">
                              <Picture className="size-4 text-muted" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                Upload image
                              </p>
                              <p className="text-xs text-muted">
                                PNG, JPG up to 5MB
                              </p>
                            </div>
                          </>
                        )}
                      </button>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                        className="hidden"
                        onChange={handleLogoSelect}
                      />
                      {uploadError && (
                        <p className="text-xs text-red-500">{uploadError}</p>
                      )}
                    </div>
                  </div>

                  {/* Brief Description */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium text-foreground">
                      Brief Description
                    </Label>
                    <TextArea
                      rows={4}
                      placeholder="Tell us about your company's mission and culture..."
                      // onChange={handleChange("description")}
                      className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    />
                  </div>
                </Form>
              </Surface>
            </Modal.Body>

            {/* Footer */}
            <Modal.Footer>
              <Button slot="close" variant="outline" type="button">
                Cancel
              </Button>
              <Button
                type="submit"
                slot="close"
                className="bg-white text-[#131314] "
                form="register-company-form"
                // disabled={submitting || !form.companyName.trim()}
              >
                {uploading
                  ? "Uploading logo..."
                  : submitting
                    ? "Registering..."
                    : "Register Company"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
