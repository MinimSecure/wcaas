import "dotenv/config";
import build from "./app";

const env = process.env;
const PORT = env.PORT || 8081;
const server = build();

const start = async () => {
  try {
    await server.listen(PORT, "0.0.0.0");
  } catch (err: any) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
