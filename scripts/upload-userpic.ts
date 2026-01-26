import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

async function upload() {
  const fileContent = fs.readFileSync("/tmp/ion-lucin.jpg");

  const command = new PutObjectCommand({
    Bucket: "img.playingarts.com",
    Key: "zero/upic/ion-lucin.jpg",
    Body: fileContent,
    ContentType: "image/jpeg",
    ACL: "public-read",
  });

  await s3.send(command);
  console.log("Uploaded to: https://s3.amazonaws.com/img.playingarts.com/zero/upic/ion-lucin.jpg");
}

upload().catch(console.error);
