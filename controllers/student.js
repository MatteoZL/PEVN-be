import pool from "../database/keys";
import helpers from '../libs/cloudinary';

const s_querys = {};

//COURSES
s_querys.allCourses = async (req, res) => {
    const id = req.body.id;
    try {
        const courses = await (await pool.query('SELECT * FROM professorvscourse LEFT JOIN (SELECT * FROM studentvscourse WHERE s_id=$1) AS S ON id_c=c_id WHERE c_id IS NULL', [id])).rows;
        res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({
            message: 'An error has occurred',
            error
        });
    }
};

s_querys.joinCourse = async (req, res) => {
    const id = req.body.id;
    const id_c = req.params.id_c;
    try {
        await pool.query('INSERT INTO studentvscourse VALUES ($1, $2)', [id, id_c]);
        res.status(200).json({
            message: 'You joined the course',
            course: { id_c }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error has occurred',
            error
        });
    }
};

s_querys.coursesMember = async (req, res) => {
    const id = req.body.id;
    try {
        const courses = await (await pool.query('SELECT * FROM professorvscourse JOIN (SELECT * FROM studentvscourse WHERE s_id=$1) AS S ON id_c=c_id', [id])).rows;
        res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({
            message: 'An error has occurred',
            error
        });
    }
};

s_querys.courseView = async (req, res) => {
    const id_c = req.params.id_c;
    const id = req.body.id;
    try {
        const course = await (await pool.query('SELECT * FROM professorvscourse WHERE id_c=$1', [id_c])).rows[0];
        const assignments = await (await pool.query('SELECT * FROM assignment LEFT JOIN (SELECT * FROM delivery WHERE s_id=$1) AS D on id_a=a_id WHERE c_id= $2', [id, id_c])).rows;
        res.status(200).json({
            course,
            assignments
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error has occurred',
            error
        });
    }
};

s_querys.addDelivery = async (req, res) => {
    const { id, id_a } = req.body;
    const d_filename = req.files.d_file.name;
    const d_file = await helpers.uploadToCloudnry(req.files.d_file.tempFilePath);
    try {
        await pool.query('INSERT INTO delivery (a_id, s_id, d_file, d_filename) VALUES ($1, $2, $3, $4)', [id_a, id, d_file, d_filename]);
        res.status(200).json({
            message: 'Succesful added delivery',
            d_file,
            d_filename
        })
    } catch (error) {
        return res.status(500).json({
            message: 'An error has occurred',
            error
        });
    }
};

module.exports = s_querys;