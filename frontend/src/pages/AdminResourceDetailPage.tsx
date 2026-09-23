import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteResource, getResource } from "../api/resource";

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
    </div>
  );
};

export default AdminResourceDetailPage;
