import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3,
  },
  telefono: {
    type: String,
    required: true,
    minlength: 6,
  },
  telefonoContacto: {
    type: String,
    required: true,
    minlength: 6,
  },

  edad: {
    type: Number,
    required: true,
    maxlength: 2,
  },
  nombreTutor: {
    type: String,
    minlength: 3,
  },
  dniTutor: {
    type: String,
    minlength: 7,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  role: {
    type: String,
    required: true,
    minlength: 3,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
    minlength: 7,
  },
  sexo: {
    type: String,
    required: true,
    minlength: 3,
  },
  barrio: {
    type: String,
    required: true,
    minlength: 3,
  },
  activity: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
  emailVerificationToken: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  asistencia: {
    type: String,
    required: true,
    minlength: 3,
  },
  qr: {
    type: String,
  },
  status: {
    type: Boolean,
  },

  foto: {
    type: String,
    minlength: 3,
  },

  fichaMedica: {
    type: String,
    minlength: 3,
  },
});

export default mongoose.model("User", schema);
