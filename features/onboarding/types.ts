export interface IChildProfile {
  id?: string;
  name: string;
  age: number;
  gender: "MALE" | "FEMALE";
  image?: string;
  status?: "active" | "inactive";
}
