const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  const result = await res.json();
  return result;
};
