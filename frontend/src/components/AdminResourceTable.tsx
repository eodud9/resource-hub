import { Link } from "react-router-dom";
import type { ResourceResponse } from "../types/resource";

interface AdminResourceTableProps {
  resources: ResourceResponse[];
}

const AdminResourceTable = ({ resources }: AdminResourceTableProps) => {
  return (
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
          {resources.map((resource) => (
            <tr key={resource.id} className="border-b border-gray-100 last:border-b-0">
              <td className="px-5 py-4 font-medium text-gray-900">{resource.name}</td>
              <td className="px-5 py-4 text-gray-500">{resource.type}</td>
              <td className="px-5 py-4 text-gray-500">{resource.quantity}</td>
              <td className="px-5 py-4">
                <span
                  className={
                    resource.status === "AVAILABLE"
                      ? "rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700"
                      : "rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600"
                  }
                >
                  {resource.status}
                </span>
              </td>
              <td className="px-5 py-4 text-gray-500">
                <Link
                  to={`/admin/resources/${resource.id}`}
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
  );
};

export default AdminResourceTable;
