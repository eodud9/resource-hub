import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createResource, getResources } from "../api/resource";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { ResourceType } from "../types/resource";

const AdminResourcePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ResourceType>("EQUIPMENT");
  const [quantity, setQuantity] = useState(1);

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createMutation.mutate({ name, description, type, quantity });
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No Resources</div>;

  return (
    <div>
      <ul>
        {data.map((d) => {
          return (
            <li key={d.id}>
              <Link to={`/admin/resources/${d.id}`}>
                <h1>
                  {d.name} - {d.status}
                </h1>
              </Link>
              <p>{d.description}</p>
            </li>
          );
        })}
      </ul>
      <h1>Create Resource</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          placeholder="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          placeholder="Description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label htmlFor="type">Type: </label>
        <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value as ResourceType)} required>
          <option value="EQUIPMENT">Equipment</option>
          <option value="ROOM">Room</option>
          <option value="SERVER">Server</option>
          <option value="VEHICLE">Vehicle</option>
        </select>
        <label htmlFor="quantity">Quantity: </label>
        <input
          type="number"
          placeholder="Quantity"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          min={1}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AdminResourcePage;
