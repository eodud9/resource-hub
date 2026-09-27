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
      setName("");
      setDescription("");
      setQuantity(1);
      setType("EQUIPMENT");
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
    <div className="py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Resource Management</h1>
        <p className="mt-2 text-sm text-gray-500">Manage resources available for reservation.</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-5 py-3 font-medium text-gray-600">Name</th>
              <th className="px-5 py-3 font-medium text-gray-600">Type</th>
              <th className="px-5 py-3 font-medium text-gray-600">Quantity</th>
              <th className="px-5 py-3 font-medium text-gray-600">Status</th>
              <th className="px-5 py-3 font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id} className="border-b border-gray-100 last:border-b-0">
                <td className="px-5 py-4 font-medium text-gray-900">{d.name}</td>
                <td className="px-5 py-4 text-gray-500">{d.type}</td>
                <td className="px-5 py-4 text-gray-500">{d.quantity}</td>
                <td className="px-5 py-4">
                  <span
                    className={
                      d.status === "AVAILABLE"
                        ? "rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700"
                        : "rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600"
                    }
                  >
                    {d.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-500">
                  <Link
                    to={`/admin/resources/${d.id}`}
                    className="font-medium text-gray-900 transition-colors duration-200 hover:text-gray-500"
                  >
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Create Resource</h1>
          <p className="mt-1 text-sm text-gray-500">Add a new resource available for reservation.</p>
        </div>
        <form action="" onSubmit={handleSubmit} className="mt-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-gray-900"
              />
            </div>
            <div>
              <label htmlFor="type" className="mb-2 block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                name="type"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as ResourceType)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-gray-900"
              >
                <option value="EQUIPMENT">Equipment</option>
                <option value="ROOM">Room</option>
                <option value="SERVER">Server</option>
                <option value="VEHICLE">Vehicle</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-gray-900"
            />
          </div>
          <div className="my-5">
            <label htmlFor="quantity" className="mb-2 block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              placeholder="Quantity"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              min={1}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-gray-900"
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="cursor-pointer rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createMutation.isPending ? "Creating..." : "Create Resource"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminResourcePage;
