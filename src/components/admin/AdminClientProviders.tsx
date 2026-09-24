"use client";

import type { ReactNode } from "react";
import { ConfirmProvider } from "@/components/admin/ConfirmDialog";

export function AdminClientProviders({ children }: { children: ReactNode }) {
  return <ConfirmProvider>{children}</ConfirmProvider>;
}
