import express, { Express, Request, Response } from "express";
import { execSync } from "node:child_process";
import fs from "fs";

const app: Express = express();
const port = 80;

app.get("/:video", (req: Request, res: Response) => {
  if (!req.params.video.match(/^[a-z0-9_-]{11}$/i)) {
    res.statusCode = 400;
    res.send("not a video id...");
    return;
  }
  try {
    console.log(`Getting video streaming link for ${req.params.video}`);
    const url = execSync(
      `yt-dlp -g --format=best[vcodec^=avc1] ${
        fs.existsSync("/app/cookies.txt") ? `--cookies="/app/cookies.txt"` : ""
      } http://www.youtube.com/watch?v=${req.params.video}`
    ).toString();
    res.send(url);
    return;
  } catch (error: any) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
});

app.get("/", (req: Request, res: Response) => {
  console.log(
    JSON.stringify(req, [
      "bodyUsed",
      "cache",
      "credentials",
      "destination",
      "headers",
      "integrity",
      "isHistoryNavigation",
      "keepalive",
      "method",
      "mode",
      "redirect",
      "referrer",
      "referrerPolicy",
      "signal",
      "url",
    ])
  );
  res.send("");
});

app.post("*", (req: Request, res: Response) => {
  console.log(
    JSON.stringify(req, [
      "bodyUsed",
      "cache",
      "credentials",
      "destination",
      "headers",
      "integrity",
      "isHistoryNavigation",
      "keepalive",
      "method",
      "mode",
      "redirect",
      "referrer",
      "referrerPolicy",
      "signal",
      "url",
    ])
  );
  console.log(JSON.stringify(req.body));
  res.send("");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
