import { useState } from "react";
import type { ResourceRequest, ResourceType } from "../types/resource";
import FormInput from "./FormInput";

interface ResourceFormProps {
  onSubmit: (resource: ResourceRequest) => void;
  onCancel?: () => void;
  initialValues?: ResourceRequest;
  submitLabel: string;
  pendingLabel: string;
  isPending: boolean;
}

const ResourceForm = ({
  onSubmit,
  onCancel,
  initialValues,
  submitLabel,
  pendingLabel,
  isPending,
}: ResourceFormProps) => {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [type, setType] = useState<ResourceType>(initialValues?.type ?? "EQUIPMENT");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [quantity, setQuantity] = useState(initialValues?.quantity ?? 1);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({ name, type, description, quantity });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 border border-gray-200 bg-white rounded-lg p-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <FormInput
          id="name"
          value={name}
          label="Name"
          type="text"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <div>
          <label htmlFor="type" className="mb-2 text-sm font-medium text-gray-700 block">
            Type
          </label>
          <select
            name="type"
            id="type"
            value={type}
            required
            onChange={(e) => setType(e.target.value as ResourceType)}
            className="text-sm font-medium w-full border border-gray-300 rounded-lg px-4 py-2 outline-none transition-colors duration-200 focus:border-gray-600"
          >
            <option value="EQUIPMENT">Equipment</option>
            <option value="ROOM">Room</option>
            <option value="SERVER">Server</option>
            <option value="VEHICLE">Vehicle</option>
          </select>
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-700 block">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Description"
          rows={3}
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          className="text-sm font-medium w-full border border-gray-300 rounded-lg px-4 py-2 outline-none transition-colors duration-200 focus:border-gray-600"
        />
      </div>
      <FormInput
        id="quantity"
        value={quantity}
        label="Quantity"
        type="number"
        placeholder="Quantity"
        required
        min={1}
        containerClassName="mt-6"
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <div className="mt-6 flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-500 text-sm font-medium transition-colors duration-200 cursor-pointer hover:bg-gray-200"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? pendingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ResourceForm;
