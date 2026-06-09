import { withSafeAction } from "@/shared/lib/safe-action";
import { MediaUploadType } from "./types";

const mediaApiUrl = process.env.NEXT_PUBLIC_MEDIA_API_URL!;

export async function uploadMedia({file,fileType}: {file: File, fileType: MediaUploadType}) {
  return withSafeAction(async () => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${mediaApiUrl}/upload/file/${fileType}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload media");
  }

  const data = await response.json();

  return data;
  }, 'Failed to upload media')
}

export async function uploadImage(file: File) {
  return withSafeAction(async () => {
    const formData = new FormData();
  formData.append("file", file);

    const res = await fetch(
      `${mediaApiUrl}/upload/image`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("Failed to upload image");
    }

    return res;
  }, 'Failed to upload image');
}
