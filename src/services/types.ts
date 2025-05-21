export type PetKind = "cat" | "dog";

export type PetCommonProps = {
  id: number;
  name: string;
  weight: number;
  height: number;
  length: number;
  photo_url: string;
  description: string;
  kind: PetKind;
};

export type Dog = PetCommonProps & {
  kind: "dog";
};

export type Cat = PetCommonProps & {
  kind: "cat";
  number_of_lives: number;
};

export type PetRaw = Dog | Cat;
