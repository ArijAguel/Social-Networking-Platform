import { Coach } from "./Coach";
import { Entrepreneur } from "./Entrepreneur";
import { Emplacement } from "./Enums/Emplacement";

export class RendezVous {
    constructor(
        public id: number,
        public date: string,
        public time: string,
        public place: string,
        public entrepreneur: Entrepreneur,
        public coach: Coach,
        public emplacement: Emplacement,
        public visibilite: string,
        public titre : string
    ) {}
}