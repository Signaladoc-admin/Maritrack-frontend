import { IChildProfile } from "@/features/onboarding/personal/types";

export const childrenProfiles: IChildProfile[] = [
  {
    id: "1",
    name: "Mide",
    age: 10, // Added required field
    gender: "MALE", // Added required field
    status: "active",
    image: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "David",
    age: 12, // Added required field
    gender: "MALE", // Added required field
    status: "inactive", // Changed from "locked" to match the interface
    image: "https://i.pravatar.cc/150?u=david",
  },
  {
    id: "3",
    name: "New User",
    age: 8, // Added required field
    gender: "FEMALE", // Added required field
    status: "active",
    image: "", // Empty to test fallback
  },
];
