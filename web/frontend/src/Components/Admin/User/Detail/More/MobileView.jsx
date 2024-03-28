import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faMobile,
  faKey,
  faBuildingUser,
  faImage,
  faPaperclip,
  faAddressCard,
  faSquarePhone,
  faTasks,
  faTachometer,
  faPlus,
  faArrowLeft,
  faCheckCircle,
  faUserCircle,
  faGauge,
  faPencil,
  faUsers,
  faEye,
  faIdCard,
  faAddressBook,
  faContactCard,
  faChartPie,
  faBuilding,
  faEllipsis,
  faArchive,
  faBoxOpen,
  faTrashCan,
  faHomeUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";

const AdminClientDetailMoreMobile = ({ cid, user, currentUser }) => {
  return (
    <>
      <div
        className="has-background-white-ter is-hidden-tablet mb-6 p-5"
        style={{ borderRadius: "15px" }}
      >
        <table className="is-fullwidth has-background-white-ter table">
          <thead>
            <tr>
              <th colSpan="2">Menu</th>
            </tr>
          </thead>
          <tbody>
            {/* ---------------------------------------------------------------------- */}

            {user && user.status === 2 ? (
              <tr>
                <td>
                  <FontAwesomeIcon className="fas" icon={faBoxOpen} />
                  &nbsp;Unarchive
                </td>
                <td>
                  <div className="buttons is-right">
                    <Link
                      to={`/admin/user/${cid}/unarchive`}
                      className="is-small"
                    >
                      View&nbsp;
                      <FontAwesomeIcon className="mdi" icon={faChevronRight} />
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              <tr>
                <td>
                  <FontAwesomeIcon className="fas" icon={faArchive} />
                  &nbsp;Archive
                </td>
                <td>
                  <div className="buttons is-right">
                    <Link
                      to={`/admin/user/${cid}/archive`}
                      className="is-small"
                    >
                      View&nbsp;
                      <FontAwesomeIcon className="mdi" icon={faChevronRight} />
                    </Link>
                  </div>
                </td>
              </tr>
            )}

            {/* ---------------------------------------------------------------------- */}

            <tr>
              <td>
                <FontAwesomeIcon className="fas" icon={faTrashCan} />
                &nbsp;Delete
              </td>
              <td>
                <div className="buttons is-right">
                  <Link
                    to={`/admin/user/${cid}/permadelete`}
                    className="is-small"
                  >
                    View&nbsp;
                    <FontAwesomeIcon
                      className="mdi"
                      icon={faChevronRight}
                    />
                  </Link>
                </div>
              </td>
            </tr>
            {/* ---------------------------------------------------------------------- */}
            <tr>
              <td>
                <FontAwesomeIcon className="fas" icon={faKey} />
                &nbsp;Password
              </td>
              <td>
                <div className="buttons is-right">
                  <Link
                    to={`/admin/user/${cid}/change-password`}
                    className="is-small"
                  >
                    View&nbsp;
                    <FontAwesomeIcon
                      className="mdi"
                      icon={faChevronRight}
                    />
                  </Link>
                </div>
              </td>
            </tr>
            {/* ---------------------------------------------------------------------- */}
            <tr>
              <td>
                <FontAwesomeIcon className="fas" icon={faMobile} />
                &nbsp;2FA
              </td>
              <td>
                <div className="buttons is-right">
                  <Link
                    to={`/admin/user/${cid}/change-2fa`}
                    className="is-small"
                  >
                    View&nbsp;
                    <FontAwesomeIcon
                      className="mdi"
                      icon={faChevronRight}
                    />
                  </Link>
                </div>
              </td>
            </tr>
            {/* ---------------------------------------------------------------------- */}
          </tbody>
        </table>
      </div>
      {/* END Page Menu Options (Mobile Only) */}
    </>
  );
};

export default AdminClientDetailMoreMobile;
