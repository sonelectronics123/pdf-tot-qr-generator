import axios from "axios";

export const getDriveAbout = async (
  accessToken: string
) => {
  const response = await axios.get(
    "https://www.googleapis.com/drive/v3/about",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        fields: "user",
      },
    }
  );

  return response.data;
};