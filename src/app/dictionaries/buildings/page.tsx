import { getBuildings } from "~/server/queries";
export default async function Buildings() {
  const buildings = await getBuildings();

  return (
    <div>
      Buildings
      {buildings.map((el) => (
        <p key={el.id}> {el.unit}</p>
      ))}
    </div>
  );
}
