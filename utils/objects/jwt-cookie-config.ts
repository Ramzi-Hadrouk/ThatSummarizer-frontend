const jwtCookieConfig = {
  maxAge: 60 * 60 * 24 *1, // 1 day
  path: "/",
  domain: process.env.NODE_ENV === "production" ? process.env.HOST : undefined,
  httpOnly: false, // Allow access via JavaScript
  secure: process.env.NODE_ENV === "production", // Secure only in production
};
  
  export default jwtCookieConfig;
  