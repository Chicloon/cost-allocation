import "server-only";

import { db } from "./db";

export async function getBills() {
  const bills = await db.query.bills.findMany();

  return bills;
}

export async function getContracts() {
  const contracts = await db.query.contracts.findMany();
  return contracts;
}

export async function getServices() {
  const services = await db.query.services.findMany();
  return services;
}

export async function getBuildings() {
  const buildings = await db.query.buildings.findMany();
  return buildings;
}
