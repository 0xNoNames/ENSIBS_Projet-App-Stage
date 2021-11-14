import SoutenanceModel from "../../models/soutenance.js";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

// let calendar = new Calendar(calendareL, {
//   plugins: [dayGridPlugin, listPlugin],
//   initialView: "dayGridMonth",
//   headerToolbar: {
//     left: "prev,next today",
//     center: "title",
//     right: "dayGridMonth,listWeek",
//   },
// });

var lieux = [{ nom: "D0010" }];

export const getSoutenancesPage = async (req, res) => {
  if (req.baseUrl == "/soutenances") {
    var page = "Soutenances";
  } else {
    var page = "Entretiens";
  }
  res.render("pages/soutenances", {
    estConnecte: true,
    page: page,
    prenom: req.compte.prenom,
    statut: req.compte.statut,
    lieux: lieux,
  });
};
