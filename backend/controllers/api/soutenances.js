import SoutenanceModel from "../../models/soutenance.js";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

export const getSoutenances = (req, res) => {
  // var base_dir = path.resolve("./");
  // res.sendFile(base_dir + "/frontend/soutenances.html");
  let Calendar = new Calendar(calendar, {
    plugins: [ dayGridPlugin, listPlugin ],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listWeek'
    }
  });
  res.render("pages/alternance", {
    estConnecte: true,
    page: "alternance",
    calendar: Calendar
    });
};

export const createSoutenance = (req, res) => {
  // Get the value on name in the headers
  var date = req.body.date;
  var lieu = req.body.lieu;
  var hour = req.body.hour



  /*
      const newSoutenance = new Soutenance({
          name,
          email,
          password: hash
        });
        
      const savedUser = await newUser.save();
  
       
  
        res.status(200).json({
          token,
          user: {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email
          }
        }); */

  res.status(200);
};

export const updateSoutenance = (req, res) => {
  res.status(200);
};

export const deleteSoutenance = (req, res) => {
  res.status(200);
};
