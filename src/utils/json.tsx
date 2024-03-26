export function isValidJSON(jsonString: string) {
  try {
    JSON.parse(jsonString);
    return true; // Parsing succeeded, the JSON is valid
  } catch (e) {
    return false; // Parsing failed, the JSON is invalid
  }
}
