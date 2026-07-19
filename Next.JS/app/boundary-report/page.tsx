import { redirect } from "next/navigation";
import { chapters } from "@/content/chapters";

export default function BoundaryReportPage() {
  redirect(`/chapters/${chapters[0].slug}#boundary-audit`);
}
