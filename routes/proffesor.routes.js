import express from 'express';
import p_querys from '../controllers/professsor';

const router = express.Router();

// COURSES
router.post('/add-course', p_querys.createCourse);

router.get('/course/:id_c', p_querys.readCourse);

router.put('/course/:id_c', p_querys.updateCourse);

router.delete('/course/:id_c', p_querys.deleteCourse);

router.post('/my-courses', p_querys.getCourses);

// ASIGNMENTS
router.post('/add-assignment/:id_c', p_querys.addAssignment);

router.get('/course-assignments/:id_c', p_querys.getAssignments);

// DELIVERIES
router.get('/assignment-deliveries/:id_a', p_querys.getDeliveries);

module.exports = router;