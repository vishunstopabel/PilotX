import dotenv from "dotenv";
import { httpServer } from "./app";
import { SocketIo } from "./sockets";
import { ConnectToRedis } from "./config";
dotenv.config({

});
const startserver = async () => {
  const port = process.env.PORT;
  try {
    await ConnectToRedis();
    await SocketIo(httpServer);
    httpServer.listen(port, () => {
      console.log(`server is listening at the port ${port}`);
    });
  } catch (error) {}
};

startserver();
