import { ServiceCard } from "./ServiceCard";
import { BlogData } from "../../../App";

interface PropsType {
  data: BlogData[];
}
export function ServiceGrid({ data }: PropsType) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((service, index) => (
        <ServiceCard data={service} key={index} {...service} />
      ))}
    </div>
  );
}
