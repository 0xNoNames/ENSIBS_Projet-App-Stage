import { Router } from 'express';
import path from 'path';



const router = Router();

router.get('/', function(req, res) {
	var base_dir = path.resolve('./')
	res.sendFile(base_dir + '/client/soutenances.html');
});


router.post('/create', function(req, res) {
	// Get the value on name in the headers
	var name = req.header('name');

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
});


export default router;