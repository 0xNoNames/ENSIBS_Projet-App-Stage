import SoutenanceModel from "../../models/soutenance.js";

export const getSoutenances = (req, res) => {
  // var base_dir = path.resolve("./");
  // res.sendFile(base_dir + "/frontend/soutenances.html");
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
