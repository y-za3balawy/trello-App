import React, { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import ActivityList from "./_component/activity-list";
import { checkSubscription } from "@/lib/subscription";
import Info from "../_components/info";


const ActivityPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-4" />
      <Suspense fallback={<ActivityList.Sekeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;