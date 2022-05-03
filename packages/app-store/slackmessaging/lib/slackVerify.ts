import { createHmac } from "crypto";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";

const signingSecret = process.env.SLACK_SIGNING_SECRET;

export default async function slackVerify(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  const timeStamp = req.headers["x-slack-request-timestamp"] as string; // Always returns a string and not a string[]
  const slackSignature = req.headers["x-slack-signature"] as string;
  const currentTime = dayjs().unix();

  if (!timeStamp) {
    return res.status(400).json({ message: "Missing X-Slack-Request-Timestamp header" });
  }

  if (!signingSecret) {
    return res.status(400).json({ message: "Missing process.env.SLACK_SIGNING_SECRET" });
  }

  if (Math.abs(currentTime - parseInt(timeStamp)) > 60 * 5) {
    return res.status(400).json({ message: "Request is too old" });
  }

  const signature_base = `v0:${timeStamp}:${stringify(body)}`;
  const signed_sig = "v0=" + createHmac("sha256", signingSecret).update(signature_base).digest("hex");

  if (signed_sig !== slackSignature) {
    return res.status(400).json({ message: "Invalid signature" });
  }
}
