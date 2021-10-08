import { Router } from 'express';
import path from 'path';



const router = Router();

router.get('/', function(req, res) {
	var base_dir = path.resolve('./')
	res.sendFile(base_dir + '/client/cvtheque.html');
});


router.post('/create', function(req, res) {
	res.status(200);
});


router.post('/update',function(req,res){
	res.status(200);
});

router.post('/delete',function(req,res){
	res.status(200);
});

export default router;
