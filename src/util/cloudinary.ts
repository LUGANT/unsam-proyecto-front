import axios from "axios";

export async function getUrlFromCloudinary(selectedFile: File) {
  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("upload_preset", "pf-proyecto");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dihzjepjh/image/upload",
      formData
    );

    const result = response.data;
    return result.secure_url;
  } catch (e) {
    throw e;
  }
}
