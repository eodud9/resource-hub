import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getResource, updateResource } from "../api/resource";

import type { ResourceRequest } from "../types/resource";
import ResourceForm from "../components/ResourceForm";

const AdminResourceEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const resourceId = Number(id);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["resource", resourceId],
    queryFn: () => getResource(resourceId),
    enabled: Number.isFinite(resourceId),
  });

  const updateMutation = useMutation({
    mutationFn: (resource: ResourceRequest) => updateResource(resourceId, resource),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["resources"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["resource", resourceId],
      });

      navigate("/admin/resources");
    },
  });

  if (!Number.isFinite(resourceId)) return <div>Invalid resource.</div>;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No Resource</div>;

  return (
    <div className="py-10">
      <button
        onClick={() => navigate(`/admin/resources/${resourceId}`)}
        className="cursor-pointer text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
      >
        ← Back to resource Details
      </button>
      <div className="mt-6">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Resource</h1>
        <p className="mt-2 text-sm font-medium text-gray-600">Update the resource information.</p>
      </div>

      <ResourceForm
        initialValues={{
          name: data.name,
          description: data.description,
          type: data.type,
          quantity: data.quantity,
        }}
        submitLabel="Update"
        pendingLabel="Updating..."
        isPending={updateMutation.isPending}
        onSubmit={(resource) => updateMutation.mutate(resource)}
        onCancel={() => navigate(`/admin/resources/${resourceId}`)}
      />
    </div>
  );
};

export default AdminResourceEditPage;
