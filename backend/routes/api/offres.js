import { Router } from 'express';
import { getOffres, createOffre, updateOffre, deleteOffre } from "../../controllers/api/offreAPI.js";
import auth from '../../middleware/auth.js';


const router = Router();

/**
 * @route   GET api/offres
 * @desc    Get All Offers
 * @access  Private
 */
router.get('/', auth, getOffres);

/**
 * @route   POST api/offres
 * @desc    Create An Offer
 * @access  Private
 */
router.post('/', auth, createOffre);

/**
 * @route   PUT api/offres
 * @desc    Update An Offer
 * @access  Private
 */
router.put('/', auth, updateOffre);

/**
 * @route   DELETE api/offres/:id
 * @desc    Delete An Offer
 * @access  Private
 */
router.delete('/:id', auth, deleteOffre);

export default router;
