import { HomePage } from "./pages/home/";
import {
  PatientBlankPage,
  PatientPage,
  PastConsultationsPage,
} from "./pages/patient";
import {
  DoctorBlankPage,
  DoctorPage,
  DoctorConsultationPage,
} from "./pages/doctor";

import { Error404 } from "./pages/errors";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/patient",
    element: <PatientBlankPage />,
    children: [
      {
        path: "",
        element: <PatientPage />,
      },
      {
        path: "past-consultations",
        element: <PastConsultationsPage />,
      },
    ],
  },
  {
    path: "/doctor",
    element: <DoctorBlankPage />,
    children: [
      {
        path: "",
        element: <DoctorPage />,
      },
      {
        path: ":id",
        element: <DoctorConsultationPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
