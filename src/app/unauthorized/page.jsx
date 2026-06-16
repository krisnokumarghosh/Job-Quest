// app/unauthorized/page.jsx

import { getUserSession } from "@/lib/core/session";
import { Lock } from "@gravity-ui/icons";
import Link from "next/link";


export default async function UnauthorizedPage() {
    const user = await getUserSession();
    const dashboardRoles = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
    admin: "/dashboard/admin"
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">

        <div className="w-20 h-20 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-neutral-600" />
        </div>

        <p className="text-xs tracking-widest text-neutral-600 uppercase mb-2">
          403
        </p>
        <h1 className="text-2xl font-medium text-neutral-100 mb-3">
          Access Denied
        </h1>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          You don&apos;t have permission to view this page. Please contact your
          administrator or return to a safe place.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href={dashboardRoles[user?.role || "/"]}
            className="flex items-center gap-2 bg-white hover:bg-white/90 border  text-black text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/signin"
           className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-100 text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Switch Account
          </Link>
        </div>

      </div>
    </div>
  );
}