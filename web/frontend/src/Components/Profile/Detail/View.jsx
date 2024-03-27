import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faTachometer,
  faKey,
  faArrowLeft,
  faCheckCircle,
  faUserCircle,
  faGauge,
  faPencil,
  faIdCard,
  faAddressBook,
  faContactCard,
  faChartPie,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";

import { getProfileDetailAPI } from "../../../API/Profile";
import FormErrorBox from "../../Reusable/FormErrorBox";
import FormInputField from "../../Reusable/FormInputField";
import FormTextareaField from "../../Reusable/FormTextareaField";
import FormRadioField from "../../Reusable/FormRadioField";
import FormMultiSelectField from "../../Reusable/FormMultiSelectField";
import FormSelectField from "../../Reusable/FormSelectField";
import FormCheckboxField from "../../Reusable/FormCheckboxField";
import FormCountryField from "../../Reusable/FormCountryField";
import FormRegionField from "../../Reusable/FormRegionField";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import {
  topAlertMessageState,
  topAlertStatusState,
  currentUserState,
} from "../../../AppState";
import FormRowText from "../../Reusable/FormRowText";
import FormTextYesNoRow from "../../Reusable/FormRowTextYesNo";

function AccountDetail() {
  ////
  ////
  ////

  ////
  //// Global state.
  ////

  const [topAlertMessage, setTopAlertMessage] =
    useRecoilState(topAlertMessageState);
  const [topAlertStatus, setTopAlertStatus] =
    useRecoilState(topAlertStatusState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  ////
  //// Component states.
  ////

  const [errors, setErrors] = useState({});
  const [isFetching, setFetching] = useState(false);
  const [forceURL, setForceURL] = useState("");

  ////
  //// Event handling.
  ////

  //

  ////
  //// API.
  ////

  function onProfileDetailSuccess(response) {
    console.log("onProfileDetailSuccess: Starting...");
    setCurrentUser(response);
  }

  function onProfileDetailError(apiErr) {
    console.log("onProfileDetailError: Starting...");
    setErrors(apiErr);

    // The following code will cause the screen to scroll to the top of
    // the page. Please see ``react-scroll`` for more information:
    // https://github.com/fisshy/react-scroll
    var scroll = Scroll.animateScroll;
    scroll.scrollToTop();
  }

  function onProfileDetailDone() {
    console.log("onProfileDetailDone: Starting...");
    setFetching(false);
  }

  // --- All --- //

  const onUnauthorized = () => {
    setForceURL("/login?unauthorized=true"); // If token expired or user is not logged in, redirect back to login.
  };

  ////
  //// Misc.
  ////

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      window.scrollTo(0, 0); // Start the page at the top of the page.

      setFetching(true);
      getProfileDetailAPI(
        onProfileDetailSuccess,
        onProfileDetailError,
        onProfileDetailDone,
        onUnauthorized,
      );
    }

    return () => {
      mounted = false;
    };
  }, []);

  ////
  //// Component rendering.
  ////

  if (forceURL !== "") {
    return <Navigate to={forceURL} />;
  }

  return (
    <>
      <div class="container">
        <section class="section">
          {/* Desktop Breadcrumbs */}
          <nav class="breadcrumb is-hidden-touch" aria-label="breadcrumbs">
            <ul>
              <li class="">
                <Link to="/dashboard" aria-current="page">
                  <FontAwesomeIcon className="fas" icon={faGauge} />
                  &nbsp;Dashboard
                </Link>
              </li>
              <li class="is-active">
                <Link aria-current="page">
                  <FontAwesomeIcon className="fas" icon={faUserCircle} />
                  &nbsp;Account
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Breadcrumbs */}
          <nav class="breadcrumb is-hidden-desktop" aria-label="breadcrumbs">
            <ul>
              <li class="">
                <Link to={`/dashboard`} aria-current="page">
                  <FontAwesomeIcon className="fas" icon={faArrowLeft} />
                  &nbsp;Back to Dashboard
                </Link>
              </li>
            </ul>
          </nav>

          {/* Page */}
          <nav class="box">
            {currentUser && (
              <div class="columns">
                <div class="column">
                  <p class="title is-4">
                    <FontAwesomeIcon className="fas" icon={faUserCircle} />
                    &nbsp;Account
                  </p>
                </div>
                <div class="column has-text-right">
                  {/* Mobile Specific */}
                  <Link
                    to={`/account/change-password`}
                    class="button is-medium is-success is-fullwidth is-hidden-desktop"
                    type="button"
                  >
                    <FontAwesomeIcon className="mdi" icon={faKey} />
                    &nbsp;Change Password
                  </Link>
                  {/* Desktop Specific */}
                  <Link
                    to={`/account/change-password`}
                    class="button is-medium is-success is-hidden-touch"
                    type="button"
                  >
                    <FontAwesomeIcon className="mdi" icon={faKey} />
                    &nbsp;Change Password
                  </Link>
                </div>
              </div>
            )}
            <FormErrorBox errors={errors} />

            {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

            {isFetching ? (
              <PageLoadingContent displayMessage={"Loading..."} />
            ) : (
              <>
                {currentUser && (
                  <div class="container">
                    <p class="subtitle is-6">
                      <FontAwesomeIcon className="fas" icon={faIdCard} />
                      &nbsp;Full Name
                    </p>
                    <hr />

                    <FormRowText
                      label="First Name"
                      value={currentUser.firstName}
                      helpText=""
                    />
                    <FormRowText
                      label="Last Name"
                      placeholder="Text input"
                      value={currentUser.lastName}
                      helpText=""
                    />

                    <p class="subtitle is-6">
                      <FontAwesomeIcon className="fas" icon={faContactCard} />
                      &nbsp;Contact Information
                    </p>
                    <hr />

                    <FormRowText
                      label="Email"
                      type="email"
                      value={currentUser.email}
                      helpText=""
                    />

                    <FormRowText
                      label="Phone"
                      type="phone"
                      value={currentUser.phone}
                      helpText=""
                    />

                    <FormTextYesNoRow
                      label="Has shipping address different then billing address"
                      checked={currentUser.hasShippingAddress}
                      disabled={true}
                    />

                    <div class="columns">
                      <div class="column">
                        <p class="subtitle is-6">
                          {currentUser.hasShippingAddress ? (
                            <p class="subtitle is-6">Billing Address</p>
                          ) : (
                            <p class="subtitle is-6">Address</p>
                          )}
                        </p>
                        <FormRowText
                          label="Country"
                          value={currentUser.country}
                          helpText=""
                        />

                        <FormRowText
                          label="Province/Territory"
                          value={currentUser.region}
                          helpText=""
                        />

                        <FormRowText
                          label="City"
                          value={currentUser.city}
                          helpText=""
                        />

                        <FormRowText
                          label="Address Line 1"
                          value={currentUser.addressLine1}
                          helpText=""
                        />

                        <FormRowText
                          label="Address Line 2 (Optional)"
                          value={currentUser.addressLine2}
                          helpText=""
                        />

                        <FormRowText
                          label="Postal Code"
                          value={currentUser.postalCode}
                          helpText=""
                        />
                      </div>
                      {currentUser.hasShippingAddress && (
                        <div class="column">
                          <p class="subtitle is-6">Shipping Address</p>

                          <FormRowText
                            label="Name"
                            value={currentUser.shippingName}
                            helpText="The name to contact for this shipping address"
                          />

                          <FormRowText
                            label="Phone"
                            value={currentUser.shippingPhone}
                            helpText="The contact phone number for this shipping address"
                          />

                          <FormRowText
                            label="Country"
                            value={currentUser.shippingCountry}
                            helpText=""
                          />

                          <FormRowText
                            label="Province/Territory"
                            value={currentUser.shippingRegion}
                            helpText=""
                          />

                          <FormRowText
                            label="City"
                            value={currentUser.shippingCity}
                            helpText=""
                          />

                          <FormRowText
                            label="Address Line 1"
                            value={currentUser.shippingAddressLine1}
                            helpText=""
                          />

                          <FormRowText
                            label="Address Line 2 (Optional)"
                            value={currentUser.shippingAddressLine2}
                            helpText=""
                          />

                          <FormRowText
                            label="Postal Code"
                            value={currentUser.shippingPostalCode}
                            helpText=""
                          />
                        </div>
                      )}
                    </div>

                    <p class="subtitle is-6">
                      <FontAwesomeIcon className="fas" icon={faChartPie} />
                      &nbsp;Metrics
                    </p>
                    <hr />

                    <FormTextYesNoRow
                      label="I agree to receive electronic updates from my local retailer and CPS"
                      checked={currentUser.agreePromotionsEmail}
                    />

                    <div class="columns pt-5">
                      <div class="column is-half">
                        <Link
                          class="button is-medium is-fullwidth-mobile"
                          to={"/dashboard"}
                        >
                          <FontAwesomeIcon className="fas" icon={faArrowLeft} />
                          &nbsp;Back to Dashboard
                        </Link>
                      </div>
                      <div class="column is-half has-text-right">
                        <Link
                          to={"/account/update"}
                          class="button is-medium is-primary is-fullwidth-mobile"
                        >
                          <FontAwesomeIcon className="fas" icon={faPencil} />
                          &nbsp;Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </nav>
          {/* end box */}
        </section>
      </div>
    </>
  );
}

export default AccountDetail;
