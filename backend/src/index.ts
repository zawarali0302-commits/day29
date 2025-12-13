import { User } from "./types/UserType"
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const users: User[] = [
    {
        id: 1,
        name: "zawar",
        designation: "web developer",
        salary: 100000,
    },
    {
        id: 2,
        name: "zawar",
        designation: "web developer",
        salary: 100000,
    },
    {
        id: 3,
        name: "zawar",
        designation: "web developer",
        salary: 100000,
    }
]


const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

mongoose.connect('mongodb+srv://zawarali0302_db_user:t3H4lMosQYFXcIZm@cluster0.2gzkxxs.mongodb.net/')
    .then(() => {
        console.log("Connected to MongoDB");
    })




const teachers = new mongoose.Schema({
    name: String,
    subject: String,
    yearsOfExperience: Number,
    salary: Number,
});

const Teacher = mongoose.model('Teacher', teachers);



app.post('/teachers',express.json(), (req,res)=>{
    const newTeacher = new Teacher({
        name: req.body.name,
        subject: req.body.subject,
        yearsOfExperience: req.body.yearsOfExperience,
        salary: req.body.salary,
    });
    newTeacher.save()
        .then(teacher => {
            res.status(201).send(teacher);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});


const t1 = new Teacher({
    name: "zawar",
    subject: "Mathematics",
    yearsOfExperience: 8,
    salary: 50000,
}).save()




app.get('/teachers', (req, res) => {
    Teacher.find()
        .then(teacher => {
            res.send(teacher);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});


app.get('/teachers/:id', (req, res) => {
    Teacher.findById(req.params.id)
        .then(teacher => {
            if (!teacher) {
                return res.status(404).send("Teacher not found");
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});


app.put('/teachers/:id', (req,res)=>{
    Teacher.findByIdAndUpdate(
        req.params.id ,
        {
            name: req.body.name,
            subject: req.body.subject,
            yearsOfExperience: req.body.yearsOfExperience,
            salary: req.body.salary
        },
        {new: true}
    )
    .then(teacher => {
        if (!teacher){
            return res.status(404).send("Teacher not found");
        }
    })
    .catch(err => {
        res.status(500).send(err);
    })
})

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
    res.json(users)
})

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`))
