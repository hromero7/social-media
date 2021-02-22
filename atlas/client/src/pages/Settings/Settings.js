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
    const [charsLeft, setCharsLeft] = useState(75);
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
        setCharsLeft(75 - input.length);
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
                    <div className="nav flex-column nav-pills list-group" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className="nav-link active list-group-item" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Avatar</a>
                        <a className="nav-link list-group-item" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
                        <a className="nav-link list-group-item" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Contact</a>
                    </div>
                </div>
                <div className="col-9">
                    <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <form onSubmit={handleSubmit}>
                        <img src={`data:image/jpeg;base64,${user.avatar}`} className="settings-img" alt="profile"/>
                            <div class="form-group">
                                <label for="exampleFormControlFile1" className="file-label">Please select a file below to change your avatar:</label>
                            <div className="file-input">
                                <input type="file" name="file" accept="image/*" class="form-control-file" id="exampleFormControlFile1" onChange={handleChange}/>
                                <button type="submit" className="btn btn-primary upload-btn">Upload</button>
                            </div>
                            </div>
                        </form>
                    </div>
                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <form onSubmit={handleBioSubmit}>
                            <div className="form-group bio-group">
                                <label for="exampleFormControlTextarea1" className="bio-label">Please use the text field below to update your bio:</label>
                                <p className="count-label">Remaining characters: {charsLeft}</p>
                                <textarea className="form-control bio-text" id="exampleFormControlTextarea1" rows="2" maxLength="75" placeholder={user.bio} name="bio" value={bio.bio} onChange={handleBioChange}></textarea>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                        <div className="contact-container">
                            <p className="contact-heading">Thank you for using our social media app.</p>
                            <p className="contact-content">This application was created by Horacio Romero and Austin Sedlack.</p>
                            <p className="contact-content">Feel free to contact us on our links below:</p>
                            <div className="contact-info-horacio">
                                <p className="name">Horacio Romero</p>
                                <a className="contact-content" href="https://www.linkedin.com/in/horacio-romero-b155ba198/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </div>
                            <div className="contact-info-austin">
                                <p className="name">Austin Sedlack</p>
                                <a className="contact-content" href="https://www.linkedin.com/in/austin-sedlack/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
                    </div>
                </div>
            </div>
            <div className="mobile-settings">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Avatar</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</a>
                </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                <form onSubmit={handleSubmit}>
                        <img src={`data:image/jpeg;base64,${user.avatar}`} className="settings-img" alt="profile"/>
                            <div class="form-group">
                                <label for="exampleFormControlFile1" className="file-label">Please select a file below to change your avatar:</label>
                            <div className="file-input">
                                <input type="file" name="file" accept="image/*" class="form-control-file" id="exampleFormControlFile1" onChange={handleChange}/>
                                <button type="submit" className="btn btn-primary upload-btn">Upload</button>
                            </div>
                            </div>
                        </form>

                </div>
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <form onSubmit={handleBioSubmit}>
                            <div className="form-group bio-group">
                                <label for="exampleFormControlTextarea1" className="bio-label">Please use the text field below to update your bio:</label>
                                <p className="count-label">Remaining characters: {charsLeft}</p>
                                <textarea className="form-control bio-text" id="exampleFormControlTextarea1" rows="2" maxLength="75" placeholder={user.bio} name="bio" value={bio.bio} onChange={handleBioChange}></textarea>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                </div>
                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                <div className="contact-container">
                            <p className="contact-heading">Thank you for using our social media app.</p>
                            <p className="contact-content">This application was created by Horacio Romero and Austin Sedlack.</p>
                            <p className="contact-content">Feel free to contact us on our links below:</p>
                            <div className="contact-info-horacio">
                                <p className="name">Horacio Romero</p>
                                <a className="contact-content" href="https://www.linkedin.com/in/horacio-romero-b155ba198/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </div>
                            <div className="contact-info-austin">
                                <p className="name">Austin Sedlack</p>
                                <a className="contact-content" href="https://www.linkedin.com/in/austin-sedlack/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </div>
                        </div>

                </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;