export interface IChildProfile {
  id?: string;
  name: string;
  profileImage?: File | null | undefined;
  age: number;
  gender: "MALE" | "FEMALE";
  image?: string;
  imageUrl?: string;
  status?: "active" | "inactive";
  onboardingCode?: string;
}
