export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeAll(str: string) {
  return str.split(" ").map(capitalize).join(" ");
}
