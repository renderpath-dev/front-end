import express, { type RequestHandler } from "express";

const app = express();
const port = Number.parseInt(process.env.PORT ?? "3102", 10);

const trace = (label: string): RequestHandler => {
  return (_request, _response, next) => {
    console.log(label);
    next();
  };
};

app.use(trace("1: application middleware"));

app.get(
  "/complete",
  trace("2: route middleware"),
  (_request, response) => {
    console.log("3: route handler");
    response.status(200).json({ complete: true });
  }
);

app.get("/short-circuit", (_request, response) => {
  console.log("2: request ended before later middleware");
  response.status(403).json({ error: "Request stopped." });
});

app.get("/hang", (_request, _response) => {
  console.log("2: this handler neither responds nor calls next()");
});

app.use(trace("4: only reached when previous middleware calls next()"));

app.listen(port, "127.0.0.1", () => {
  console.log(`Middleware practice listening on http://127.0.0.1:${port}`);
});
