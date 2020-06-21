import express from "express";
import s_querys from "../controllers/student";

const router = express();

router.post('/all-courses', s_querys.allCourses);

router.post('/join-course/:id_c', s_querys.joinCourse);

router.post('/courses-member', s_querys.coursesMember)

router.post('/course/:id_c', s_querys.courseView);

router.post('/add-delivery', s_querys.addDelivery);

module.exports = router;