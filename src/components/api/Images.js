import S3 from "react-aws-s3";
import { v4 as uuidv1 } from "uuid";

// Uploads images to S3 bucket and has method for link for S3 bucket.
export async function uploadImageUrl(image) {
  const file = image.current.files[0];
  const fileType = image.current.files[0].name.split(".")[1];
  const newFileName = `${uuidv1()}.${fileType}`;

  const config = {
    bucketName: "",
    region: "",
    accessKeyId: "",
    secretAccessKey: "",
  };

  const ReactS3Client = new S3(config);
  let status = { status: "pending", value: "" };
  await ReactS3Client.uploadFile(file, newFileName)
    .then((data) => {
      status.status = "success";
      status.value = newFileName;
    })
    .catch((err) => {
      status.status = "error";
      status.value = err;
    });

  return status;
}

export function getImageUrl(imageName) {
  return `${url}/${imageName}`;
}
