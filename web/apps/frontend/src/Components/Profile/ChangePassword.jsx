import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faKey, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faIdCard, faAddressBook, faContactCard, faChartPie } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { putProfileChangePasswordAPI } from "../../API/profile";
import FormErrorBox from "../Reusable/FormErrorBox";
import FormInputField from "../Reusable/FormInputField";
import FormTextareaField from "../Reusable/FormTextareaField";
import FormRadioField from "../Reusable/FormRadioField";
import FormMultiSelectField from "../Reusable/FormMultiSelectField";
import FormSelectField from "../Reusable/FormSelectField";
import FormCheckboxField from "../Reusable/FormCheckboxField";
import FormCountryField from "../Reusable/FormCountryField";
import FormRegionField from "../Reusable/FormRegionField";
import PageLoadingContent from "../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../AppState";


function AccountChangePassword() {
    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeated, setPasswordRepeated] = useState("");

    ////
    //// Event handling.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        setFetching(true);
        setErrors({});

        const submission = { // Convert to snake-case for API endpoint.
            old_password: oldPassword,
            password: password,
            password_repeated: passwordRepeated,
        };
        console.log("onSubmitClick, submission:", submission);
        putProfileChangePasswordAPI(submission, onAccountChangePasswordSuccess, onAccountChangePasswordError, onAccountChangePasswordDone, onUnauthorized);
    }

    ////
    //// API.
    ////

    function onAccountChangePasswordSuccess(response){
        // For debugging purposes only.
        console.log("onAccountChangePasswordSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Password updated");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onAccountChangePasswordSuccess: Delayed for 2 seconds.");
            console.log("onAccountChangePasswordSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to a new page.
        setForceURL("/account");
    }

    function onAccountChangePasswordError(apiErr) {
        console.log("onAccountChangePasswordError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onAccountChangePasswordError: Delayed for 2 seconds.");
            console.log("onAccountChangePasswordError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAccountChangePasswordDone() {
        console.log("onAccountChangePasswordDone: Starting...");
        setFetching(false);
    }

    // --- All --- //

    const onUnauthorized = () => {
        setForceURL("/login?unauthorized=true"); // If token expired or user is not logged in, redirect back to login.
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
        }

        return () => { mounted = false; }
    }, []);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    return (
        <>
            <div class="container">
                <section class="section">
                    {/* Desktop Breadcrumbs */}
                    <nav class="breadcrumb is-hidden-touch" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li class=""><Link to="/account" aria-current="page"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Account</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faKey} />&nbsp;Change Password</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav class="breadcrumb is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to={`/account`} aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Account</Link></li>
                        </ul>
                    </nav>

                    {/* Page */}
                    <nav class="box">
                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Account</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Submitting..."} />
                            :
                            <>
                                <div class="container">

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faKey} />&nbsp;Change Password</p>
                                    <hr />

                                    <FormInputField
                                        label="Old Password"
                                        name="oldPassword"
                                        placeholder="Input your original password"
                                        value={oldPassword}
                                        type="password"
                                        errorText={errors && errors.oldPassword}
                                        helpText=""
                                        onChange={(e)=>setOldPassword(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <FormInputField
                                        label="Password"
                                        name="password"
                                        placeholder="Input your new password"
                                        value={password}
                                        type="password"
                                        errorText={errors && errors.password}
                                        helpText=""
                                        onChange={(e)=>setPassword(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <FormInputField
                                        label="Password Repeated"
                                        name="passwordRepeated"
                                        type="password"
                                        placeholder="Repeat your new password for security"
                                        value={passwordRepeated}
                                        errorText={errors && errors.passwordRepeated}
                                        helpText=""
                                        onChange={(e)=>setPasswordRepeated(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-fullwidth-mobile" to={"/account"}>
                                                <FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Account
                                            </Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <button class="button is-primary is-fullwidth-mobile" onClick={onSubmitClick}>
                                                <FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AccountChangePassword;
