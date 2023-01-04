import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const AddStudent = () => {
    const navigate=useNavigate()
    const [studentNo, setStudentNo] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [studentClass, setStudentClass] = useState("")
    const [schoolName, setSchoolName] = useState("")

    const handleSave = (event) => {
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

        //unique (benzersiz)
        const newStudent={
            id:String(new Date().getTime()),
            name:name,
            surname:surname,
            studentNo:studentNo,
            studentClass:studentClass,
            schoolName:schoolName
        }
        axios.post("http://localhost:3004/students",newStudent)
        .then(res=>{
            navigate("/")
        })
        .catch(err=>{
            console.log(err);
            alert("Bir hata oluştu!")
        })
    };

    return (
        <div>
            <Header />
            <div className="container my-5">
                <form onSubmit={handleSave}>
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
                        <button type="submit" className="btn btn-outline-danger w-50">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddStudent