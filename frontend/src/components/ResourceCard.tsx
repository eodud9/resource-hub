import { Link } from "react-router-dom";
import type { ResourceResponse } from "../types/resource";

interface ResourceCardProp {
  resource: ResourceResponse;
}

const ResourceCard = ({ resource }: ResourceCardProp) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start justify-between">
        <h2 className="font-semibold text-gray-900">{resource.name}</h2>
        <p className="mt-1 text-xs font-medium text-gray-500">{resource.type}</p>
      </div>
      <p className="mt-4 text-sm text-gray-500">{resource.description}</p>
      <span
        className={
          resource.status === "AVAILABLE"
            ? "mt-4 inline-block rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700"
            : "mt-4 inline-block rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700"
        }
      >
        {resource.status}
      </span>

      <Link
        to={`/resources/${resource.id}`}
        className="mt-6 inline-block text-sm font-medium text-gray-900 transition-colors duration-200 hover:text-gray-500"
      >
        View →
      </Link>
    </div>
  );
};

export default ResourceCard;
