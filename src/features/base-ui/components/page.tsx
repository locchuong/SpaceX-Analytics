import * as React from "react";

import { cn } from "~/lib/tailwind";

const Page = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative overflow-hidden duration-700 ease-out animate-in fade-in-0", className)} {...props} />
));

Page.displayName = "Page";

const Section = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, ...props }, ref) => (
  <section ref={ref} className={cn("relative block h-screen py-10", className)} {...props} />
));

Section.displayName = "Section";

const SectionBackground = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(({ className, alt, ...props }, ref) => (
  <img ref={ref} alt={alt} className={cn("relative h-full w-full object-cover opacity-80", className)} {...props} />
));

SectionBackground.displayName = "SectionBackground";

const SectionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("absolute z-10", className)} {...props} />
));

SectionContent.displayName = "SectionContent";

export { Page, Section, SectionBackground, SectionContent };
