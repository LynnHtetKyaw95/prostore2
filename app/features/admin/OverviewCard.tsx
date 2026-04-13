import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewCardProps {
  children?: React.ReactNode;
  className?: string;
  title: string;
  icon?: React.ElementType;
}

const OverviewCard = ({
  children,
  className,
  title,
  icon: Icon,
}: OverviewCardProps) => {
  return (
    <Card className={`mt-4 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon />}
      </CardHeader>
      <CardContent>
        <div>{children}</div>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
