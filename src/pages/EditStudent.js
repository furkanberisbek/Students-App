import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";



const EditStudent = () => {
    const { studentId } = useParams()
    const navigate = useNavigate()

    const [willEditStudent, setWillEditStudent] = useState(null)
    const [studentNo, setStudentNo] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [studentClass, setStudentClass] = useState("")
    const [schoolName, setSchoolName] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:3004/students/${studentId}`)
            .then(res => {
                console.log(res.data);
                setWillEditStudent(res.data)
                setStudentNo(res.data.studentNo);
                setName(res.data.name);
                setSurname(res.data.surname);
                setStudentClass(res.data.studentClass);
                setSchoolName(res.data.schoolName);
            })
            .catch(err => {
                console.log(err);
                alert("Öğrenci bilgilerini çekerken bir hata oluştu!")
                navigate("/")
            })
    }, [])

    const handleEdit = (event) => {
        event.preventDefault()
        //validation
        if (studentNo === "" ||
            name === "" ||
            surname === "" ||
            studentClass === "" ||
            schoolName === ""
        ) {
            alert("Bütün Alanları Doldurmak Zorunludur!")
            return
        }
        const updatedStudent ={
            id:willEditStudent.id,
            name:name,
            surname:surname,
            studentClass:studentClass,
            schoolName:schoolName,
            studentNo:studentNo
        }
        axios.put(`http://localhost:3004/students/${willEditStudent.id}`,updatedStudent)
        .then(res=>{
            navigate("/")
        })
        .catch(err=>{
            console.log(err);
            alert("Güncelleme esnasında bir hata oluştu!")
        })
    }


    if (willEditStudent === null) {
        return null
    }

    return (
        <div>
            <Header />
            <div className="container my-5">
                <form onSubmit={handleEdit}>
                    <div className="input-group mb-3">
                        <span htmlFor="name" className="input-group-text w-25">Öğrenci Adı:</span>
                        <input id="name"
                            type="text"
                            className="form-control"
                            placeholder="Ör: Furkan"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span htmlFor="surname" className="input-group-text w-25">Öğrenci Soyadı:</span>
                        <input
                            id="surname"
                            type="text"
                            className="form-control"
                            placeholder="Ör: Berişbek"
                            value={surname}
                            onChange={(event) => setSurname(event.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span htmlFor="studentNo" className="input-group-text w-25">Öğrenci No:</span>
                        <input
                            id="studentNo"
                            type="number"
                            className="form-control"
                            placeholder="Ör: 987"
                            value={studentNo}
                            onChange={(event) => setStudentNo(event.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span htmlFor="studentClass" className="input-group-text w-25">Öğrenci Sınıfı:</span>
                        <input
                            id="studentClass"
                            type="text"
                            className="form-control"
                            placeholder="Ör: 12/C"
                            value={studentClass}
                            onChange={(event) => setStudentClass(event.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span htmlFor="schoolName" className="input-group-text w-25">Okul Adı:</span>
                        <input
                            id="schoolName"
                            type="text"
                            className="form-control"
                            placeholder="Ör: Atatürk Lisesi"
                            value={schoolName}
                            onChange={(event) => setSchoolName(event.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center my-4">
                        <button type="submit" className="btn btn-outline-danger w-50">Güncelle</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditStudent