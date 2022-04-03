const setTitle = (title) => {
  document.title = title;
};

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api"
    : "https://api.lxndr.dev/procesosiq/api";

export { setTitle, baseURL };
