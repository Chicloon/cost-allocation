// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { index, pgTableCreator, serial, timestamp, varchar, integer, foreignKey } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `cost-allocation_${name}`);

// export const allBills = createTable("allBills", {
//   id: serial("id").primaryKey(),
//   companyId: integer("company_id"),
//   companyName: varchar("company_name", { length: 256 }).notNull(),
//   year: integer("year").notNull(),
//   accountId: integer("account_id").notNull(),
//   accountPosition: integer("account_position").notNull(),
//   serviceId: integer("service_id").notNull(),
//   serviceName: varchar("service_name", { length: 256 }).notNull(),
//   contractId: integer("contract_id"),
//   contractSubjectName: varchar("contract_subject_name", { length: 256 }).notNull(),
//   accountingDate: timestamp("accounting_date").notNull(),
//   priceWithoutVAT: integer("price_without_vat").notNull(),
//   paymentPurpose: varchar("payment_purpose", { length: 256 }).notNull(),
// });

export const bills = createTable("bill", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull(),
  position: integer("position").notNull(),
  year: integer("year").notNull(),
  serviceId: integer("service_id").notNull(),
  contractId: integer("contract_id"),
  accountingDate: timestamp("accounting_date", { withTimezone: true }).notNull(),
  priceWithoutVAT: integer("price_without_vat").notNull(),
});

/* 

Справочники

*/
export const contracts = createTable("contract", {
  id: serial("id").primaryKey(),
  buildingId: integer("building_id")
    .notNull()
    .references(() => buildings.id),
  bindingStart: timestamp("binding_start", { withTimezone: true }).notNull(),
  bindingEnd: timestamp("binding_end", { withTimezone: true }).notNull(),
});

export const contractsRelations = relations(contracts, ({ one }) => ({
  building: one(buildings, {
    fields: [contracts.buildingId],
    references: [buildings.id],
  }),
}));

export const buildings = createTable("building", {
  id: serial("id").primaryKey(),
  ownShipStart: timestamp("ownship_start", { withTimezone: true }).notNull(),
  ownShipEnd: timestamp("ownship_end", { withTimezone: true }).notNull(),
  measuringStart: timestamp("measuring_start", { withTimezone: true }).notNull(),
  measuringEnd: timestamp("measuring_end", { withTimezone: true }).notNull(),
  unit: varchar("unit", { length: 256 }).notNull(),
});

export const buildingsRelations = relations(buildings, ({ many }) => ({
  contracts: many(contracts),
}));

export const services = createTable(
  "service",
  {
    id: serial("id").primaryKey(),
    class: varchar("class", { length: 256 }).notNull(),
  },
  (table) => ({
    classIndex: index("name_class").on(table.class),
  }),
);
