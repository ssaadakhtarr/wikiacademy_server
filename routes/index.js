const router = require("express").Router();

const authenticationController = require("../modules/authenticationController");
const updateProfile = require("../modules/updateProfile");
const addTask = require("../modules/addTasks");
const getRoom = require("../modules/getRoom");
const rankUpdate = require("../modules/rankUpdate");
const blogs = require("../modules/blogs");
const admin = require("../modules/admin");
const dashboard=require("../modules/dashboard");
const home = require("../modules/home");
const leaderboard =require("../modules/leaderboard")
const publicProfile = require("../modules/publicProfile");

const base = "/";
router.get(`${base}login`, authenticationController.getLogin);
router.post(`${base}register`, authenticationController.register);
router.get(
  `${base}isUserAuth`,
  authenticationController.verifyJWT,
  authenticationController.userAuth
);
router.post(`${base}login`, authenticationController.login);
router.post(`${base}logout`, authenticationController.logout);

router.post(`${base}updateDetails`, updateProfile.updateDetails);
router.post(`${base}changePassword`, updateProfile.changePassword);
router.post(`${base}updatePersonalInfo`, updateProfile.updatePersonalInfo);
router.post(`${base}updateSocials`, updateProfile.updateSocials);
router.post(`${base}deleteAccount`, updateProfile.deleteAccount);

router.post(`${base}sendTask`, addTask.sendTask);
router.post(`${base}sendRoomDetails`, addTask.sendRoomDetails);
router.post(`${base}getRoomDetails`, getRoom.getRoomDetails);
router.post(`${base}getTaskDetails`, getRoom.getTaskDetails);
router.post(`${base}getUserRooms`, getRoom.getUserRooms);
router.post(`${base}checkUserRooms`, getRoom.checkUserRooms);
router.post(`${base}isAnswered`, getRoom.isAnswered);
router.post(`${base}getProgress`, getRoom.getProgress);

router.post(`${base}updateRank`, rankUpdate.updateRank);

router.get(`${base}getBlogs`, blogs.getBlog);
router.post(`${base}addBlog`, blogs.addBlog);
router.post(`${base}getBlogPage`,blogs.getBlogPage);

// areeb's work here
router.get(`${base}getAdminData`,admin.getAdminData);
router.get(`${base}getDashboard/:id`,dashboard.getDashboard);
router.post(`${base}getJoinedRooms`, dashboard.getJoinedRooms);








// saad's work here


router.get(`${base}getUserData`, admin.getUserData);
router.post(`${base}deleteUser`, admin.deleteUser);
router.get(`${base}getAllRooms`, admin.getAllRooms);
router.get(`${base}getPendingBlogs`, admin.getPendingBlogs);
router.post(`${base}discardBlog`, admin.discardBlog);
router.post(`${base}approveBlog`, admin.approveBlog);
router.get(`${base}getAllBlogs`, admin.getAllBlogs);

router.get(`${base}getHomeData`, home.getHomeData);
router.get(`${base}getLeaderboard`,leaderboard.getLeaderboard);

router.post(`${base}getPublicProfile`, publicProfile.getPublicProfile);




module.exports = router;
