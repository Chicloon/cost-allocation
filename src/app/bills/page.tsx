import { getBills } from "~/server/queries";

export default async function Bills() {
  const bills = await getBills();
  return (
    <div>
      Bills
      {bills.map((bill) => (
        <div key={bill.id}>{bill.number}</div>
      ))}
    </div>
  );
}
