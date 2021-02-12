import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import UserAPI from "../../utils/UserAPI";
import "./Settings.css";
import { MessageContext } from "../../context/MessageContext";
import Message from "../../components/Message";

const Settings = () => {
    const { user, setUser } = useContext(AuthContext);
    const { message, setMessage } = useContext(MessageContext);
    const [file, setFile] = useState(null);
    const [charsLeft, setCharsLeft] = useState(250);
    const [bio, setBio] = useState({ bio: "" });

    useEffect(() => {
        UserAPI.isAuthenticated().then(data => {
            setUser(data.user);
        });
      },[message, file])

    //handle user image upload
    const handleChange = (e) => {
        console.log(e.target.files)
        setFile(e.target.files[0]);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(file);
        formData.append("file", file);
        UserAPI.uploadImage(formData).then(res => {
            console.log(res);
            setMessage(res);
            // if (res.msgError === false) {
            //     UserAPI.isAuthenticated().then(data => {
            //         setUser(data.user);
            //         setFile(null)
            //     });
            // } 
            setFile(null)
            setTimeout(() => setMessage(null), 5000);
       })
    }
    //handle user bio change
    const handleBioChange = (e) => {
        let input = e.target.value;
        setBio({ [e.target.name]: input });
        setCharsLeft(250 - input.length);
    }

    const resetBioForm = () => {
        setBio({ bio: "" });
    }

    const handleBioSubmit = (e) => {
        e.preventDefault();
        UserAPI.updateBio(user._id, bio).then(res => {
            console.log(res);
            setMessage(res);
            resetBioForm();
            setTimeout(() => setMessage(null), 5000);
        })
    }

    return (
        <div className="container settings">
            { message ? <Message/> : null }
            <div className="row">
                <div className="col-3">
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Avatar</a>
                        <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
                        <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Credits</a>
                        <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                    </div>
                </div>
                <div className="col-9">
                    <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <form onSubmit={handleSubmit}>
                        <img src={`data:image/jpeg;base64,${user.avatar}`} className="card-img-top profile-card-top" alt="profile"/>
                            <div class="form-group">
                                <label for="exampleFormControlFile1">Change Profile Picture</label>
                                <input type="file" name="file" accept="image/*" class="form-control-file" id="exampleFormControlFile1" onChange={handleChange}/>
                                <button type="submit" className="btn btn-primary">Upload</button>
                            </div>
                        </form>
                    </div>
                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <form onSubmit={handleBioSubmit}>
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">Update your profile bio below:</label>
                                <p>Max Characters Left: {charsLeft}</p>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" maxLength="250" placeholder={user.bio} name="bio" value={bio.bio} onChange={handleBioChange}></textarea>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                        <div>
                            <h1>Credits</h1>
                            <p>Thank you for using our social media app.</p>
                            <p>This application was created by Horacio Romero and Austin Sedlack.</p>
                            <p>Feel free to contact us on our links below:</p>
                            <p>Linkedin link goes here</p>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;