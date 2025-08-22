import {Role} from "./Enums/Role";
import {Program} from "./Program";

export class Coach {
  id: number | null = null;

  role: string[] = [];
  bio = "";
  industry: string[] = [];
  capabilities: string[] = [];
  country: string[] = [];
  governonate = "";
  currency = "";
  standardFees = "";
  per = "";
  useful_information = "";
  years_experience = "";

  constructor() {
  }
}
