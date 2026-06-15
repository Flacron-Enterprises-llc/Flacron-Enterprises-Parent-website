import type { Metadata } from "next";
import { getApps } from "@/lib/apps-data";
import BookDemoForm from "./BookDemoForm";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Book a Demo — Flacron Enterprises",
  description: "Book a personalised demo with the Flacron Enterprises team. See any of our AI-powered products in action, tailored to your use case.",
};

export default async function BookDemoPage() {
  const apps = await getApps();
  return <BookDemoForm apps={apps} />;
}
