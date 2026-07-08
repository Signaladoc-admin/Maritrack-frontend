export interface IChildProfile {
  id?: string;
  name: string;
  profilePicture?: File;
  age: number;
  gender: "MALE" | "FEMALE";
  image?: string;
  imageUrl?: string;
  status?: "active" | "inactive";
  onboardingCode?: string;
}
