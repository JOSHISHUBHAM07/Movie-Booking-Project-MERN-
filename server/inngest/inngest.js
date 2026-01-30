import { Inngest } from "inngest";
import User from "../models/User.js";
import connectDB from "../config/db.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

// CREATE USER
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    await User.create({
      _id: id,
      email: email_addresses?.[0]?.email_address || null,
      name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      image: image_url || null,
    });
  },
);

// DELETE USER
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    await User.findByIdAndDelete(event.data.id);
  },
);

// UPDATE USER
const syncUserUpdatation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    await connectDB();

    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    await User.findByIdAndUpdate(id, {
      email: email_addresses?.[0]?.email_address || null,
      name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      image: image_url || null,
    });
  },
);

export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdatation,
];
