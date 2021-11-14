import SoutenanceModel from "../../models/soutenance.js";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

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
    estAttribue: req.compte.estAttribue,
    lieux: lieux,
  });
};
