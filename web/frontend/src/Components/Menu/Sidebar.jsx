import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHolding, faBars, faBook, faRightFromBracket, faTachometer, faTasks, faSignOut, faUserCircle, faUsers, faBuilding, faBarcode } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { onHamburgerClickedState, currentUserState } from "../../AppState";


export default props => {
    ////
    //// Global State
    ////

    const [onHamburgerClicked, setOnHamburgerClicked] = useRecoilState(onHamburgerClickedState);
    const [currentUser] = useRecoilState(currentUserState);

    ////
    //// Local State
    ////

    const [showLogoutWarning, setShowLogoutWarning] = useState(false);

    ////
    //// Events
    ////

    // Do nothing.

    ////
    //// Rendering.
    ////

    //-------------//
    // CASE 1 OF 3 //
    //-------------//

    // Get the current location and if we are at specific URL paths then we
    // will not render this component.
    const ignorePathsArr = [
        "/",
        "/register",
        "/register-successful",
        "/index",
        "/login",
        "/login/2fa",
        "/login/2fa/step-1",
        "/login/2fa/step-2",
        "/login/2fa/step-3",
        "/login/2fa/step-3/backup-code",
        "/login/2fa/backup-code",
        "/login/2fa/backup-code-recovery",
        "/logout",
        "/verify",
        "/forgot-password",
        "/password-reset",
        "/cpsrn-result",
        "/cpsrn-registry",
        "/terms",
        "/privacy"
    ];
    const location = useLocation();
    var arrayLength = ignorePathsArr.length;
    for (var i = 0; i < arrayLength; i++) {
        // console.log(location.pathname, "===", ignorePathsArr[i], " EQUALS ", location.pathname === ignorePathsArr[i]);
        if (location.pathname === ignorePathsArr[i]) {
            return (null);
        }
    }

    //-------------//
    // CASE 2 OF 3 //
    //-------------//

    if (currentUser === null) {
        return (null);
    }

    //-------------//
    // CASE 3 OF 3 //
    //-------------//

    return (
        <>
            <div class={`modal ${showLogoutWarning ? 'is-active' : ''}`}>
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Are you sure?</p>
                        <button class="delete" aria-label="close" onClick={(e)=>setShowLogoutWarning(false)}></button>
                    </header>
                    <section class="modal-card-body">
                        You are about to log out of the system and you'll need to log in again next time. Are you sure you want to continue?
                    </section>
                    <footer class="modal-card-foot">
                        <Link class="button is-success" to={`/logout`}>Yes</Link>
                        <button class="button" onClick={(e)=>setShowLogoutWarning(false)}>No</button>
                    </footer>
                </div>
            </div>
            {/*
                -----
                STAFF
                -----
            */}
            {currentUser.role === 1 &&
                <div className={`column is-one-fifth has-background-black ${onHamburgerClicked ? '' : 'is-hidden'}`}>
                    <nav class="level is-hidden-mobile">
                        <div class="level-item has-text-centered">
                            <figure class='image'>
                                <img src='/static/CPS logo 2023 GR.webp' style={{maxWidth:"200px"}} />
                            </figure>
                        </div>
                    </nav>
                    <aside class="menu p-4">
                        <p class="menu-label has-text-grey-light">
                            Store Owner/Manager
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a href="/admin/dashboard" class={`has-text-grey-light ${location.pathname.includes("dashboard") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTachometer} />&nbsp;Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="/admin/stores" class={`has-text-grey-light ${location.pathname.includes("store") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Stores
                                </a>
                            </li>
                            <li>
                                <a href="/admin/users" class={`has-text-grey-light ${location.pathname.includes("user") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;All Users
                                </a>
                            </li>
                            <li>
                                <a class={`has-text-grey-light`}>
                                    <FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Online Submissions
                                </a>
                                <ul>
                                    <li>
                                        <a href="/admin/submissions/comics" class={`has-text-grey-light ${location.pathname.includes("submissions/comic") && "is-active"}`}>
                                            <FontAwesomeIcon className="fas" icon={faBook} />&nbsp;Comics
                                        </a>
                                    </li>
                                    {/*
                                    <li>
                                        <a href="/admin/submissions/cards" class={`has-text-grey-light ${location.pathname.includes("card") && "is-active"}`}>
                                            <FontAwesomeIcon className="fas" icon={faTachometer} />&nbsp;Cards
                                        </a>
                                    </li>
                                    */}
                                </ul>
                            </li>
                        </ul>

                        <p class="menu-label has-text-grey-light">
                            System
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a href="/admin/registry" class={`has-text-grey-light ${location.pathname.includes("registry") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faBarcode} />&nbsp;Registry
                                </a>
                            </li>
                            <li>
                                <a href={`/admin/offers`} class={`has-text-grey-light ${location.pathname.includes("offer") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faHandHolding} />&nbsp;Offers
                                </a>
                            </li>
                        </ul>

                        <p class="menu-label has-text-grey-light">
                            Account
                        </p>
                        <ul class="menu-list">
                            {/* <li>
                                <a href={`/admin/account`} class={`has-text-grey-light ${location.pathname.includes("account") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Account
                                </a>
                            </li>*/}
                            <li>
                                <a onClick={(e)=>setShowLogoutWarning(true)} class={`has-text-grey-light ${location.pathname.includes("logout") && "is-active"}`} >
                                    <FontAwesomeIcon className="fas" icon={faSignOut} />&nbsp;Sign Off
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>
            }
            {/*
                --------
                RETAILER
                --------
            */}
            {currentUser.role === 2 &&
                <div className={`column is-one-fifth has-background-black ${onHamburgerClicked ? '' : 'is-hidden'}`}>
                    <nav class="level is-hidden-mobile">
                        <div class="level-item has-text-centered">
                            <figure class='image'>
                                <img src='/static/CPS logo 2023 GR.webp' style={{maxWidth:"200px"}} />
                            </figure>
                        </div>
                    </nav>
                    <aside class="menu p-4">
                        <p class="menu-label has-text-grey-light">
                            Store Owner/Manager
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a href="/dashboard" class={`has-text-grey-light ${location.pathname.includes("dashboard") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTachometer} />&nbsp;Dashboard
                                </a>
                            </li>

                            <li>
                                <a href="/customers" class={`has-text-grey-light ${location.pathname.includes("customer") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Customers
                                </a>
                            </li>
                            <li>
                                <a href="/submissions" class={`has-text-grey-light ${(location.pathname.includes("submissions") && !location.pathname.includes("comic") && !location.pathname.includes("card")) && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Online Submissions
                                </a>
                                <ul>
                                    <li>
                                        <a href="/submissions/comics" class={`has-text-grey-light ${location.pathname.includes("submissions/comic") && "is-active"}`}>
                                            <FontAwesomeIcon className="fas" icon={faBook} />&nbsp;Comics
                                        </a>
                                    </li>
                                    {/*
                                    <li>
                                        <a href="/submissions/cards" class={`has-text-grey-light ${location.pathname.includes("card") && "is-active"}`}>
                                            <FontAwesomeIcon className="fas" icon={faTachometer} />&nbsp;Cards
                                        </a>
                                    </li>
                                    */}
                                </ul>
                            </li>
                        </ul>

                        <p class="menu-label has-text-grey-light">
                            System
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a href="/registry" class={`has-text-grey-light ${location.pathname.includes("registry") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faBarcode} />&nbsp;Registry
                                </a>
                            </li>
                        </ul>

                        <p class="menu-label has-text-grey-light">
                            Account
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a href={`/account`} class={`has-text-grey-light ${location.pathname.includes("account") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Account
                                </a>
                            </li>
                            <li>
                                <a href={`/store`} class={`has-text-grey-light ${location.pathname.includes("store") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;My Store
                                </a>
                            </li>
                            <li>
                                <a onClick={(e)=>setShowLogoutWarning(true)} class={`has-text-grey-light ${location.pathname.includes("logout") && "is-active"}`} >
                                    <FontAwesomeIcon className="fas" icon={faSignOut} />&nbsp;Sign Off
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>
            }
        </>
    );
}
