import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteResource, getResource } from "../api/resource";
import axios from "axios";
import type { ErrorResponse } from "../types/api";

const AdminResourceDetailPage = () => {
  const { id } = useParams();
  const resourceId = Number(id);
  const { data, isLoading, error } = useQuery({
    queryKey: ["resources", resourceId],
    queryFn: () => getResource(resourceId),
  });
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      navigate("/admin/resources");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No Resource</div>;

  function handleDelete() {
    deleteMutation.mutate(resourceId);
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <button onClick={() => navigate(`/admin/resources/${id}/edit`)}>Update</button>
      <button onClick={handleDelete}>Delete</button>
      {deleteMutation.error && (
        <p>
          {axios.isAxiosError<ErrorResponse>(deleteMutation.error)
            ? deleteMutation.error.response?.data.message
            : "자원 삭제 중 오류가 발생했습니다."}
        </p>
      )}
    </div>
  );
};

export default AdminResourceDetailPage;
