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

      <form action="" onSubmit={handleSubmit} className="mt-6 border border-gray-200 bg-white rounded-lg p-6">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="w-full">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 outline-none transition-colors duration-200 focus:border-gray-600"
            />
          </div>
          <div className="w-full">
            <label htmlFor="type" className="text-sm font-medium text-gray-700 block">
              Type
            </label>
            <select
              name="type"
              id="type"
              value={type}
              required
              onChange={(e) => setType(e.target.value as ResourceType)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 outline-none transition-colors duration-200 focus:border-gray-600"
            >
              <option value="EQUIPMENT">Equipment</option>
              <option value="ROOM">Room</option>
              <option value="SERVER">Server</option>
              <option value="VEHICLE">Vehicle</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <label htmlFor="description" className="text-sm font-medium text-gray-700 block">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            rows={3}
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 outline-none transition-colors duration-200 focus:border-gray-600"
          />
        </div>
        <div className="mt-6">
          <label htmlFor="quantity" className="text-sm font-medium text-gray-700 block">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            placeholder="Quantity"
            value={quantity}
            min={1}
            required
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 outline-none transition-colors duration-200 focus:border-gray-600"
          />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate(`/admin/resources/${resourceId}`)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-500 text-sm font-medium transition-colors duration-200 cursor-pointer hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {updateMutation.isPending ? "Updating..." : "Update Resource"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminResourceEditPage;
