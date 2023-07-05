export default function parseRole(role: string) {
  const i = role.replaceAll("_", " ");
  return (
    i.split("")[0].toUpperCase() + i.substring(1, i.length).toLocaleLowerCase()
  );
}
