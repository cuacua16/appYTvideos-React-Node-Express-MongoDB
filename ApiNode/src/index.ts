import app from "./app";
import "./database";

app.listen(app.get("port"), () => {
  console.log(`Server listenning on port ${app.get("port")}...`);
});
