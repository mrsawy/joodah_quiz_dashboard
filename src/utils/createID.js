export default () => {
  const timestamp = new Date().getTime();
  const hexString = timestamp.toString(16); // Convert timestamp to hexadecimal string
  const paddedHexString = hexString.padStart(24, '0'); // Ensure the string is 24 characters by padding with zeros if needed
  return paddedHexString;
};
