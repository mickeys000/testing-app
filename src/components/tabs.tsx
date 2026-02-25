"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { cn } from "../lib/utils";

const Tabs = ({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) => {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      orientation={orientation}
      className={cn(
        "flex",
        orientation === "vertical" ? "h-full flex-row" : "flex-col",
        className,
      )}
      {...props}
    />
  );
};
Tabs.displayName = "Tabs";

const TabsList = ({
  className,
  orientation,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & {
  orientation?: "horizontal" | "vertical";
}) => {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        orientation === "vertical"
          ? "border-os-mist flex h-full w-62.5 max-w-full shrink-0 flex-col gap-0 overflow-y-auto border-r-2 p-4"
          : "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-0.75",
        className,
      )}
      {...props}
    />
  );
};
TabsList.displayName = "TabsList";

const TabsTrigger = ({
  className,
  orientation,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  orientation?: "horizontal" | "vertical";
}) => {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "cursor-pointer",
        orientation === "vertical"
          ? [
              "group",
              "data-[state=active]:text-os-link",
              "hover:bg-os-mist",
              "flex",
              "h-auto",
              "w-full",
              "items-center",
              "justify-start",
              "gap-2",
              "rounded-none",
              "border-none",
              "bg-transparent",
              "px-0",
              "py-1",
              "text-left",
              "text-sm",
              "font-normal",
              "duration-75",
              "focus-visible:ring-0",
              "focus-visible:outline-none",
            ]
          : [
              "hover:bg-os-clouds",
              "border-b-[#DFDDDB]",
              "data-[state=active]:bg-os-clouds",
              "data-[state=active]:text-shadow-color-black",
              "data-[state=active]:text-shadow-[0.5px_0px_0.5px_rgba(0,0,0,1)]",
              "focus-visible:border-ring",
              "focus-visible:ring-ring/50",
              "focus-visible:outline-ring",
              "dark:data-[state=active]:border-input",
              "dark:data-[state=active]:bg-input/30",
              "text-foreground",
              "dark:text-muted-foreground",
              "inline-flex",
              "h-[calc(100%-1px)]",
              "flex-1",
              "items-center",
              "justify-center",
              "gap-1.5",
              "px-2",
              "py-1",
              "text-sm",
              "font-medium",
              "whitespace-nowrap",
              "transition-[color,box-shadow]",
              "focus-visible:ring-[3px]",
              "focus-visible:outline-1",
              "disabled:pointer-events-none",
              "disabled:opacity-50",
              "[&_svg]:pointer-events-none",
              "[&_svg]:shrink-0",
              "[&_svg:not([class*='size-'])]:size-4",
            ],
        className,
      )}
      {...props}
    >
      {orientation === "vertical" ? (
        <>
          <div className="flex w-5 justify-center" aria-hidden="true">
            {React.Children.toArray(children)[0]}
          </div>
          <div className="text-sm group-data-[state=active]:font-bold">
            {React.Children.toArray(children)[1] ||
              React.Children.toArray(children)[0]}
          </div>
        </>
      ) : (
        children
      )}
    </TabsPrimitive.Trigger>
  );
};
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) => {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("h-full w-full flex-1 outline-none", className)}
      {...props}
    />
  );
};
TabsContent.displayName = "TabsContent";

const TabsSection = ({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("mb-4", className)}>
      <h2 className="text-os-disabled-foreground mb-2 text-xs">{title}</h2>
      <div className="flex flex-col gap-0">{children}</div>
    </div>
  );
};
TabsSection.displayName = "TabsSection";

export { Tabs, TabsContent, TabsList, TabsSection, TabsTrigger };
