import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later."
});

export default rateLimiter;



//// this is for upstash //////////
// import ratelimit from "../config/upstash.js";

// const rateLimiter = async (req, res, next) => {
//   try {
//     const { success } = await ratelimit.limit("my-rate-limit");

//     if (!success) {
//       return res.status(429).json({
//         message: "Too many requests, please try again later",
//       });
//     }

//     next();
//   } catch (error) {
//     console.log("Rate limit error", error);
//     next(error);
//   }
// };

// export default rateLimiter;
