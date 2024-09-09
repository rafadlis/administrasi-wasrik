"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ProgressValueCard({
  title,
  value,
  description,
  progressValue,
  className,
}: {
  title: string;
  value: number;
  description: string;
  progressValue: number | undefined | null;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{description}</div>
      </CardContent>
      {progressValue || progressValue === 0 ? (
        <CardFooter>
          <Progress value={progressValue} />
        </CardFooter>
      ) : null}
    </Card>
  );
}
