import { Router } from 'express';
import path from 'path';



const router = Router();

router.get('/', function(req, res) {
	var base_dir = path.resolve('./')
	res.sendFile(base_dir + '/client/cvtheque.html');
});


export default router;
