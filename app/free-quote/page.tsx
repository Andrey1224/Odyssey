import { redirect } from "next/navigation";

export default function FreeQuotePage() {
  redirect("/contact?intent=quote");
}
