export default (process.env.NODE_ENV === "development"
  ? {
      server: "https://localhost:3095",
    }
  : {
      server: "https://weblite.me:3095",
    })
