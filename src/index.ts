import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 80;

app.get("*", (req: Request, res: Response) => {
  console.log(JSON.stringify(req));
  res.send("");
});

app.post("*", (req: Request, res: Response) => {
  console.log(JSON.stringify(req));
  res.send("");
});