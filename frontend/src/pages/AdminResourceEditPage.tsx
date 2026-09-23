import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getResource, updateResource } from "../api/resource";
import { useEffect, useState } from "react";
import type { ResourceRequest, ResourceType } from "../types/resource";

const AdminResourceEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const resourceId = Number(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ResourceType>("EQUIPMENT");
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["resources", resourceId],
    queryFn: () => getResource(resourceId),
  });

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setType(data.type);
      setQuantity(data.quantity);
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: (resource: ResourceRequest) => updateResource(resourceId, resource),
    onSuccess: () => {
      navigate("/admin/resources");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateMutation.mutate({ name, description, type, quantity });
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No Resource</div>;

  return (
    <div>
      <h1>Edit Resource</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="type">Type: </label>
        <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value as ResourceType)}>
          <option value="EQUIPMENT">Equipment</option>
          <option value="ROOM">Room</option>
          <option value="SERVER">Server</option>
          <option value="VEHICLE">Vehicle</option>
        </select>
        <label htmlFor="quantity">Quantity: </label>
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button type="submit" disabled={updateMutation.isPending}>
          Edit
        </button>
      </form>
    </div>
  );
};

export default AdminResourceEditPage;
