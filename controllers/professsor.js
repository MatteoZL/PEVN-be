import pool from "../database/keys";
import helpers from '../libs/cloudinary';

const p_querys = {};

// COURSES
p_querys.createCourse = async (req, res) => {
    const { id, c_name, c_description } = req.body;
    try {
        await pool.query('INSERT INTO course (p_id, c_name, c_description) VALUES ($1, $2, $3)', [id, c_name, c_description]);
        const course = await (await pool.query('SELECT * FROM course ORDER BY id_c DESC LIMIT 1;')).rows[0];
        res.status(200).json({
            message: 'Succesful added course',
            course
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error has occurred',
            error
        });
    }
};

p_querys.readCourse = async (req, res) => {
    const id = req.params.id_c;
    try {
        const course = await (await pool.query('SELECT * FROM course WHERE id_c=$1', [id])).rows[0];;
        res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({
            message: 'an error has occurred',
            error
        });
    }

};

p_querys.updateCourse = async (req, res) => {
    const id = req.params.id_c;
    const { c_name, c_description } = req.body;
    try {
        await pool.query('UPDATE course SET c_name=$1, c_description=$2 WHERE id_c=$3', [c_name, c_description, id]);
        res.status(200).json({
            message: 'Successful edited course',
            course: { c_name, c_description }
        })
    } catch (error) {
        return res.status(500).json({
            message: 'an error has occurred',
            error
        });
    }
};

p_querys.deleteCourse = async (req, res) => {
    const id = req.params.id_c;
    try {
        await pool.query('DELETE FROM course WHERE id_c=$1', [id]);
        res.status(200).json({
            message: 'Successful deleted course',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'an error has occurred',
            error
        });
    }
};

p_querys.getCourses = async (req, res) => {
    const { id } = req.body;
    try {
        const courses = await (await pool.query('SELECT * FROM course WHERE p_id=$1', [id])).rows;
        res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({
            message: 'an error has occurred',
            error
        });
    }
};

// ASSIGNMENTS
p_querys.addAssignment = async (req, res) => {
    const id = req.params.id_c;
    const { a_name, a_description } = req.body;
    const a_file = await helpers.uploadToCloudnry(req.files.a_file.tempFilePath);
    try {
        await pool.query('INSERT INTO assignment (c_id, a_name, a_description, a_file) VALUES ($1, $2, $3, $4)', [id, a_name, a_description, a_file]);
        res.status(200).json({
            message: 'Succesful added assignment',
            assignment: { a_name, a_description, a_file }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error has occurred',
            error
        });
    }
};

p_querys.getAssignments = async (req, res) => {
    const id = req.params.id_c;
    try {
        const assignments = await (await pool.query('SELECT * FROM assignment WHERE c_id=$1', [id])).rows;
        res.status(200).json(assignments);
    } catch (error) {
        return res.status(500).json({
            message: 'An error has occurred',
            error
        });
    }
};

p_querys.getDeliveries = async (req, res) => {
    const id_a = req.params.id_a;
    try {
        const deliveries = await (await pool.query('SELECT * FROM delivery JOIN (SELECT id_s, s_name FROM student) AS S ON s_id=id_s WHERE a_id=$1', [id_a])).rows;
        res.status(200).json(deliveries);
    } catch (error) {
        return res.status(500).json({
            message: 'An error has occurred',
            error
        });
    }
};

module.exports = p_querys;