import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs:15*60*60,
    limit:100,
    message:"Too many request please try again later",
})