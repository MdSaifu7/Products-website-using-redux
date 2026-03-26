import ImageKit from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const uploadFile = async function (buffer, name, product = false) {
  const response = await client.files.upload({
    file: buffer.toString("base64"), // required, must be a base64 encoded string
    fileName: name + "-img.jpg", // required
    folder: product ? "/products" : "/avatars",
  });
  return response;
};

export default uploadFile;
