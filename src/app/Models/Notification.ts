import { Coach } from "./Coach";
import { Entrepreneur } from "./Entrepreneur";

export class Notification {
    constructor(
        public id: number,
        public creationDate: string, // Assuming Instant is converted to string
        public message: string,
        public link: string,
        public entrepreneur: Entrepreneur,
        public coach: Coach,
        public entrepreneurIsSender: boolean,
        public viewed: boolean,
        public accepted: string,
        public date: string,
        public time: string,
        public place: string,
        public projectId: number,
        public programId: number
    ) {}
}
