import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware wrappers around Next.js' navigation APIs.
// Use these instead of the ones from `next/navigation` anywhere
// that needs to stay consistent with the current locale prefix.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
