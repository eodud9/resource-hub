import { useQuery } from "@tanstack/react-query";
import { getResources } from "../api/resource";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { ResourceType } from "../types/resource";

export const ResourcePage = () => {
  const [resourceType, setResourceType] = useState<ResourceType | "ALL">("ALL");
  const { data, isLoading, error } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  if (!data) return <div>No Resource!</div>;

  const filteredResource = data.filter((d) => (resourceType === "ALL" ? true : d.type === resourceType));

  const resourceTypes: (ResourceType | "ALL")[] = ["ALL", "EQUIPMENT", "ROOM", "SERVER", "VEHICLE"];

  return (
    <div className="py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Resources</h1>
        <p className="mt-2 text-sm text-gray-500">Find and reserve available resources</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {resourceTypes.map((btn) => (
          <button
            key={btn}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${resourceType === btn ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-600 hover:bg-gray-100"}`}
            onClick={() => setResourceType(btn)}
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredResource.map((d) => (
          <div
            key={d.id}
            className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow duration-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <h2 className="font-semibold text-gray-900">{d.name}</h2>
              <p className="mt-1 text-xs font-medium text-gray-500">{d.type}</p>
            </div>
            <p className="mt-4 text-sm text-gray-500">{d.description}</p>
            <span
              className={
                d.status === "AVAILABLE"
                  ? "mt-4 inline-block rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700"
                  : "mt-4 inline-block rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700"
              }
            >
              {d.status}
            </span>

            <Link
              to={`/resources/${d.id}`}
              className="mt-6 inline-block text-sm font-medium text-gray-900 transition-colors duration-200 hover:text-gray-500"
            >
              View →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
