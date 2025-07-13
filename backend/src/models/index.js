import { Event } from "./event.model.js";
import { Student } from "./student.model.js";
import { Attendance } from "./attendance.model.js";
import { Otp } from "./otp.model.js";

// Model associations
Event.hasMany(Attendance, { foreignKey: "eventId" });
Student.hasMany(Attendance, { foreignKey: "studentId" });
Attendance.belongsTo(Event, { foreignKey: "eventId" });
Attendance.belongsTo(Student, { foreignKey: "studentId" });

export { Event, Student, Attendance, Otp };