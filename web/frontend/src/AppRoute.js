import { React, useState } from "react";
import 'bulma/css/bulma.min.css';
import './index.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { RecoilRoot } from 'recoil';

import AdminOfferUpdate from "./Components/Admin/Offer/Update";
import AdminOfferDetail from "./Components/Admin/Offer/Detail";
import AdminOfferList from "./Components/Admin/Offer/List";
import AdminOfferAdd from "./Components/Admin/Offer/Add";
import AdminStoreList from "./Components/Admin/Store/List";
import AdminStoreAdd from "./Components/Admin/Store/Add";
import AdminStoreDetail from "./Components/Admin/Store/Detail";
import AdminStoreDetailForPurchaseList from "./Components/Admin/Store/UserPurchases/List";
import AdminStoreDetailForComicSubmission from "./Components/Admin/Store/DetailForComicSubmission";
import AdminStoreDetailForUserList from "./Components/Admin/Store/DetailForUserList";
import AdminStoreDetailForCommentList from "./Components/Admin/Store/DetailForCommentList";
import AdminStoreDetailForAttachmentList from "./Components/Admin/Store/DetailForAttachmentList";
import AdminStoreAttachmentAdd from "./Components/Admin/Store/Attachment/Add";
import AdminStoreAttachmentDetail from "./Components/Admin/Store/Attachment/Detail";
import AdminStoreAttachmentUpdate from "./Components/Admin/Store/Attachment/Update";
import AdminStoreUpdate from "./Components/Admin/Store/Update";
import AdminDashboard from "./Components/Admin/Dashboard";
import AdminRegistrySearch from "./Components/Admin/Registry/Search";
import AdminRegistryResult from "./Components/Admin/Registry/Result";
import AdminSubmissionPickTypeForAdd from "./Components/Admin/Submission/PickTypeForAdd";
import AdminComicSubmissionList from "./Components/Admin/Submission/Comic/List";
import AdminComicSubmissionAddStep1WithSearch from "./Components/Admin/Submission/Comic/AddStep1WithSearch";
import AdminComicSubmissionAddStep1WithResult from "./Components/Admin/Submission/Comic/AddStep1WithResult";
import AdminComicSubmissionAddStep1WithStarredCustomer from "./Components/Admin/Submission/Comic/AddStep1WithStarred";
import AdminComicSubmissionAddStep2 from "./Components/Admin/Submission/Comic/AddStep2";
import AdminComicSubmissionAddStep3 from "./Components/Admin/Submission/Comic/AddStep3";
import AdminComicSubmissionDetail from "./Components/Admin/Submission/Comic/Detail";
import AdminComicSubmissionDetailForCommentList from "./Components/Admin/Submission/Comic/DetailForCommentList";
import AdminComicSubmissionDetailForCustomer from "./Components/Admin/Submission/Comic/DetailForCustomer";
import AdminComicSubmissionDetailForPDFFile from "./Components/Admin/Submission/Comic/DetailForPDFFile";
import AdminSubmissionAttachmentAdd from "./Components/Admin/Submission/Comic/Attachment/Add";
import AdminSubmissionAttachmentDetail from "./Components/Admin/Submission/Comic/Attachment/Detail";
import AdminSubmissionAttachmentUpdate from "./Components/Admin/Submission/Comic/Attachment/Update";
import AdminComicSubmissionDetailForAttachmentList from "./Components/Admin/Submission/Comic/DetailForAttachmentList";
import AdminComicSubmissionUpdateForComicSubmission from "./Components/Admin/Submission/Comic/UpdateSubmission";
import AdminComicSubmissionUpdatePickCustomerWithResult from "./Components/Admin/Submission/Comic/UpdatePickCustomerWithResult";
import AdminComicSubmissionUpdatePickCustomerWithSearch from "./Components/Admin/Submission/Comic/UpdatePickCustomerWithSearch";
import AdminSubmissionLaunchpad from "./Components/Admin/Submission/Launchpad";
import AdminUserList from "./Components/Admin/User/List";
import AdminUserAdd from "./Components/Admin/User/Add";
import AdminUserDetail from "./Components/Admin/User/Detail";
import AdminUserDetailForComicSubmissionList from "./Components/Admin/User/DetailForComicSubmissionList";
import AdminUserDetailForCommentList from "./Components/Admin/User/DetailForCommentList";
import AdminUserDetailForAttachmentList from "./Components/Admin/User/DetailForAttachmentList";
import AdminUserAttachmentAdd from "./Components/Admin/User/Attachment/Add";
import AdminUserAttachmentDetail from "./Components/Admin/User/Attachment/Detail";
import AdminUserAttachmentUpdate from "./Components/Admin/User/Attachment/Update";
import AdminUserCreditList from "./Components/Admin/User/Credit/List";
import AdminUserCreditAdd from "./Components/Admin/User/Credit/Add";
import AdminUserCreditDetail from "./Components/Admin/User/Credit/Detail";
import AdminUserCreditUpdate from "./Components/Admin/User/Credit/Update";
import AdminUserUpdate from "./Components/Admin/User/Update";
import RetailerDashboard from "./Components/Retailer/Dashboard";
import RetailerRegistrySearch from "./Components/Retailer/Registry/Search";
import RetailerRegistryResult from "./Components/Retailer/Registry/Result";
import RetailerSubmissionPickTypeForAdd from "./Components/Retailer/Submission/PickForAdd";
import RetailerComicSubmissionList from "./Components/Retailer/Submission/Comic/List";
import RetailerComicSubmissionAddStep1WithSearch from "./Components/Retailer/Submission/Comic/AddStep1WithSearch";
import RetailerComicSubmissionAddStep1WithResult from "./Components/Retailer/Submission/Comic/AddStep1WithResult";
import RetailerComicSubmissionAddStep1WithStarredCustomer from "./Components/Retailer/Submission/Comic/AddStep1WithStarred";
import RetailerComicSubmissionAddStep2 from "./Components/Retailer/Submission/Comic/AddStep2";
import RetailerComicSubmissionAddStep3 from "./Components/Retailer/Submission/Comic/AddStep3";
import RetailerComicSubmissionAddStep4 from "./Components/Retailer/Submission/Comic/AddStep4";
import RetailerComicSubmissionDetail from "./Components/Retailer/Submission/Comic/Detail";
import RetailerSubmissionLaunchpad from "./Components/Retailer/Submission/Launchpad";
import RetailerSubmissionAttachmentAdd from "./Components/Retailer/Submission/Comic/Attachment/Add";
import RetailerSubmissionAttachmentDetail from "./Components/Retailer/Submission/Comic/Attachment/Detail";
import RetailerSubmissionAttachmentUpdate from "./Components/Retailer/Submission/Comic/Attachment/Update";
import RetailerComicSubmissionDetailForAttachmentList from "./Components/Retailer/Submission/Comic/DetailForAttachmentList";
import RetailerComicSubmissionDetailForCommentList from "./Components/Retailer/Submission/Comic/DetailForCommentList";
import RetailerComicSubmissionDetailForCustomer from "./Components/Retailer/Submission/Comic/DetailForCustomer";
import RetailerComicSubmissionDetailForPDFFile from "./Components/Retailer/Submission/Comic/DetailForPDFFile";
import RetailerComicSubmissionUpdateForComicSubmission from "./Components/Retailer/Submission/Comic/UpdateSubmission";
import RetailerComicSubmissionUpdatePickCustomerWithResult from "./Components/Retailer/Submission/Comic/UpdatePickCustomerWithResult";
import RetailerComicSubmissionUpdatePickCustomerWithSearch from "./Components/Retailer/Submission/Comic/UpdatePickCustomerWithSearch";
import RetailerCustomerList from "./Components/Retailer/Customer/List";
import RetailerCustomerAdd from "./Components/Retailer/Customer/Add";
import RetailerCustomerDetail from "./Components/Retailer/Customer/Detail";
import RetailerCustomerDetailForComicSubmissionList from "./Components/Retailer/Customer/DetailForComicSubmissionList";
import RetailerCustomerDetailForCommentList from "./Components/Retailer/Customer/DetailForCommentList";
import RetailerCustomerUpdate from "./Components/Retailer/Customer/Update";
import RetailerCustomerDetailForAttachmentList from "./Components/Retailer/Customer/DetailForAttachmentList";
import RetailerCustomerAttachmentAdd from "./Components/Retailer/Customer/Attachment/Add";
import RetailerCustomerAttachmentDetail from "./Components/Retailer/Customer/Attachment/Detail";
import RetailerCustomerAttachmentUpdate from "./Components/Retailer/Customer/Attachment/Update";
import LogoutRedirector from "./Components/Gateway/LogoutRedirector";
import Terms from "./Components/Gateway/Terms";
import Privacy from "./Components/Gateway/Privacy";
import Login from "./Components/Gateway/Login";
import Register from "./Components/Gateway/Register";
import RegisterSuccessful from "./Components/Gateway/RegisterSuccessful";
import Index from "./Components/Gateway/Index";
import TopAlertBanner from "./Components/Misc/TopAlertBanner";
import Sidebar from "./Components/Menu/Sidebar";
import Topbar from "./Components/Menu/Top";
import NotFoundError from "./Components/Misc/NotFoundError";
import NotImplementedError from "./Components/Misc/NotImplementedError";
import EmailVerification from "./Components/Gateway/EmailVerification";
import AccountDetail from "./Components/Profile/Detail";
import AccountUpdate from "./Components/Profile/Update";
import AccountChangePassword from "./Components/Profile/ChangePassword";
import StoreDetail from "./Components/Store/Detail";
import StoreUpdate from "./Components/Store/Update";
import StorePurchaseList from "./Components/Store/PurchaseList";
import StoreCreditList from "./Components/Store/CreditList";
import ForgotPassword from "./Components/Gateway/ForgotPassword";
import PasswordReset from "./Components/Gateway/PasswordReset";
import AnonymousCurrentUserRedirector from "./Components/Misc/AnonymousCurrentUserRedirector";
import PublicRegistrySearch from "./Components/Gateway/RegistrySearch";
import PublicRegistryResult from "./Components/Gateway/RegistryResult";


function AppRoute() {
    return (
        <div class="is-widescreen">
            <RecoilRoot>
                <Router>
                    <AnonymousCurrentUserRedirector />
                    <TopAlertBanner />
                    <Topbar />
                    <div class="columns">
                        <Sidebar />
                        <div class="column">
                            <section class="main-content columns is-fullheight">
                                <Routes>
                                    <Route exact path="/admin/offer/:id/update" element={<AdminOfferUpdate />} />
                                    <Route exact path="/admin/offer/:id" element={<AdminOfferDetail />} />
                                    <Route exact path="/admin/offers/add" element={<AdminOfferAdd />} />
                                    <Route exact path="/admin/offers" element={<AdminOfferList />} />
                                    <Route exact path="/admin/stores" element={<AdminStoreList/>}/>
                                    <Route exact path="/admin/stores/add" element={<AdminStoreAdd/>}/>
                                    <Route exact path="/admin/store/:id" element={<AdminStoreDetail/>}/>
                                    <Route exact path="/admin/store/:id/purchases" element={<AdminStoreDetailForPurchaseList/>}/>
                                    <Route exact path="/admin/store/:id/comics" element={<AdminStoreDetailForComicSubmission/>}/>
                                    <Route exact path="/admin/store/:id/users" element={<AdminStoreDetailForUserList/>}/>
                                    <Route exact path="/admin/store/:id/edit" element={<AdminStoreUpdate/>}/>
                                    <Route exact path="/admin/store/:id/comments" element={<AdminStoreDetailForCommentList/>}/>
                                    <Route exact path="/admin/store/:id/attachments" element={<AdminStoreDetailForAttachmentList/>}/>
                                    <Route exact path="/admin/store/:id/attachment/:aid" element={<AdminStoreAttachmentDetail/>}/>
                                    <Route exact path="/admin/store/:id/attachments/add" element={<AdminStoreAttachmentAdd/>}/>
                                    <Route exact path="/admin/store/:id/attachment/:aid/edit" element={<AdminStoreAttachmentUpdate/>}/>
                                    <Route exact path="/admin/registry" element={<AdminRegistrySearch/>}/>
                                    <Route exact path="/admin/registry/:cpsn" element={<AdminRegistryResult/>}/>
                                    <Route exact path="/admin/submissions/pick-type-for-add" element={<AdminSubmissionPickTypeForAdd/>}/>
                                    <Route exact path="/admin/submissions" element={<AdminSubmissionLaunchpad/>}/>
                                    <Route exact path="/admin/submissions/comics" element={<AdminComicSubmissionList/>}/>
                                    <Route exact path="/admin/submissions/comics/add/search" element={<AdminComicSubmissionAddStep1WithSearch/>}/>
                                    <Route exact path="/admin/submissions/comics/add/results" element={<AdminComicSubmissionAddStep1WithResult/>}/>
                                    <Route exact path="/admin/submissions/comics/add/starred" element={<AdminComicSubmissionAddStep1WithStarredCustomer/>}/>
                                    <Route exact path="/admin/submissions/comics/add" element={<AdminComicSubmissionAddStep2/>}/>
                                    <Route exact path="/admin/submissions/comics/add/:id/confirmation" element={<AdminComicSubmissionAddStep3/>}/>
                                    <Route exact path="/admin/submissions/comic/:id" element={<AdminComicSubmissionDetail/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/edit" element={<AdminComicSubmissionUpdateForComicSubmission/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/cust/search" element={<AdminComicSubmissionUpdatePickCustomerWithSearch/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/cust/results" element={<AdminComicSubmissionUpdatePickCustomerWithResult/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/comments" element={<AdminComicSubmissionDetailForCommentList/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/cust" element={<AdminComicSubmissionDetailForCustomer/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/file" element={<AdminComicSubmissionDetailForPDFFile/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/attachments" element={<AdminComicSubmissionDetailForAttachmentList/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/attachment/:aid/edit" element={<AdminSubmissionAttachmentUpdate/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/attachment/:aid" element={<AdminSubmissionAttachmentDetail/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/attachments/add" element={<AdminSubmissionAttachmentAdd/>}/>
                                    <Route exact path="/admin/submissions/cards" element={<NotImplementedError/>}/>
                                    <Route exact path="/admin/users" element={<AdminUserList/>}/>
                                    <Route exact path="/admin/users/add" element={<AdminUserAdd/>}/>
                                    <Route exact path="/admin/user/:id" element={<AdminUserDetail/>}/>
                                    <Route exact path="/admin/user/:id/comics" element={<AdminUserDetailForComicSubmissionList/>}/>
                                    <Route exact path="/admin/user/:id/edit" element={<AdminUserUpdate/>}/>
                                    <Route exact path="/admin/user/:id/comments" element={<AdminUserDetailForCommentList/>}/>
                                    <Route exact path="/admin/user/:id/attachments" element={<AdminUserDetailForAttachmentList/>}/>
                                    <Route exact path="/admin/user/:id/attachment/:aid" element={<AdminUserAttachmentDetail/>}/>
                                    <Route exact path="/admin/user/:id/attachments/add" element={<AdminUserAttachmentAdd/>}/>
                                    <Route exact path="/admin/user/:id/attachment/:aid/edit" element={<AdminUserAttachmentUpdate/>}/>
                                    <Route exact path="/admin/user/:id/credits" element={<AdminUserCreditList/>}/>
                                    <Route exact path="/admin/user/:id/credits/add" element={<AdminUserCreditAdd/>}/>
                                    <Route exact path="/admin/user/:id/credit/:cid" element={<AdminUserCreditDetail/>}/>
                                    <Route exact path="/admin/user/:id/credit/:cid/edit" element={<AdminUserCreditUpdate/>}/>
                                    <Route exact path="/admin/dashboard" element={<AdminDashboard/>}/>
                                    <Route exact path="/dashboard" element={<RetailerDashboard/>}/>
                                    <Route exact path="/registry" element={<RetailerRegistrySearch/>}/>
                                    <Route exact path="/registry/:cpsn" element={<RetailerRegistryResult/>}/>
                                    <Route exact path="/submissions" element={<RetailerSubmissionLaunchpad/>}/>
                                    <Route exact path="/submissions/pick-type-for-add" element={<RetailerSubmissionPickTypeForAdd/>}/>
                                    <Route exact path="/submissions/comics" element={<RetailerComicSubmissionList/>}/>
                                    <Route exact path="/submissions/comics/add/search" element={<RetailerComicSubmissionAddStep1WithSearch/>}/>
                                    <Route exact path="/submissions/comics/add/results" element={<RetailerComicSubmissionAddStep1WithResult/>}/>
                                    <Route exact path="/submissions/comics/add/starred" element={<RetailerComicSubmissionAddStep1WithStarredCustomer/>}/>
                                    <Route exact path="/submissions/comics/add" element={<RetailerComicSubmissionAddStep2/>}/>
                                    <Route exact path="/submissions/comics/add/:id" element={<RetailerComicSubmissionAddStep3/>}/>
                                    <Route exact path="/submissions/comics/add/:id/confirmation" element={<RetailerComicSubmissionAddStep4/>}/>
                                    <Route exact path="/submissions/comic/:id" element={<RetailerComicSubmissionDetail/>}/>
                                    <Route exact path="/submissions/comic/:id/edit" element={<RetailerComicSubmissionUpdateForComicSubmission/>}/>
                                    <Route exact path="/submissions/comic/:id/cust/search" element={<RetailerComicSubmissionUpdatePickCustomerWithSearch/>}/>
                                    <Route exact path="/submissions/comic/:id/cust/results" element={<RetailerComicSubmissionUpdatePickCustomerWithResult/>}/>
                                    <Route exact path="/submissions/comic/:id/attachment/:aid/edit" element={<RetailerSubmissionAttachmentUpdate/>}/>
                                    <Route exact path="/submissions/comic/:id/attachment/:aid" element={<RetailerSubmissionAttachmentDetail/>}/>
                                    <Route exact path="/submissions/comic/:id/attachments/add" element={<RetailerSubmissionAttachmentAdd/>}/>
                                    <Route exact path="/submissions/comic/:id/attachments" element={<RetailerComicSubmissionDetailForAttachmentList/>}/>
                                    <Route exact path="/submissions/comic/:id/comments" element={<RetailerComicSubmissionDetailForCommentList/>}/>
                                    <Route exact path="/submissions/comic/:id/cust" element={<RetailerComicSubmissionDetailForCustomer/>}/>
                                    <Route exact path="/submissions/comic/:id/file" element={<RetailerComicSubmissionDetailForPDFFile/>}/>
                                    <Route exact path="/submissions/cards/add/search" element={<NotImplementedError/>}/>
                                    <Route exact path="/submissions/cards" element={<NotImplementedError/>}/>
                                    <Route exact path="/customers" element={<RetailerCustomerList/>}/>
                                    <Route exact path="/customers/add" element={<RetailerCustomerAdd/>}/>
                                    <Route exact path="/customer/:id" element={<RetailerCustomerDetail/>}/>
                                    <Route exact path="/customer/:id/comics" element={<RetailerCustomerDetailForComicSubmissionList/>}/>
                                    <Route exact path="/customer/:id/edit" element={<RetailerCustomerUpdate/>}/>
                                    <Route exact path="/customer/:id/comments" element={<RetailerCustomerDetailForCommentList/>}/>
                                    <Route exact path="/customer/:id/attachments" element={<RetailerCustomerDetailForAttachmentList/>}/>
                                    <Route exact path="/customer/:id/attachments/add" element={<RetailerCustomerAttachmentAdd/>}/>
                                    <Route exact path="/customer/:id/attachment/:aid" element={<RetailerCustomerAttachmentDetail/>}/>
                                    <Route exact path="/customer/:id/attachment/:aid/edit" element={<RetailerCustomerAttachmentUpdate/>}/>
                                    <Route exact path="/account" element={<AccountDetail/>}/>
                                    <Route exact path="/account/update" element={<AccountUpdate/>}/>
                                    <Route exact path="/account/change-password" element={<AccountChangePassword/>}/>
                                    <Route exact path="/store/" element={<StoreDetail/>}/>
                                    <Route exact path="/store/update" element={<StoreUpdate/>}/>
                                    <Route exact path="/store/:id/purchases" element={<StorePurchaseList/>}/>
                                    <Route exact path="/store/:id/credits" element={<StoreCreditList/>}/>
                                    <Route exact path="/register" element={<Register/>}/>
                                    <Route exact path="/register-successful" element={<RegisterSuccessful/>}/>
                                    <Route exact path="/login" element={<Login/>}/>
                                    <Route exact path="/logout" element={<LogoutRedirector/>}/>
                                    <Route exact path="/verify" element={<EmailVerification/>}/>
                                    <Route exact path="/terms" element={<Terms/>}/>
                                    <Route exact path="/privacy" element={<Privacy/>}/>
                                    <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
                                    <Route exact path="/password-reset" element={<PasswordReset/>}/>
                                    <Route exact path="/cpsrn-result" element={<PublicRegistryResult/>}/>
                                    <Route exact path="/cpsrn-registry" element={<PublicRegistrySearch/>}/>
                                    <Route exact path="/" element={<Index/>}/>
                                    <Route path="*" element={<NotFoundError/>}/>
                                </Routes>
                            </section>
                            <div>
                                {/* DEVELOPERS NOTE: Mobile tab-bar menu can go here */}
                            </div>
                            <footer class="footer is-hidden">
                                <div class="container">
                                    <div class="content has-text-centered">
                                        <p>Hello</p>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </Router>
            </RecoilRoot>
        </div>
    );
}

export default AppRoute;