import app from "./app.js";
import cloudinary from "cloudinary";
import { connection } from "./database/connection.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get('/',(req,res)=>{
    res.send("API is Working and this is the job portal website")
})

connection().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});
