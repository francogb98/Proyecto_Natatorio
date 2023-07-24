import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://francogb98:root@cluster0.83zotio.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected MongoDB");
  })
  .catch((error) => {
    console.error("error onnection to mongodb", error.message);
  });
