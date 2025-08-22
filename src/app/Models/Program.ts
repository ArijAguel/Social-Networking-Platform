import { Coach } from "./Coach";
import { Project } from "./Projet";

export class Program{
    constructor(
        public id: number,
        public creationDate: Date,
        public name: string,
        public projects: Project[],
        public ids: number[],
        public idAssigned: number | null,
        public coach: Coach,
        public assignedCoach: Coach | null
    ) {}
}
  