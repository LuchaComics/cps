import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarMinus, faCalendarPlus, faDumbbell, faCalendar, faGauge, faSearch, faEye, faPencil, faTrashCan, faPlus, faArrowRight, faTable, faArrowUpRightFromSquare, faFilter, faRefresh, faCalendarCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { DateTime } from "luxon";

import FormErrorBox from "../../Reusable/FormErrorBox";
import { PAGE_SIZE_OPTIONS, USER_ROLES } from "../../../Constants/FieldOptions";


function AdminStoreDetailForUserListDesktop(props) {
    const { listData, setPageSize, pageSize, previousCursors, onPreviousClicked, onNextClicked, onSelectUserForDeletion } = props;
    return (
        <div class="b-table">
            <div class="table-wrapper has-mobile-cards">
                <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {listData && listData.results && listData.results.map(function(user, i){
                            return <tr>
                            <td data-label="Name">{user.name}</td>
                            <td data-label="Email"><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td data-label="Role">{USER_ROLES[user.role]}</td>
                            <td data-label="Created">{user.createdAt}</td>
                                <td class="is-actions-cell">
                                    <div class="buttons is-right">
                                        <Link to={`/admin/submissions/pick-type-for-add?user_id=${user.id}&user_name=${user.name}`} target="_blank" rel="noreferrer" class="button is-small is-success" type="button">
                                            <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} />
                                        </Link>
                                        <Link to={`/admin/user/${user.id}`} target="_blank" rel="noreferrer" class="button is-small is-primary" type="button">
                                            View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} />
                                        </Link>
                                        <Link to={`/admin/user/${user.id}/edit`} target="_blank" rel="noreferrer" class="button is-small is-warning" type="button">
                                            Edit&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} />
                                        </Link>
                                        <button onClick={(e, ses) => onSelectUserForDeletion(e, user)} class="button is-small is-danger" type="button">
                                            <FontAwesomeIcon className="mdi" icon={faTrashCan} />&nbsp;Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>;
                        })}
                    </tbody>
                </table>

                <div class="columns">
                    <div class="column is-half">
                        <span class="select">
                            <select class={`input has-text-grey-light`}
                                     name="pageSize"
                                 onChange={(e)=>setPageSize(parseInt(e.target.value))}>
                                {PAGE_SIZE_OPTIONS.map(function(option, i){
                                    return <option selected={pageSize === option.value} value={option.value}>{option.label}</option>;
                                })}
                            </select>
                        </span>

                    </div>
                    <div class="column is-half has-text-right">
                        {previousCursors.length > 0 &&
                            <button class="button" onClick={onPreviousClicked}>Previous</button>
                        }
                        {listData.hasNextPage && <>
                            <button class="button" onClick={onNextClicked}>Next</button>
                        </>}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminStoreDetailForUserListDesktop;