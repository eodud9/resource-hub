import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createResource, getResources } from "../api/resource";
import AdminResourceTable from "../components/AdminResourceTable";
import ResourceForm from "../components/ResourceForm";

const AdminResourcePage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
  });

  const createMutation = useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resources"],
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No resources available.</div>;

  return (
    <div className="py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Resource Management</h1>
        <p className="mt-2 text-sm text-gray-500">Manage resources available for reservation.</p>
      </div>

      <AdminResourceTable resources={data} />

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Create Resource</h1>
          <p className="mt-1 text-sm text-gray-500">Add a new resource available for reservation.</p>
        </div>
        <ResourceForm
          onSubmit={(resource) => createMutation.mutate(resource)}
          submitLabel="Create"
          pendingLabel="Creating..."
          isPending={createMutation.isPending}
        />
      </div>
    </div>
  );
};

export default AdminResourcePage;
