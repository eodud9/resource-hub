import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteResource, getResource } from "../api/resource";
import axios from "axios";
import type { ErrorResponse } from "../types/api";

const AdminResourceDetailPage = () => {
  const { id } = useParams();
  const resourceId = Number(id);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["resource", resourceId],
    queryFn: () => getResource(resourceId),
    enabled: Number.isFinite(resourceId),
  });

  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: deleteResource,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["resource"],
      });
      navigate("/admin/resources");
    },
  });

  if (!Number.isFinite(resourceId)) {
    return <div>Invalid resource.</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No resource available.</div>;

  function handleDelete() {
    deleteMutation.mutate(resourceId);
  }

  return (
    <div className="py-10">
      <button
        onClick={() => navigate("/admin/resources")}
        className="cursor-pointer text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-900"
      >
        ← Back to Resource Management
      </button>
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">{data.name}</h1>
            <p className="mt-1 text-sm font-medium text-gray-500">{data.type}</p>
          </div>
          <span
            className={
              data.status === "AVAILABLE"
                ? "rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
                : "rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600"
            }
          >
            {data.status}
          </span>
        </div>
        <p className="mt-6 text-sm leading-6 text-gray-600">{data.description}</p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={() => navigate(`/admin/resources/${resourceId}/edit`)}
            className="cursor-pointer rounded-lg bg-gray-900 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-700 border-gray-300 px-4 py-2"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="cursor-pointer rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors duration-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
        {deleteMutation.isError && (
          <p className="mt-4 text-right text-sm font-medium text-red-600">
            {axios.isAxiosError<ErrorResponse>(deleteMutation.error)
              ? deleteMutation.error.response?.data.message
              : "자원 삭제 중 오류가 발생했습니다."}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminResourceDetailPage;
