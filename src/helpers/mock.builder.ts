import { faker } from "@faker-js/faker";

export const generateTitle = (length = 3): string => faker.word.words(length);
