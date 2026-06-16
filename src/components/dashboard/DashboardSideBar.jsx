import { getUserSession } from "@/lib/core/session";
import {
  Bars,
  CirclePlus,
  Envelope,
  Gear,
  House,
  Briefcase,
  Person,
  Factory,
  LayoutSideContentLeft,
  LayoutHeaderSideContent,
  Bookmark,
  FileText,
  CreditCard,
  Persons,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

const DashboardSideBar = async () => {
  const user = await getUserSession();

  const recruiterNavLinks = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Briefcase, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    {
      icon: CirclePlus,
      href: "/dashboard/recruiter/jobs/new",
      label: "Create Job",
    },
    {
      icon: Factory,
      href: "/dashboard/recruiter/company",
      label: "Company Profile",
    },
    {
      icon: Envelope,
      href: "/dashboard/recruiter/messages",
      label: "Messages",
    },
    { icon: Person, href: "/dashboard/recruiter/profile", label: "Profile" },
    { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
  ];

  const seekerNavLinks = [
    {
      icon: LayoutHeaderSideContent,
      href: "/dashboard/seeker",
      label: "Dashboard",
    },
    { icon: Briefcase, href: "/dashboard/seeker/jobs", label: "Jobs" },
    {
      icon: Bookmark,
      href: "/dashboard/seeker/saved-jobs",
      label: "Saved Jobs",
    },
    {
      icon: FileText,
      href: "/dashboard/seeker/applications",
      label: "Applications",
    },
    { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
  ];

  const adminNavLinks = [
    {
      icon: LayoutHeaderSideContent,
      href: "/dashboard/admin",
      label: "Dashboard",
    },
    { icon: Persons, href: "/dashboard/admin/users", label: "Users" },
    {
      icon: Factory,
      href: "/dashboard/admin/companies",
      label: "Companies",
    },
    {
      icon: Briefcase,
      href: "/dashboard/admin/jobs",
      label: "Jobs",
    },
    { icon: CreditCard, href: "/dashboard/admin/payment", label: "Payments" },
    { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
  ];

  const navLinksMap = {
    seeker: seekerNavLinks,
    recruiter: recruiterNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinksMap[user?.role || "seeker"];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div>
      <aside className="hidden w-64 h-full shrink-0 border-r-2 border-default p-4 lg:block ">
        <Link href={"/"} className="block">
          <h3 className="text-[28px] my-8 font-semibold">JobQuest</h3>
        </Link>
        {navContent}
      </aside>
      <Drawer>
        <Button className="lg:hidden bg-transparent mt-10">
          <LayoutSideContentLeft />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading className="text-[32px] my-8">
                  JobQuest
                </Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
};

export default DashboardSideBar;
