import { useQuery } from "@tanstack/react-query";
import { getResources } from "../api/resource";
import { Link } from "react-router-dom";

export const ResourcePage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <div>
      <h1>Resources</h1>
      <ul>
        {data?.map((d) => (
          <li key={d.id}>
            <Link to={`/resources/${d.id}`}>
              <h3>
                {d.name} - {d.quantity} ({d.status})
              </h3>
            </Link>
            <p>{d.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
