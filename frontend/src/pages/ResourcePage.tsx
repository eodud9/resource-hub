import { useQuery } from "@tanstack/react-query";
import { getResources } from "../api/resource";
import { useState } from "react";
import type { ResourceType } from "../types/resource";
import ResourceCard from "../components/ResourceCard";

const RESOURCE_TYPES: (ResourceType | "ALL")[] = ["ALL", "EQUIPMENT", "ROOM", "SERVER", "VEHICLE"];

export const ResourcePage = () => {
  const [resourceType, setResourceType] = useState<ResourceType | "ALL">("ALL");
  const { data, isLoading, error } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  if (!data) return null;

  const filteredResources = data.filter((resource) => resourceType === "ALL" || resource.type === resourceType);

  return (
    <div className="py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Resources</h1>
        <p className="mt-2 text-sm text-gray-500">Find and reserve available resources</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {RESOURCE_TYPES.map((btn) => (
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
        {filteredResources.length === 0 && <p className="text-sm font-medium text-gray-600">No resources found.</p>}
        {filteredResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};
